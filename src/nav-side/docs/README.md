This modules is used to create a navigation panel on the left side of the screen, it has been created by utilising the ng-bootstrap accordion

In order to set up the side nav, there are a couple of things that need to be done:

1. Add the directive as an attribute 'data-nav-side-directive'
2. In the controller create an object with the the navigation items (See example for correct format) and assign it to the scope
3. Add the attribute 'data-navigation-items' with an assigned value of the object created in the controller
  * under the 'type', you have the option to add 'scrollto', 'uisref' or 'href' as a string to decide where the anchor goes.
  * please note: if the 'scrollto' option is chosen, the 'ref' should be set to the id of the element to be scrolled to.
  * if a 'detail' is provided to one of the child items this will sit below the list item below, please refer to the example.