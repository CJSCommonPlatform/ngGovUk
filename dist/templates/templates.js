(function(module) {
try {
  module = angular.module('ngGovUk');
} catch (e) {
  module = angular.module('ngGovUk', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/footer/footer.tpl.html',
    '<footer class="group js-footer" id="footer" role="contentinfo">\n' +
    '\n' +
    '  <div class="footer-wrapper">\n' +
    '\n' +
    '    <div class="footer-meta">\n' +
    '      <div class="footer-meta-inner">\n' +
    '        <ul>\n' +
    '          <li data-ng-repeat="link in settings.links">\n' +
    '            <a data-ng-if="link.type === \'href\'" data-ng-href="{{ link.ref }}">{{ link.title }}</a>\n' +
    '            <a data-ng-if="link.type === \'ui-sref\'" data-ui-sref="{{ link.ref }}">{{ link.title }}</a>\n' +
    '          </li>\n' +
    '        </ul>\n' +
    '\n' +
    '        <div class="open-government-licence">\n' +
    '          <p class="logo">\n' +
    '            <a data-ng-href="{{ settings.licence.link }}"></a>\n' +
    '          </p>\n' +
    '          <p class="licence-text" data-ng-bind-html="settings.licence.text"></p>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '\n' +
    '      <div class="copyright">\n' +
    '        <a class="crown-copy" data-ng-href="{{ settings.copyright.link }}">&copy; {{ settings.copyright.text }}</a>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</footer>');
}]);
})();

