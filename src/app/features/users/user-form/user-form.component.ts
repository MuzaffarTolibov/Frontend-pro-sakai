import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../test/model/user.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-user-form',
    imports: [
        Dialog,
        ReactiveFormsModule,
        InputText,
        Button
    ],
    templateUrl: './user-form.component.html',
    standalone: true,
    styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit{
    @Input() title: string | undefined;
    @Input() showCreateModal: boolean = false;
    @Output() close: EventEmitter<boolean> = new EventEmitter();
    @Output() create: EventEmitter<IUser> = new EventEmitter();

    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {
    }

    @Input() set userItem(item: IUser) {
        if (item) {
            this.form.patchValue(item);
        }
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(4)]],
            name: this.fb.group({
                firstname: ['', [Validators.required]],
                lastname: ['', [Validators.required]],
            }),
            address: this.fb.group({
                city: ['', [Validators.required]],
            }),
            phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(12)]],
        })
    }

    hideModal(): void {
        this.close.emit(false);
        this.form.reset();
    }

    save() {
        if (this.form.invalid) return;

        console.log(this.form.value);
        this.close.emit(false);
    }
}
