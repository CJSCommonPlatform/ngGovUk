(function() {
  'use strict';

  angular
    .module('app')
    .controller('css', Controller);

  function Controller() {
    var defendants,
        navItems;

    var vm = this;

    activate()

    vm.defendants = defendants;
    vm.navItems = navItems;
    vm.sort = sort;
    ////////////////

    function sort($event) {
      var target,
        ascSortClass;

      ascSortClass = 'sort-active-asc';

      target = angular.element($event.target);

      target.toggleClass(ascSortClass);
    }

    function activate() {
      defendants = [
        {
          caseNumber: '11SJ/12345/12',
          name: 'Charles Forstman',
          nextCourtDate: '22/07/2016',
          collapsed: true,
          content: 'here is some content about Charles Forstman'
        },
        {
          caseNumber: '11SJ/12345/13',
          name: 'Logan Sanders',
          nextCourtDate: '12/12/2015',
          collapsed: true,
          content: 'here is some content about Logan Sanders'
        },
        {
          caseNumber: '11SJ/12345/18',
          name: 'Ava Hessington',
          nextCourtDate: '13/09/2018',
          collapsed: true,
          content: 'here is some content about Ava Hessington'
        }
      ];

      navItems = [
        {
          title: 'Typography',
          children: [
            {
              title: 'Font',
              type: 'scroll-to',
              ref: 'font'
            },
            {
              title: 'Lead paragraph',
              type: 'scroll-to',
              ref: 'lead-paragraph'
            },
            {
              title: 'Body copy',
              type: 'scroll-to',
              ref: 'body-copy'
            },
            {
              title: 'Links',
              type: 'scroll-to',
              ref: 'links'
            },
            {
              title: 'Lists',
              type: 'scroll-to',
              ref: 'lists'
            },
            {
              title: 'Inset text',
              type: 'scroll-to',
              ref: 'inset-text'
            },
            {
              title: 'Hidden text (progressive disclosure)',
              type: 'scroll-to',
              ref: 'hidden-text'
            }
          ]
        },
        {
          title: 'Data',
          children: [
            {
              title: 'Numeric tabular data',
              type: 'scroll-to',
              ref: 'numeric-tabular'
            },
            {
              title: 'Data in a table',
              type: 'scroll-to',
              ref: 'numeric-data'
            },
            {
              title: 'Hover rows',
              type: 'scroll-to',
              ref: 'hover-rows'
            },
            {
              title: 'Collapsible table',
              type: 'scroll-to',
              ref: 'collapsible-table'
            },
            {
              title: 'Data visualisation',
              type: 'scroll-to',
              ref: 'data-visualisation'
            }
          ]
        },
        {
          title: 'Buttons',
          children: [
            {
              title: 'Button Text',
              type: 'scroll-to',
              ref: 'button-text'
            },
            {
              title: 'Start Now Button',
              type: 'scroll-to',
              ref: 'start-now-button'
            },
            ,
            {
              title: 'Review Complete',
              type: 'scroll-to',
              ref: 'review-complete'
            },
            {
              title: 'Button Alignment',
              type: 'scroll-to',
              ref: 'button-alignment'
            },
            {
              title: 'Disabled Buttons',
              type: 'scroll-to',
              ref: 'disabled-buttons'
            },
            {
              title: 'Arrow Buttons',
              type: 'scroll-to',
              ref: 'arrow-buttons'
            }
          ]
        },
        {
          title: 'Alpha Beta Banners',
          children: [
            {
              title: 'Alpha Banner',
              type: 'scroll-to',
              ref: 'alpha-banner'
            },
            {
              title: 'Beta Banner',
              type: 'scroll-to',
              ref: 'beta-banner'
            }
          ]
        },
        {
          title: 'Form Elements',
          href: null,
          children: [
            {
              title: 'Labels',
              type: 'scroll-to',
              ref: 'labels'
            },
            {
              title: 'Form Focus States',
              type: 'scroll-to',
              ref: 'form-focus-states'
            },
            {
              title: 'Hint Text',
              type: 'scroll-to',
              ref: 'hint-text'
            },
            {
              title: 'Form Spacing',
              type: 'scroll-to',
              ref: 'form-spacing'
            },
            {
              title: 'Form Fieldsets',
              type: 'scroll-to',
              ref: 'form-fieldsets'
            },
            {
              title: 'Form Select Boxes',
              type: 'scroll-to',
              ref: 'form-select-boxes'
            },
            {
              title: 'Form Inline Radio Buttons',
              type: 'scroll-to',
              ref: 'inline-radio-buttons'
            },
            {
              title: 'Form Stacked Radio Buttons',
              type: 'scroll-to',
              ref: 'stacked-radio-buttons'
            },
            {
              title: 'Form Stacked Checkboxes',
              type: 'scroll-to',
              ref: 'stacked-checkboxes'
            },
            {
              title: 'Form Inline Checkboxes',
              type: 'scroll-to',
              ref: 'inline-checkboxes'
            },
            {
              title: 'Radio Conditionally Reveal Content',
              type: 'scroll-to',
              ref: 'radio-conditionally-reveal-content'
            },
            {
              title: 'Checkbox Conditionally Reveal Content',
              type: 'scroll-to',
              ref: 'checkbox-conditionally-reveal-content'
            },
            {
              title: 'Form Checkbox Toggle Content',
             type: 'scroll-to',
              ref: 'toggle-content-checkboxes'
            }
          ],
        },
        {
          title: 'Errors and Validation',
          href: null,
          children: [
            {
              title: 'Error message and summary box',
              type: 'scroll-to',
              ref: 'error-message-and-summary-box'
            },
            {
              title: 'Highlight errors in forms',
              type: 'scroll-to',
              ref: 'highlight-errors-in-forms'
            }
          ]
        }
      ];
    }
  }
})();
