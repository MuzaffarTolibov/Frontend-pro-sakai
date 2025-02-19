import { Component } from '@angular/core';
import { IUser } from './model/user.model';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-users',
    imports: [
        Toolbar,
        Button,
        TableModule
    ],
    templateUrl: './users.component.html',
    standalone: true,
    styleUrl: './users.component.scss'
})
export class UsersComponent {
    dataSource: IUser[] = []
}
