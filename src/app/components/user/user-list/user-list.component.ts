import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Route } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgFor,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'email', 'acao'];
  usuarios: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.findAll().subscribe((data) => {
      this.usuarios = data;
      console.log(this.usuarios);
    });
  }
  deleteUser(user: User) {
    this.userService.delete(user).subscribe({
      next: () => {
        // Remove the user from the list
        this.usuarios = this.usuarios.filter((u) => u.id !== user.id);
      },
      error: (err) => {
        console.log('Erro ao deletar Usuário', err);
      },
    });
  }
}
