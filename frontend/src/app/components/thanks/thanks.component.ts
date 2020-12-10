import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit {

  profilePicture: string;
  loggedInUser$: User;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loggedInUser$ = JSON.parse(sessionStorage.getItem('currentUser'));
    this.profilePicture = this.loggedInUser$.picture;
  }

  deleteSessionUserInfo(): void {
    sessionStorage.removeItem('currentUser');
  }

}
