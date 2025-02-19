import { Component } from '@angular/core';
import { IUser } from './model/user.model';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-users',
    imports: [
        Toolbar,
        Button,
        TableModule,
        CommonModule
    ],
    templateUrl: './users.component.html',
    standalone: true,
    styleUrl: './users.component.scss'
})
export class UsersComponent {
    dataSource: IUser[] = []

    cols = [
        {field: 'action', header: 'Действие'},
        {field: 'id', header: '№'},
        {field: 'username', header: 'Логин'},
        {field: 'password', header: 'Пароль'},
        {field: 'firstname', header: 'Имя'},
        {field: 'lastname', header: 'Фамилия'},
        {field: 'address', header: 'Адрес'},
        {field: 'phone', header: 'Номер'},
        {field: 'email', header: 'Email'},
    ];
}
