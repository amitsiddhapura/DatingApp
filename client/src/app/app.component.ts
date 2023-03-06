import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ɵafterNextNavigation } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  users: any;

  constructor(private http: HttpClient){

    this.http.get("https://localhost:7047/users").subscribe({
      next : response =>  this.users = response,
      error: error => console.log(error),
      complete: ()=> console.log("execution completed")
    });

  }

}
