import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(public accountservice: AccountService, private toastr : ToastrService) {

  }

  ngOnInit(): void {
    this.currentUser$ = this.accountservice.currentUser$;
  }

  getCurrentUser(){
    this.accountservice.currentUser$.subscribe({
      next: user => !! user,
      error : error => this.toastr.error(error.error)
    })
  }

  login() {
    this.accountservice.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        this.toastr.error(error.error)
      }

    });
  }

  logout(){
    this.accountservice.logout();
  }

}
