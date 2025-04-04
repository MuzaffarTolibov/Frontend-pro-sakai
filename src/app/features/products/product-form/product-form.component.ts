import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../users/model/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../users/users.service';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { IProduct } from '../model/product.model';
import { JsonPipe, NgForOf } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-product-form',
    imports: [
        Dialog,
        ReactiveFormsModule,
        InputText,
        Button,
        JsonPipe,
        NgForOf,
        PrimeTemplate,
        TableModule
    ],
    templateUrl: './product-form.component.html',
    standalone: true,
    styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
    @Input() title: string | undefined;
    @Input() showCreateModal: boolean = false;
    @Input() products: any = null;
    @Input() sumAllProducts: number = 0;
    @Output() close: EventEmitter<boolean> = new EventEmitter();
    @Output() payment: EventEmitter<boolean> = new EventEmitter();

    form!: FormGroup;

    cols = [
        {field: 'product', header: 'Прадукт'},
        {field: 'quantity', header: 'Количество'},
        {field: 'totalCost', header: 'Цена'},
    ];

    constructor(
        private fb: FormBuilder,
    ) {
    }

    hideModal(): void {
        this.close.emit(false);
    }

    payProduct() {
        this.products = null;
        this.payment.emit(true);
    }
}
