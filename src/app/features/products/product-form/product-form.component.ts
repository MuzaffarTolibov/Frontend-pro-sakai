import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../users/model/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../users/users.service';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { IProduct } from '../model/product.model';

@Component({
    selector: 'app-product-form',
    imports: [
        Dialog,
        ReactiveFormsModule,
        InputText,
        Button
    ],
    templateUrl: './product-form.component.html',
    standalone: true,
    styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
    @Input() title: string | undefined;
    @Input() showCreateModal: boolean = false;
    @Input() products: any = null;
    @Output() close: EventEmitter<boolean> = new EventEmitter();
    @Output() create: EventEmitter<IUser> = new EventEmitter();
    @Output() update: EventEmitter<IUser> = new EventEmitter();

    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private readonly service: UsersService
    ) {
    }

    @Input() set productItem(item: IProduct) {
        if (item) {
            this.form.patchValue(item);
        }
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            id: [''],
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

        const value = {...this.form.value};

        if (value.id) {
            this.service.update(value, value.id)
                .subscribe((res: any) => {
                    this.update.emit(res.user);
                })
        } else {
            delete value.id;
            this.service.createUser(value)
                .subscribe((res: any) => {
                    this.create.emit(res.user)
                })
        }

        this.close.emit(false);
    }
}
