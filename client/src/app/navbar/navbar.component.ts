import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};
  currentUser$ : Observable<User | null> = of(null);

  constructor(public accountservice: AccountService) {

  }

  ngOnInit(): void {
    this.currentUser$ = this.accountservice.currentUser$;
  }

  getCurrentUser(){
    this.accountservice.currentUser$.subscribe({
      next: user => !! user,
      error : error => console.log(error)
    })
  }

  login() {
    this.accountservice.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }

    });
  }

  logout(){
    this.accountservice.logout();
  }

}
