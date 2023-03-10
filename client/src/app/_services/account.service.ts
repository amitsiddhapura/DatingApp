import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseurl = "https://localhost:7047/api/";

  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseurl + "Account/login", model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model:any){
    return this.http.post<User>(this.baseurl + "Account/createUser", model).pipe(
      map( user => {
        if(user){
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  logout() {
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

}
