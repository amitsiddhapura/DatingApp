import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private accountservice: AccountService, private toastr: ToastrService){

  }

  register(){
    this.accountservice.register(this.model).subscribe({
      next : () => {
        console.log("completed");
        this.cancel();
      },
      error: error => {
        this.toastr.error(error.errors); }
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
