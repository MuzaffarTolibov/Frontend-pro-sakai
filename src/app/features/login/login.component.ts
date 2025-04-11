import { Component, DestroyRef } from '@angular/core';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from 'primeng/message';
import { NgClass, NgIf } from '@angular/common';
import { TokenService } from '../../core/services/token.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-login',
    imports: [
        AppFloatingConfigurator,
        Password,
        Button,
        InputText,
        ReactiveFormsModule,
        Message,
        NgClass,
        NgIf
    ],
    templateUrl: './login.component.html',
    standalone: true,
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    form = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.minLength(4),
            Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })

    loading: boolean = false;

    invalidPasswordOrLogin: boolean = false;

    submitted: boolean = false;

    constructor(
        private readonly tokenService: TokenService,
        private readonly service: AuthService,
        private readonly router: Router,
        private readonly destroyRef: DestroyRef
    ) {
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

        this.service.login(this.form.value)
            .pipe(
                finalize(() => this.loading = false),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (res: any) => {
                    if (res.access_token) {
                        this.tokenService.setTokens(res)
                        this.router.navigateByUrl('/').catch()
                    } else {
                        this.form.setErrors({login: true, password: true})
                    }
                },
                error: err => {
                    if (err.statusCode === 401) {
                        this.invalidPasswordOrLogin = true;
                    }
                    console.log(err);
                }
            })
    }
}
