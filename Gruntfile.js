'use strict';

var markdown = require('node-markdown').Markdown;
var pkg = require('./package.json');
var fs = require('fs');
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());

var semver = require('semver');
var exec = require('exec');

module.exports = function (grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  var gitVersion;

  grunt.util.linefeed = '\n';

  grunt.initConfig({
    // get the packages
    pkg: grunt.file.readJSON('./package.json'),
    shell: {
      options: {
        stdout: true,
        stderr: true
      },
      tag: {
        command: [
          'git tag <%= grunt.option("tag") %>',
          'git push origin --tags'
        ].join(' && ')
      }
    },
    ngversion: '1.3.15',
    modules: [],//to be filled in by build task
    dist: 'dist',
    filename: pkg._ngPrefix,
    filenamecustom: '<%= filename %>-custom',
    // Use meta to build the dependency injection
    meta: {
      modules: 'angular.module("<%= pkg._ngPrefix %>", [<%= srcModules %>]);',
      tplmodules: 'angular.module("<%= pkg._ngPrefix %>.tpls", [<%= tplModules %>]);',
      all: 'angular.module("<%= pkg._ngPrefix %>", ["<%= pkg._ngPrefix %>.tpls", <%= srcModules %>]);',
      lessFile: '<%= dist %>/<%= filename %>.less',
      lessMain: '',
      lessMainCopy: '',
      lessCopy: '',
      lessModules: '',
      modulesJS: '',
      banner: ['/*',
        ' * <%= pkg.name %>',
        ' * Author: <%= pkg.author %>',
        ' * Version: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
        ' * License: <%= pkg.license %>',
        ' */\n'].join('\n')
    },
    html2js: {
      dist: {
        options: {
          module: null, // no bundle module for all the html2js templates
          base: 'src'
        },
        files: [{
          expand: true,
          src: ['src/*/*.html'],
          ext: '.html.js'
        }]
      }
    },
    // concats the template files
    concat: {
      dist: {
        options: {
          banner: '<%= meta.banner %><%= meta.modules %>\n'
        },
        src: [], //src filled in by build task
        dest: '<%= dist %>/<%= filename %>.js'
      },
      dist_tpls: {
        options: {
          banner: '<%= meta.banner %><%= meta.all %>\n<%= meta.tplmodules %>\n\n'
        },
        src: [], //src filled in by build task
        dest: '<%= dist %>/<%= filename %>-tpls.js'
      }
    },
    copy: {
      demohtml: {
        options: {
          //process html files with gruntfile config
          process: grunt.template.process
        },
        files: [{
          expand: true,
          src: ['**/*.html'],
          cwd: 'misc/demo/',
          dest: 'demo/'
        }]
      },
      demoassets: {
        // ABC : copy demo assets in dist/assets
        files: [{
          expand: true,
          //Don't re-copy html files, we process those
          src: ['**/**/*', '!**/*.html'],
          cwd: 'misc/demo',
          dest: 'demo/'
        }]
      },
      mainLess: {
        expand: true,
        cwd: 'misc/ng-gov-uk-bootstrap-wrapper/',
        src: '**',
        dest: 'dist/less/'
      },
      mainFonts: {
        files:[{
          expand: true,
          cwd: 'misc/demo/assets/fonts/',
          src: '**',
          dest: 'dist/assets/fonts/'
        }]
      },
      mainImg: {
        files:[{
          expand: true,
          cwd: 'misc/demo/assets/img/',
          src: '**',
          dest: 'dist/assets/img/'
        }]
      },
      moduleLess: {
        expand: true,
        flatten: true,
        src: ['src/**/*.less'],
        dest: 'dist/less/',
        filter: 'isFile'
      },
      demoUi: {
        files:[{
          expand: true,
          src: '<%= dist %>/**/*',
          dest: 'demo/assets/'
        }]
      }
    },
    clean: {
      before: {

        src: ['dist/**', 'demo/**', '!demo/.git/**']
      },
      options: {
        'no-write': true
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: '<%= dist %>/<%= filename %>.min.js'
      },
      dist_tpls: {
        src: ['<%= concat.dist_tpls.dest %>'],
        dest: '<%= dist %>/<%= filename %>-tpls.min.js'
      }
    },
    ngAnnotate: {
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: '<%= concat.dist.dest %>'
      },
      dist_tpls: {
        src: ['<%= concat.dist_tpls.dest %>'],
        dest: '<%= concat.dist_tpls.dest %>'
      }
    },
    'file_append': {
      ui: {
        files: [
          {
            append: '// NG GOV UK WRAPPER\n<%= meta.lessMainCopy %>\n// MODULES\n<%= meta.lessCopy %>',
            input: '<%= dist %>/<%= filename %>.less',
          }
        ]
      },
      demo: {
        files: [
          {
            append: '// NG GOV UK UI LESS\n@import "dist/<%= filename %>.less";\n',
            input: 'demo/assets/app.less',
          }
        ]
      },
      moduleJS: {
        files: [
          {
            append: '<%= meta.modulesJS %>',
            input: 'demo/app.js'
          }
        ]
      }
    },
    less: {
      main: {
        options: {
          relativeUrls: false
        },
        files: {
          'dist/assets/<%= filename %>.demo.css': 'demo/assets/app.less'
        }
      },
      demo: {
        options: {
          relativeUrls: false
        },
        files: {
          'demo/assets/<%= filename %>.demo.css': 'demo/assets/app.less'
        }
      }
    },
    watch: {
      scripts: {
        files: ['misc/**'],
        tasks: ['build'],
        options: {
          spawn: false,
        },
      },
    },
    imageEmbed: {
      dist: {
        src: ['dist/assets/<%= filename %>.demo.css'],
        dest: "dist/assets/plunker.css",
        options: {
          deleteAfterEncoding: false
        }
      }
    },
  });

  //Common ui.ngGovUk module containing all modules for src and templates
  //findModule: Adds a given module to config
  var foundModules = {};

  function enquote(str) {
    return '"' + str + '"';
  }

  // reverse = true/false
  function getLessFileNames(files, reverse) {
    var hld = [];
    if(reverse) {
      files.reverse();
    }
    files.forEach(function(item) {
      hld.push('@import "less/'+_.trim(item).replace(/^.*[\\\/]/, '')+'";\n');
    });
    return hld.join("");
  }

  function stripSrc(arr, name){
    var hld = [];
    arr.forEach(function(item) {
      hld.push(name+'/'+_.trim(item).replace(/^.*[\\\/]/, ''));
    });
    return hld.map(enquote)
  }


  function pushControllers(modules) {
    var hold = [];
    modules.forEach(function(item){
      hold.push(item.docs.js);
    });
    return hold.join("");
  }


  function findModule(name) {

    if (foundModules[name]) {
      return;
    }
    foundModules[name] = true;

    function breakup(text, separator) {
      return text.replace(/[A-Z]/g, function (match) {
        return separator + match;
      });
    }

    function ucwords(text) {
      return text.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
      });
    }



    var module = {
      name: name,
      libraryPrefix: pkg._ngPrefix,
      moduleName: '"'+pkg._ngPrefix+'.'+name+'"',
      displayName: ucwords(breakup(name, ' ')),
      srcFiles: grunt.file.expand('src/' + name + '/*.js'),
      tplFiles: grunt.file.expand('src/' + name + '/*.html'),
      lessFiles: grunt.file.expand('src/'+ name + '/*.less'),
      tpljsFiles: grunt.file.expand('src/' + name + '/*.html.js'),
      tplModules: stripSrc(grunt.file.expand('src/' + name + '/*.html'),name),
      dependencies: dependenciesForModule(name),
      docs: {
        md: grunt.file.expand('src/' + name + '/docs/*.md')
          .map(grunt.file.read).map(markdown).join('\n'),
        js: grunt.file.expand('src/' + name + '/docs/*.js')
          .map(grunt.file.read).join('\n'),
        html: grunt.file.expand('src/' + name + '/docs/*.html')
          .map(grunt.file.read).join('\n')
      }
    };
    // ABC : recursively add modules to grunt.config('modules')
    module.dependencies.forEach(findModule);
    grunt.config('modules', grunt.config('modules').concat(module));
  }

  function dependenciesForModule(name) {
    var deps = [];
    grunt.file.expand('src/' + name + '/*.js')
      .map(grunt.file.read)
      .forEach(function (contents) {
        //Strategy: find where module is declared,
        //and from there get everything inside the [] and split them by comma
        var moduleDeclIndex = contents.indexOf('angular.module(');
        var depArrayStart = contents.indexOf('[', moduleDeclIndex);
        var depArrayEnd = contents.indexOf(']', depArrayStart);
        var dependencies = contents.substring(depArrayStart + 1, depArrayEnd);
        dependencies.split(',').forEach(function (dep) {
          if (dep.indexOf(pkg._ngPrefix+'.') > -1) {

            var depName = dep.trim().replace(pkg._ngPrefix+'.', '').replace(/['"]/g, '');
            if (deps.indexOf(depName) < 0) {
              deps.push(depName);
              //Get dependencies for this new dependency
              deps = deps.concat(dependenciesForModule(depName));
            }
          }
        });
      });
    return deps;
  }


  // Register the builder task
  grunt.registerTask('builder', 'Create bootstrap build files', function () {

    var _ = grunt.util._;

    //If arguments define what modules to build, build those. Else, everything
    if (this.args.length) {
      this.args.forEach(findModule);
      // ABC : Build file will have a different name pattern, eg ui-bootstrap-custom-0.11.0-SNAPSHOT.js
      grunt.config('filename', grunt.config('filenamecustom'));
    } else {
      // ABC : If no arguments build all modules which names are src subfolders.
      grunt.file.expand({
        filter: 'isDirectory', cwd: '.'
      }, 'src/*').forEach(function (dir) {
        findModule(dir.split('/')[1]);
      });
    }

    var modules = grunt.config('modules');
    grunt.config('srcModules', _.pluck(modules, 'moduleName'));
    grunt.config('tplModules', _.pluck(modules, 'tplModules').filter(function (tpls) {
      return tpls.length > 0;
    }));



    grunt.config('demoModules', modules
        .filter(function (module) {
          return module.docs.md && module.docs.html;
        })
        .sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
    );

    /// append the demo controllers to the app.js
    grunt.config('meta.modulesJS',pushControllers(modules));

    var srcFiles = _.pluck(modules, 'srcFiles');
    var tpljsFiles = _.pluck(modules, 'tpljsFiles');

    // Create the main less file
    grunt.file.write(grunt.config('meta.lessFile'));

    // Write the import for main style guide less files
    var mainLessFiles = grunt.file.expand('misc/ng-gov-uk-bootstrap-wrapper/*.less');
    grunt.config('meta.lessMainCopy', getLessFileNames(mainLessFiles, true));


    // Write the import for the modules Less file
    var lessFiles = _.pluck(modules, 'lessFiles');
    grunt.config('meta.lessCopy', getLessFileNames(lessFiles, false));


    //Set the concat task to concatenate the given src modules
    grunt.config('concat.dist.src', grunt.config('concat.dist.src')
      .concat(srcFiles));
    //Set the concat-with-templates task to concat the given src & tpl modules
    grunt.config('concat.dist_tpls.src', grunt.config('concat.dist_tpls.src')
      .concat(srcFiles).concat(tpljsFiles));

    // Run the page build tasks
    grunt.task.run(['concat', 'ngAnnotate', 'file_append:ui', 'uglify', 'copy', 'file_append:moduleJS', 'file_append:demo' ]);

  });

  // First create the module template files then run the builder
  grunt.registerTask('build',function(){
    grunt.task.run(['clean:before', 'html2js', 'copy:mainLess', 'copy:mainFonts', 'copy:mainImg', 'builder', 'less']);
  });

  // This task is to convert images and custom fonts inside of a stylesheet to base64-encoded data URI strings.
  grunt.registerTask('plunker',function(){
    grunt.task.run(['imageEmbed']);
  });

};
