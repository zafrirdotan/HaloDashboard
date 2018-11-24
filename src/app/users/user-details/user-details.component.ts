import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { User } from '../user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  getUserSub: Subscription;
  private userId: string;
  private user: User;
  private selectedDetail: string = 'user';
  private detailToShow: string;
  private title: string = 'Hi, My name is';

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id: string = params.get('id');
      this.user = this.usersService.getUser(id);
      this.showDetail('user');
    });
  }

  // Changes the detailed to be shown based on the icon that was hovered over. 
  showDetail(detailType: string): void {
    switch (detailType) {
      case 'user':
        this.detailToShow = this.user.name;
        this.title = 'Hi, My name is';
        this.selectedDetail = 'user';
        break;
      case 'email':
        this.detailToShow = this.user.email;
        this.title = 'My email address is';
        this.selectedDetail = 'email';
        break;
      case 'birthDay':
        this.detailToShow = this.user.birthDay;
        this.title = 'My birthday is';
        this.selectedDetail = 'birthDay';
        break;
      case 'address':
        this.detailToShow = this.user.address;
        this.title = 'My address is';
        this.selectedDetail = 'address';
        break;
      case 'phoneNumber':
        this.detailToShow = this.user.phone;
        this.title = 'My phone number is';
        this.selectedDetail = 'phoneNumber';
        break;
      case 'password':
        this.detailToShow = this.user.password;
        this.title = 'My password is';
        this.selectedDetail = 'password';
        break;
      default:
        break;
    }
  }

  vote(): void {
    this.usersService.vote(this.user.id);
  }
}
