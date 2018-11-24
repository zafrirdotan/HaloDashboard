import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UsersService } from './users/users.service';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
