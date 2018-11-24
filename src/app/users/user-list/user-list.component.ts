import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public users: User[];
  private getUserSub: Subscription;
  private selectedUser: string;
  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(): void {
    this.getUserSub = this.usersService.getUsers()
    .subscribe(users => {
      this.users = users;
    });
  }

  ngOnDestroy(){
    this.getUserSub.unsubscribe();
  }

}
