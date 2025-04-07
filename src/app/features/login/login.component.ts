import { Component } from '@angular/core';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    imports: [
        AppFloatingConfigurator,
        Password,
        Button,
        InputText,
        ReactiveFormsModule
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
}
