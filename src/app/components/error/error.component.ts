import { SuiModal, ComponentModalConfig, ModalSize } from 'ng2-semantic-ui';
import { Component } from '@angular/core';

interface IConfirmModalContext {
    title: string;
    question: string;
}

@Component({
    selector: 'app-modal-error',
    templateUrl: './error.component.html'
})
export class ConfirmModalComponent {
    constructor(public modal: SuiModal<IConfirmModalContext, void, void>) {
    }
}

export class ConfirmModal extends ComponentModalConfig<IConfirmModalContext, void, void> {
    constructor(title: string, question: string, size = ModalSize.Small) {
        super(ConfirmModalComponent, {title, question});
        this.isClosable = true;
        this.transitionDuration = 200;
        this.size = size;
    }
}
