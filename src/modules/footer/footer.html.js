angular.module("footer/footer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("footer/footer.html",
    "<footer id=\"footer\" class=\"cpp-footer\">\n" +
    "  <div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-md-10\">\n" +
    "        <div class=\"footer-meta-inner\">\n" +
    "          <nav>\n" +
    "            <ul id=\"menu-footer\" class=\"menu list-inline\">\n" +
    "              <li class=\"menu-all-government-blogs\"><a href=\"https://www.blog.gov.uk\">All GOV.UK blogs</a></li>\n" +
    "              <li class=\"menu-all-government-blog-posts\"><a href=\"https://www.blog.gov.uk/all-posts/\">All GOV.UK blog posts</a></li>\n" +
    "              <li class=\"menu-gov-uk\"><a href=\"https://www.gov.uk\">GOV.UK</a></li>\n" +
    "              <li class=\"menu-all-departments\"><a href=\"https://www.gov.uk/government/organisations\">All departments</a></li>\n" +
    "              <li class=\"menu-all-topics\"><a href=\"https://www.gov.uk/government/topics\">All topics</a></li>\n" +
    "              <li class=\"menu-all-policies\"><a href=\"https://www.gov.uk/government/policies\">All policies</a></li>\n" +
    "              <li class=\"menu-cookies\"><a href=\"https://www.blog.gov.uk/cookies\">Cookies</a></li>\n" +
    "            </ul>\n" +
    "          </nav>\n" +
    "          <div class=\"open-government-licence\">\n" +
    "            <p class=\"logo\">\n" +
    "              <a href=\"https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/\">Open Government Service</a>\n" +
    "            </p>\n" +
    "            <p>All content is available under the <a href=\"https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/\" rel=\"license\">Open Government Licence v3.0</a>, except where otherwise stated</p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-2 text-right\">\n" +
    "        <div id=\"crown-copy-cont\" class=\"text-center\">\n" +
    "          <div class=\"logo\">\n" +
    "              <a class=\"crown-copy\" href=\"https://www.nationalarchives.gov.uk/information-management/our-services/crown-copyright.htm\">&copy; Crown copyright</a>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</footer>\n" +
    "");
}]);
