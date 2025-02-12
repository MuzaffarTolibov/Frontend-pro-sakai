import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { InputText } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { Textarea } from 'primeng/textarea';
import { Dialog } from 'primeng/dialog';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-test',
    imports: [
        Button,
        Select,
        InputText,
        NgIf,
        Textarea,
        Dialog,
        FormsModule
    ],
    templateUrl: './test.component.html',
    standalone: true,
    styleUrl: './test.component.scss'
})
export class TestComponent {
    @Input() title: string | undefined;
    @Input() showCreateModal: boolean = false;
    @Output() close: EventEmitter<boolean> = new EventEmitter();

    form: FormGroup = new FormGroup({

    });

    constructor() {
    }

    hideModal(): void {
        this.close.emit(false);
    }

}
