'use strict';

module.exports = function(config, log) {
  function lessImportString(path, file) {
    var importString;

    importString = '@import "' + path + '/' + file + '";\n';

    return importString;
  }

  return lessImportString;
};
