import { Component } from '@angular/core';
import { UsersService } from './users/users.service';
import { User } from './users/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'halo-dashboard';
  users: User[];
  constructor(private usersService: UsersService) {
    
    this.usersService.getRandomUsers().subscribe(users=>{
      this.users = users;
    })
  }
  
}