(function(module) {
try {
  module = angular.module('ngGovUk');
} catch (e) {
  module = angular.module('ngGovUk', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/global-nav/global-nav.tpl.html',
    '<header role="banner" id="global-header" class="with-proposition">\n' +
    '\n' +
    '  <div class="header-wrapper">\n' +
    '\n' +
    '    <div class="header-global">\n' +
    '      <div class="header-logo">\n' +
    '        <a id="logo" href="#!/" class="content">\n' +
    '          <img width="35" height="31" alt="" src="assets/img/gov.uk_logotype_crown_invert_trans.png"/> GOV.UK\n' +
    '        </a>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="header-proposition">\n' +
    '      <a href="#proposition-links" class="js-header-toggle menu">Menu</a>\n' +
    '      <nav id="proposition-menu">\n' +
    '\n' +
    '        <a meta-id="proposition-name" data-ng-if="globalNav.pageTitle.type === \'href\'" href="#">\n' +
    '          {{globalNav.pageTitle.title}}\n' +
    '        </a>\n' +
    '        <a meta-id="proposition-name" data-ng-if="globalNav.pageTitle.type === \'ui-sref\'" data-ui-sref="#">\n' +
    '          {{globalNav.pageTitle.title}}\n' +
    '        </a>\n' +
    '        <span meta-id="proposition-name" data-ng-if="globalNav.pageTitle.type === \'text\'">\n' +
    '          {{globalNav.pageTitle.title}}\n' +
    '        </span>\n' +
    '\n' +
    '        <ul id="proposition-links">\n' +
    '          <li data-ng-repeat="item in globalNav.navItems">\n' +
    '            <a data-ng-if="item.type === \'href\'" href="{{item.ref}}">{{item.title}}</a>\n' +
    '            <a data-ng-if="item.type === \'ui-sref\'" data-ui-sref="{{item.ref}}">{{item.title}}</a>\n' +
    '          </li>\n' +
    '        </ul>\n' +
    '      </nav>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</header>\n' +
    '\n' +
    '<div id="global-header-bar" ng-if="globalNav.displaySettings.showUnderline"></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ngGovUk');
} catch (e) {
  module = angular.module('ngGovUk', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/nav-side/nav-side.tpl.html',
    '<aside class="nav-side">\n' +
    '  <nav>\n' +
    '    <div class="navbar-header">\n' +
    '      <a class="box-shadow-menu"\n' +
    '         data-toggle="isCollapsed = !isCollapsed"\n' +
    '         data-ng-click="isCollapsed = !isCollapsed"\n' +
    '         data-ng-class="{\'nav-open\': isCollapsed}">\n' +
    '        <span class="icon-bar-title" data-ng-bind="collapseTitle"></span>\n' +
    '      </a>\n' +
    '    </div>\n' +
    '    <div class="navbar-collapse" data-collapse="isCollapsed">\n' +
    '      <ul class="accordion">\n' +
    '        <li data-accordion data-ng-repeat="navItem in navigationItems">\n' +
    '          <ul data-accordion-group data-heading="{{navItem.title}}" data-ng-class="{\'active\':isOpen(navItem)}" data-is-open="{{ isOpen(navItem) }}" data-ui-sref-active="active" data-ng-if="navItem.children" class="nav-item nav-item-with-children">\n' +
    '            <li data-ng-repeat="subNavItem in navItem.children">\n' +
    '\n' +
    '              <!-- If Permissions -->\n' +
    '              <a data-ng-if="subNavItem.type === \'scroll-to\'" data-ng-show="subNavItem.permissions" data-only-access data-permissions="{{subNavItem.permissions}}" data-scroll-to="{{subNavItem.ref}}" href="#" data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '                <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '                <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '              </a>\n' +
    '              <!-- If no permissions -->\n' +
    '              <a data-ng-if="subNavItem.type === \'scroll-to\'" data-ng-hide="subNavItem.permissions" data-scroll-to="{{subNavItem.ref}}" href="#" data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '                <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '                <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '              </a>\n' +
    '\n' +
    '              <!-- If Permissions -->\n' +
    '              <a data-ng-if="subNavItem.type === \'ui-sref\'" data-ng-show="subNavItem.permissions" data-only-access data-permissions="{{subNavItem.permissions}}" data-ui-sref="{{subNavItem.ref}}" data-ui-sref-active="active" data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '                <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '                <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '              </a>\n' +
    '              <!-- If no permissions -->\n' +
    '              <a data-ng-if="subNavItem.type === \'ui-sref\'" data-ng-hide="subNavItem.permissions" ui-sref="{{subNavItem.ref}}" data-ui-sref-active="active" data-data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '                <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '                <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '              </a>\n' +
    '\n' +
    '              <!-- If Permissions -->\n' +
    '              <a data-ng-if="subNavItem.type === \'href\'" data-ng-show="subNavItem.permissions" data-only-access data-permissions="{{subNavItem.permissions}}" href="{{subNavItem.ref}}" data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '                <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '                <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '              </a>\n' +
    '              <!-- If no permissions -->\n' +
    '              <a data-ng-if="subNavItem.type === \'href\'" data-ng-hide="subNavItem.permissions" href="{{subNavItem.ref}}" data-offset="20" class="subnav-link clearfix" data-ng-class="{\'has-detail\' : !!subNavItem.detail}">\n' +
    '                <span class="list-item-title">{{subNavItem.title}}</span>\n' +
    '                <span data-ng-if="!!subNavItem.detail" class="list-item-detail" data-ng-bind-html="subNavItem.detail"></span>\n' +
    '              </a>\n' +
    '            </li>\n' +
    '          </ul>\n' +
    '          <div class="panel-heading nav-item" data-ng-if="!navItem.children">\n' +
    '            <!-- If Permissions -->\n' +
    '            <h4 data-ng-show="navItem.permissions" class="panel-title" data-only-access data-permissions="{{navItem.permissions}}">\n' +
    '              <a data-ng-if="navItem.type === \'scroll-to\'" data-scroll-to="{{navItem.ref}}" href="#" data-offset="20">{{navItem.title}}</a>\n' +
    '              <a data-ng-if="navItem.type === \'ui-sref\'" ui-sref="{{navItem.ref}}" data-offset="20" ui-sref-active="active">{{navItem.title}}</a>\n' +
    '              <a data-ng-if="navItem.type === \'href\'" href="{{navItem.href}}" data-offset="20">{{navItem.title}}</a>\n' +
    '            </h4>\n' +
    '            <!-- If no permissions -->\n' +
    '            <h4 data-ng-hide="navItem.permissions" class="panel-title">\n' +
    '              <a data-ng-if="navItem.type === \'scroll-to\'" data-scroll-to="{{navItem.ref}}" href="#" data-offset="20">\n' +
    '                {{navItem.title}}<br data-ng-if="!!navItem.detail">\n' +
    '                <span class="list-item-detail parent-detail" data-ng-if="!!navItem.detail" data-ng-bind-html="navItem.detail"></span>\n' +
    '              </a>\n' +
    '              <a data-ng-if="navItem.type === \'ui-sref\'" ui-sref="{{navItem.ref}}" data-offset="20" ui-sref-active="active" data-ng-class="{\'parent-with-detail\' : !!navItem.detail}">\n' +
    '                {{navItem.title}}<br data-ng-if="!!navItem.detail">\n' +
    '                <span class="list-item-detail parent-detail" data-ng-if="!!navItem.detail" data-ng-bind-html="navItem.detail"></span>\n' +
    '              </a>\n' +
    '              <a data-ng-if="navItem.type === \'href\'" href="{{navItem.href}}" data-offset="20">\n' +
    '                {{navItem.title}}<br data-ng-if="!!navItem.detail">\n' +
    '                <span class="list-item-detail parent-detail" data-ng-if="!!navItem.detail" data-ng-bind-html="navItem.detail"></span>\n' +
    '              </a>\n' +
    '            </h4>\n' +
    '          </div>\n' +
    '        </li>\n' +
    '      </ul>\n' +
    '    </div>\n' +
    '  </nav>\n' +
    '</aside>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('ngGovUk');
} catch (e) {
  module = angular.module('ngGovUk', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/progress-list/progress-list.tpl.html',
    '<ul class="progress-list list-group">\n' +
    '    <li data-ng-repeat="item in progressListItems" ng-class="item.active ? \'list-group-item active\' : \'list-group-item\'">\n' +
    '        <h4>{{$index + 1}}. {{item.title}}</h4>\n' +
    '              <span ng-if="item.access && item.complete">\n' +
    '                <span class="glyphicon glyphicon-ok success-color"></span>Complete\n' +
    '              </span>\n' +
    '        <span ng-if="item.access && !item.complete">Incomplete</span>\n' +
    '    </li>\n' +
    '</ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('ngGovUk');
} catch (e) {
  module = angular.module('ngGovUk', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('modules/tabbed-menu/tabbed-menu.tpl.html',
    '<div class="tabbedMenu">\n' +
    '  <nav>\n' +
    '    <ul class="nav nav-tabs">\n' +
    '      <li class="nav-title" data-ng-if="title" data-ng-bind="title"></li>\n' +
    '      <li data-ng-repeat="item in tabbedItems">\n' +
    '        <a ui-sref="item.ref" data-ng-bind="item.title"></a>\n' +
    '      </li>\n' +
    '    </ul>\n' +
    '  </nav>\n' +
    '</div>\n' +
    '');
}]);
})();
