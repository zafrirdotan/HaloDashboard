import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { User } from './user.interface';
import { map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private UrlConfigurations: any = {
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    numberOfUsers: 10,
    fields: 'id,name,email,dob,location, phone,login,picture',
  };

  private users: User[];

  constructor(private http: HttpClient, private location: Location) {}

  // Initializes the apps data and saves it on local storage.
  public getRandomUsers(): Observable<User[]> {
    this.users = JSON.parse(localStorage.getItem('users'));
    if (this.users) {
      return of(this.users);
    } else {
      let url =
        this.UrlConfigurations.url +
        '/?format=' +
        this.UrlConfigurations.dataType +
        '&results=' +
        this.UrlConfigurations.numberOfUsers +
        '&inc=' +
        this.UrlConfigurations.fields;

      return this.http.get<any>(url).pipe(
        map(users => {
          this.users = this.formatUsers(users.results);
          localStorage.setItem('users', JSON.stringify(this.users));
          return this.users;
        })
      );
    }
  }

  public getUsers(): Observable<User[]> {
    this.users = JSON.parse(localStorage.getItem('users'));
    return of(this.users);
  }

  public getUser(id?: string): User {
    let selectedUser: User;
    if (id) {
      selectedUser = this.users.find(user => {
        return user.id === id;
      });
      if (!selectedUser) {
        selectedUser = this.users[0];
        this.location.replaceState('user-details', selectedUser.id);
      }
    } else {
      selectedUser = this.users[0];
      this.location.replaceState('user-details', selectedUser.id);
    }
    return selectedUser;
  }
  // changes the vote counter of the user and stores it on local storage. 
  public vote(id: string): void {
    this.users = this.users.map(user => {
      if (user.id === id) {
        user.voteCount++;
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  // Formats the user to implement a local User interface. 
  private formatUsers(users: any[]): User[] {
    return users.map((user, index) => {
      return {
        id: user.id.value || (index + 1).toString(),
        name: user.name.first + ' ' + user.name.last,
        email: user.email,
        birthDay: user.dob.date,
        address: user.location.street,
        phone: user.phone,
        password: user.login.password,
        picture: user.picture.large,
        voteCount: 0,
      };
    });
  }

}
