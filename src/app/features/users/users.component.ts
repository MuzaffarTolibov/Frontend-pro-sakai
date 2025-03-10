import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { IUser } from './model/user.model';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';
import { UserFormComponent } from './user-form/user-form.component';
import { finalize } from 'rxjs';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
    selector: 'app-users',
    imports: [
        Toolbar,
        Button,
        TableModule,
        CommonModule,
        UserFormComponent,
        InputText,
        IconField,
        InputIcon
    ],
    templateUrl: './users.component.html',
    standalone: true,
    styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
    isShowCreateDialog: WritableSignal<boolean> = signal(false);
    loading: WritableSignal<boolean> = signal(false);
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

    hideModal() {
        this.isShowCreateDialog.set(false)
        this.currentUser = null;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    showUserCreateDialog() {
        this.isShowCreateDialog.set(true);

        this.currentUser = null;
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

    deleteUser(user: IUser) {
        this.loading.set(true);

        this.service.delete(user.id)
            .pipe(
                finalize(() => this.loading.set(false))
            )
            .subscribe((res: any) => {
                if(res.status === "SUCCESS") {
                    this.dataSource = this.dataSource.filter(item => item.id !== user.id);
                }
            })
    }

    initialize() {
        this.loading.set(true);
        this.service.getUsers()
            .pipe(
                finalize(() => this.loading.set(false))
            )
            .subscribe((res: any) => this.dataSource = res.users);
    }
}
