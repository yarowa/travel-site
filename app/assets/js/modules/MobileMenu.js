import $ from 'jquery';
class MobileMenu{
    constructor(){
        this.header = $(".site-header");
        this.menuIcon = $(".site-header__menu-icon");
        this.menuContent = $(".site-header__menu");
        this.events();
    }

    events(){
        this.menuIcon.click(this.toggleMenu.bind(this));
    }
    toggleMenu(){
        this.menuContent.toggleClass("site-header__menu--is-visible");
        this.header.toggleClass("site-header--expanded");
        this.menuIcon.toggleClass("site-header__menu-icon--close");
    }

}
export default MobileMenu;