import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';
import { User } from '../../../interfaces/users.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  error = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
        console.log('USERS',data);
        
      },
      error: (err) => {
        console.error('Ошибка при загрузке пользователей:', err);
        this.error = 'Ошибка при загрузке пользователей';
        this.isLoading = false;
      }
    });
  }
}