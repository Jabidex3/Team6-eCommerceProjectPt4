import { Component, OnInit } from '@angular/core';
import { UserListCrudService } from 'src/app/services/user-list-crud.service';
import { Router } from "@angular/router";
import { User } from 'src/app/models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  loggedInUser$:User;
  updateUserForm: FormGroup;
  profilePicture:string;
  currAdmin$:User;
  constructor(private userListCrudService:UserListCrudService,private router: Router) {
    this.currAdmin$ = JSON.parse(sessionStorage.getItem('currentUser'));
    this.profilePicture =  this.currAdmin$.picture;
   }

  ngOnInit(): void {
    this.loggedInUser$=JSON.parse(sessionStorage.getItem('currentUser'));
    this.updateUserForm = this.createFormGroup();
    this.userName();
    this.profilePicture = this.loggedInUser$.picture;
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      id: new FormControl({value: this.loggedInUser$.id, disabled:true }, [Validators.required]),
      email: new FormControl({value: this.loggedInUser$.email, disabled:true }, [Validators.required]),
      password: new FormControl(this.loggedInUser$.password,[Validators.required]),
      role: new FormControl(this.loggedInUser$.role, [Validators.required])
    });
  }

  deleteSessionUserInfo():void{
    sessionStorage.removeItem('currentUser');
  }

  displayPerson():void{
    console.log(this.loggedInUser$);
    let myContainer = document.getElementById('last') as HTMLElement;
    myContainer.innerHTML = "hello";
  }

  userName():void{
    console.log(this.loggedInUser$);
    let myContainer2 = document.getElementById('hiName') as HTMLElement;
    myContainer2.innerHTML = "Hello <b>" + this.loggedInUser$.email + "</b> !!!";
  }
  

  delete():void{
    this.userListCrudService.delete(this.loggedInUser$.id).subscribe();
    sessionStorage.removeItem('currentUser');
    this.router.navigate([""]);
  }
  update():void{
    console.log(this.updateUserForm.value);
    // this.userListCrudService.update(this.loggedInUser$.id).subscribe();
    // sessionStorage.removeItem('currentUser');
    // this.router.navigate([""]);
    this.userListCrudService.update(this.updateUserForm.value).subscribe();
    sessionStorage.setItem('currentUser',JSON.stringify(this.updateUserForm.value));
   // window.location.reload();
  }

  

}
