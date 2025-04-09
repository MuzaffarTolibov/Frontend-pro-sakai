import { Component } from '@angular/core';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from 'primeng/message';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-login',
    imports: [
        AppFloatingConfigurator,
        Password,
        Button,
        InputText,
        ReactiveFormsModule,
        Message,
        NgClass
    ],
    templateUrl: './login.component.html',
    standalone: true,
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    form = new FormGroup({
        login: new FormControl('', [Validators.required, Validators.minLength(4)]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })

    loading: boolean = false;

    invalidPasswordOrLogin: boolean = false;

    submitted: boolean = false;

    constructor() {
    }

    inInvalid(field: string): boolean {
        return this.form.get(field).touched && this.form.get(field).invalid;
    }

    login() {
        this.submitted = true;

        if(this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.loading = true;
    }
}
