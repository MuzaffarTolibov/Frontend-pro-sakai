import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { InputText } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { Textarea } from 'primeng/textarea';
import { Dialog } from 'primeng/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from './model/user.model';

@Component({
    selector: 'app-test',
    imports: [
        Button,
        Select,
        InputText,
        NgIf,
        Textarea,
        Dialog,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './test.component.html',
    standalone: true,
    styleUrl: './test.component.scss'
})
export class TestComponent {
    @Input() title: string | undefined;
    @Input() showCreateModal: boolean = false;
    @Output() close: EventEmitter<boolean> = new EventEmitter();
    @Output() create: EventEmitter<IUser> = new EventEmitter();

    form: FormGroup = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        patronymicName: new FormControl(''),
        age: new FormControl('', Validators.required),
        address: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(12)]),
    });

    constructor() {
    }

    hideModal(): void {
        this.close.emit(false);
    }

    saveUser() {
        if (this.form.invalid) return;

        const id = parseInt(String(Math.random() * 100))

        const value = {...this.form.value};
        value.id = id;

        this.create.emit(value);
    }

}
