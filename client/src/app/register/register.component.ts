import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model : any = {};

  @Input() inputFromParent : any;
  @Output() cancelRegister = new EventEmitter();

  constructor(private accountservice: AccountService){

  }

  register(){
    this.accountservice.register(this.model).subscribe({
      next : () => {
        console.log("completed");
        this.cancel();
      },
      error: error => console.log(error) 
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
