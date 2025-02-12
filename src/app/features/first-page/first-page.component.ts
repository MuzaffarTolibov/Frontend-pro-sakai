import { Component, signal, WritableSignal } from '@angular/core';
import { TestComponent } from '../test/test.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { IUser } from '../test/model/user.model';

interface ITableData {
    id: number;
    firstName: string;
    lastName: string;
    patronymicName?: string;
    age: number;
    address: string;
    phone: string;
}

@Component({
    selector: 'app-first-page',
    imports: [
        TableModule,
        CommonModule,
        TestComponent,
        Button,
        Toolbar
    ],
    templateUrl: './first-page.component.html',
    standalone: true,
    styleUrl: './first-page.component.scss'
})
export class FirstPageComponent {
    isShowCreateDialog: WritableSignal<boolean> = signal(false);
    dataSource: ITableData[] = [
        {
            id: 1,
            firstName: 'Loik',
            lastName: 'Rujabov',
            patronymicName: 'Testovich',
            age: 18,
            address: '19 mkr',
            phone: '0123456789'
        },
        {
            id: 2,
            firstName: 'Test',
            lastName: 'Testov',
            patronymicName: 'Testovich',
            age: 80,
            address: '19 mkr',
            phone: '+992929040255262'
        },
        {
            id: 3,
            firstName: 'Hukim',
            lastName: 'Hukimov',
            patronymicName: 'Testovich',
            age: 50,
            address: '19 mkr',
            phone: '+992929040255262'
        },
    ];
    cols = [
        {field: 'id', header: '№'},
        {field: 'firstName', header: 'Имя'},
        {field: 'lastName', header: 'Фамилия'},
        {field: 'patronymicName', header: 'Отчество'},
        {field: 'age', header: 'Возраст'},
        {field: 'address', header: 'Адрес'},
        {field: 'phone', header: 'Номер'},
    ];

    constructor() {
    }

    showCreateDialog() {
        this.isShowCreateDialog.set(true);
    }

    addUserToTable(event: IUser) {
        this.isShowCreateDialog.set(false);

        this.dataSource.push(event);
    }
}


