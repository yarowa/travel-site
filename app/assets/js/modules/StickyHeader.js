import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
class StickyHeader {
    constructor(){
        this.siteHeader = $(".site-header");
        this.headerTriggerElement = $(".large-hero__title");
        this.pageSection = $(".page-section");
        this.navigation = $(".primary-nav a");
        this.createHeaderWaypoint();
        this.createPageSectionWaypoint();
        this.addSmoothScroll();
    }
    addSmoothScroll(){
        this.navigation.smoothScroll();
    }
    createHeaderWaypoint(){
        const that = this;
        new Waypoint({
           element: this.headerTriggerElement[0],
           handler: function (direction) {
               if (direction == "down"){
                   that.siteHeader.addClass("site-header--dark");
               }
               else {
                   that.siteHeader.removeClass("site-header--dark");
               }
           },
            offset: "-15%"
        });
    }

    createPageSectionWaypoint(){
        const nav = this;
        this.pageSection.each(function () {
            const currentPageSection = this;
            new Waypoint({
              element: currentPageSection,
              handler: function (direction) {
                  if (direction == "down"){
                      const smoothlink = currentPageSection.getAttribute("data-matching");
                      nav.navigation.removeClass("current-link");
                      $(smoothlink).addClass("current-link");
                  }
              },
                offset: "18%"
           });

            new Waypoint({
                element: currentPageSection,
                handler: function (direction) {
                    if (direction == "up"){
                        const smoothlink = currentPageSection.getAttribute("data-matching");
                        nav.navigation.removeClass("current-link");
                        $(smoothlink).addClass("current-link");
                    }
                },
                offset: "-40%"
            });
        });
    }
}
export default StickyHeader;