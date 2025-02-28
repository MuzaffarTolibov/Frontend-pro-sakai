import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { IUser } from './model/user.model';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
    selector: 'app-users',
    imports: [
        Toolbar,
        Button,
        TableModule,
        CommonModule,
        UserFormComponent
    ],
    templateUrl: './users.component.html',
    standalone: true,
    styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
    isShowCreateDialog: WritableSignal<boolean> = signal(false);
    currentUser: IUser;
    dataSource: IUser[] = [];

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

    constructor(
        private readonly service: UsersService,
    ) {

    }

    ngOnInit(): void {
        this.initialize();
    }

    showUserCreateDialog() {
        this.isShowCreateDialog.set(true);

        // this.currentUser = null;
    }

    showUpdateDialog(user: IUser) {
        this.isShowCreateDialog.set(true);

        this.currentUser = user;
    }

    addUser(user: IUser): void {
        this.dataSource.push(user);
    }

    updateUser(user: IUser) {
        const index = this.dataSource.findIndex(item => item.id === user.id);
        this.dataSource.splice(index, 1, user);
    }

    initialize() {
        this.service.getUsers()
            .subscribe((res: any) => this.dataSource = res.users);
    }
}
