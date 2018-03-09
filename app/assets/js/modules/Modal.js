import $ from 'jquery';
class Modal {
    constructor(){
        this.openModalBtn = $(".open-modal");
        this.modal = $(".modal");
        this.closeModalBtn = $(".modal__close");
        this.events();
    }
    events(){
        //clicking the modal button
        this.openModalBtn.click(this.openModal.bind(this));

        // clicking the x modal button
        this.closeModalBtn.click(this.closeModal.bind(this));

        //pushes any key
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    keyPressHandler(e){
        if (e.keyCode == 27 || e.keyCode == 13){
            this.closeModal();
        }
    }

    openModal(){
        this.modal.addClass("modal--open");
        return false;
    }

    closeModal(){
        this.modal.removeClass("modal--open");
    }

}
export default Modal;