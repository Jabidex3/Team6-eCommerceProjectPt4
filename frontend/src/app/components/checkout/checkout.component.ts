import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  userForm: FormGroup;
  profilePicture: string;
  loggedInUser$: User;

  constructor(private router: Router) {
    this.loggedInUser$ = JSON.parse(sessionStorage.getItem('currentUser'));
    this.profilePicture = this.loggedInUser$.picture;
  }

  ngOnInit(): void {
    this.userForm = this.createUserForm();
  }

  createUserForm(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      baddress: new FormControl("", [Validators.required]),
      bapt: new FormControl(""),
      bcity: new FormControl("", [Validators.required]),
      bstate: new FormControl("", [Validators.required]),
      bcountry: new FormControl("", [Validators.required]),
      bzip: new FormControl("", [Validators.required]),
      saddress: new FormControl("", [Validators.required]),
      sapt: new FormControl(""),
      scity: new FormControl("", [Validators.required]),
      sstate: new FormControl("", [Validators.required]),
      scountry: new FormControl("", [Validators.required]),
      szip: new FormControl("", [Validators.required])
    });
  }

  continueToSubmitOrder(): void {
    console.log(this.userForm.value);
  }

  deleteSessionUserInfo(): void {
    sessionStorage.removeItem('currentUser');
  }

}
