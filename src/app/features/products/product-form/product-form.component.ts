import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    signal,
    ViewChild,
    WritableSignal
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { JsonPipe, NgForOf } from '@angular/common';
import { MessageService, PrimeTemplate } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';

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
    styleUrl: './product-form.component.scss',
    providers: [MessageService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit{
    @Input() title: string | undefined;
    @Input() showCreateModal: boolean = false;
    @Input() products: any = null;
    @Input() sumAllProducts: number = 0;
    @Output() close: EventEmitter<boolean> = new EventEmitter();
    @Output() payment: EventEmitter<boolean> = new EventEmitter();

    isPayed: WritableSignal<boolean> = signal(true);

    prod: WritableSignal<any> = signal([]);

    @ViewChild('dt') table: Table;
    form!: FormGroup;

    cols = [
        { field: 'product', header: 'Прадукт' },
        { field: 'quantity', header: 'Количество' },
        { field: 'totalCost', header: 'Цена' }
    ];

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
    ) {

    }

    ngOnInit() {
        this.prod.set(this.products);
        if(this.products.length) {
            this.isPayed.set(false);
        }
    }

    hideModal(): void {
        this.close.emit(false);
    }

    payProduct() {
        this.products = [];
        this.prod.set([]);
        this.table.reset();
        this.payment.emit(true);
    }
}
