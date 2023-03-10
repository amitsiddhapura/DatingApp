import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ɵafterNextNavigation } from '@angular/router';
import { User } from './_models/User';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any;

  constructor(private http: HttpClient, private accountservice: AccountService){
  }

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers() {
    this.http.get("https://localhost:7047/api/users").subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log("execution completed")
    });
  }

  setCurrentUser(){
    const userstring = localStorage.getItem('user');
    if(!userstring){
      return;
    }
    const user:User = JSON.parse(userstring);
    this.accountservice.setCurrentUser(user);
  }

}
