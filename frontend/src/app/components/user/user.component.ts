import { Component, OnInit } from '@angular/core';
import { UserListCrudService } from 'src/app/services/user-list-crud.service';
import { Router } from "@angular/router";
import { User } from 'src/app/models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  loggedInUser$: User;
  updateUserForm: FormGroup;
  profilePicture: string;
  currUser$: User;
  constructor(private userListCrudService: UserListCrudService, private router: Router) {
    this.currUser$ = JSON.parse(sessionStorage.getItem('currentUser'));
    this.profilePicture = this.currUser$.picture;
  }

  ngOnInit(): void {
    this.loggedInUser$ = JSON.parse(sessionStorage.getItem('currentUser'));
    this.updateUserForm = this.createFormGroup();
    //this.userName();
    this.profilePicture = this.loggedInUser$.picture;
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl({ value: this.loggedInUser$.id, disabled: true }, [Validators.required]),
      email: new FormControl({ value: this.loggedInUser$.email, disabled: true }, [Validators.required]),
      password: new FormControl(this.loggedInUser$.password, [Validators.required]),
      role: new FormControl(this.loggedInUser$.role, [Validators.required]),
      picture: new FormControl("", [Validators.required])
    });
  }

  deleteSessionUserInfo(): void {
    sessionStorage.removeItem('currentUser');
  }

  displayPerson(): void {
    console.log(this.loggedInUser$);
    let myContainer = document.getElementById('last') as HTMLElement;
    myContainer.innerHTML = "hello";
  }

  userName(): void {
    console.log(this.loggedInUser$);
    let myContainer2 = document.getElementById('hiName') as HTMLElement;
    myContainer2.innerHTML = "Hello <b>" + this.loggedInUser$.email + "</b> !!!";
  }


  delete(): void {
    this.userListCrudService.delete(this.loggedInUser$.id).subscribe();
    sessionStorage.removeItem('currentUser');
    this.router.navigate([""]);
  }
  update(): void {
    console.log(this.updateUserForm.value);
    // this.userListCrudService.update(this.loggedInUser$.id).subscribe();
    // sessionStorage.removeItem('currentUser');
    // this.router.navigate([""]);
    var user = {
      id: this.loggedInUser$.id,
      email: this.loggedInUser$.email,
      password: this.updateUserForm.controls['password'].value,
      role: this.loggedInUser$.role,
      picture: this.profilePicture
    }
    this.userListCrudService.update(user).subscribe();
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    // window.location.reload();
  }

  showDetails: boolean = false;
  showUserDetailfunc(): void {
    if (this.showDetails == false) {
      this.showDetails = true;
    }
    else {
      this.showDetails = false;
    }
  }

  public onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.updateUserForm.patchValue({
          picture: reader.result
        });
        this.profilePicture = this.updateUserForm.controls['picture'].value;
      };
    }
  }


}
