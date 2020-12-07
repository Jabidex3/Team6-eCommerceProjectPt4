import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { Product } from 'src/app/models/Product';
import { UserListCrudService } from 'src/app/services/user-list-crud.service';
import { ProductCrudService } from 'src/app/services/product-crud.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { stringify } from 'querystring';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  newUserForm: FormGroup;
  newProductForm: FormGroup;
  profilePicture:string;
  currAdmin$:User;
  users$:Observable<User[]>;
  products$: Observable<Product[]>;
  constructor(private userListCrudService:UserListCrudService,private productCrudService: ProductCrudService, private router: Router) {
    this.currAdmin$ = JSON.parse(sessionStorage.getItem('currentUser'));
    this.profilePicture =  this.currAdmin$.picture;
   }

  ngOnInit(): void {
    this.users$ = this.userListCrudService.fetchAll()
    this.newUserForm = this.createFormGroup();
    this.newProductForm = this.createProductFormGroup();
    this.products$ = this.productCrudService.fetchAll();
  }

  createFormGroup():FormGroup{
    return new FormGroup({
      email: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]),
      role: new FormControl("",[Validators.required])
      //, role: new FormControl("user")
    });
  }
  createProductFormGroup():FormGroup{
    return new FormGroup({
      product_name: new FormControl("",[Validators.required]),
      description: new FormControl("",[Validators.required]),
      price: new FormControl("",[Validators.required]),
      picture: new FormControl("",[Validators.required])
     
    });
  }
  // post(email: String, password:String):void{
  //   const inpOne = email.trim();
  //   const inpTwo = password.trim();
  //   if(!inpOne || !inpTwo){
  //     return;
  //   }

  //   console.log(inpOne);
  //   console.log(inpTwo);
  //   //this.users$ = 
  //   this.userListCrudService.post(inpOne,inpTwo);
  // }

  div1:boolean=false;
  div2:boolean=false;
  post():void{
    const inpOne = this.newUserForm.controls['email'].value.trim()
    const inpTwo = this.newUserForm.controls['password'].value.trim()
    const inpThree = this.newUserForm.controls['role'].value

    if(!inpOne || !inpTwo || !inpThree){
      return;
    }
    if(inpThree.toLowerCase() === "user" || inpThree.toLowerCase() === "admin"){
      console.log(this.newUserForm.value);
      console.log(inpOne);
      console.log(inpTwo);
      console.log(inpThree);
      this.userListCrudService.post(this.newUserForm.value).subscribe();
      this.div2=true;
      if(this.div1==true){
        this.div1 = false;
      }
    }
    else{
      console.log("invalid input");
      console.log(this.newUserForm.value);
      console.log(inpOne);
      console.log(inpTwo);
      console.log(inpThree);
      this.div1=true;
      if(this.div2==true){
        this.div2 = false;
      }
    }
    //this.userListCrudService.post(this.newUserForm.value).subscribe();
    //window.location.reload();
  }

  // div1:boolean=false;
  // div1func(){
  //   if(this.div1==false){
  //     this.div1=true;
  //   }
  //   else{
  //     this.div1=false;
  //   }
    
  // }

  // acting as constants
  BTN_SHOW_PRODUCTS:string="showProducts";
  BTN_SHOW_USER:string = "showUser";
  BTN_ADD_USER:string="addUser";

  displayDiv:boolean=false;
  addUser:boolean=false;
  addUserfunc(){
    if(this.addUser==false){
      this.addUser=true;
    }
    else{
      this.addUser=false;
    }
  }

  /**
   * Changes the div rendered based on the arg
   * @arg String  value passed in from HTML button click
   */
  changeView(arg) {

    if (this.showProducts && this.showUser) {
      this.showUser = (arg === this.BTN_SHOW_PRODUCTS) ? !this.showUser : this.showUser;
      this.showProducts = (arg === this.BTN_SHOW_USER) ? !this.showProducts : this.showProducts;    
    }

    else if (this.showProducts && this.addUser) {
      this.addUser = (arg === this.BTN_SHOW_PRODUCTS) ? !this.addUser : this.addUser;
      this.showProducts = (arg === this.BTN_ADD_USER) ? !this.showProducts : this.showProducts;
    }

    else if (this.showUser && this.addUser) {
      this.addUser = (arg === this.BTN_SHOW_USER) ? !this.addUser : this.addUser;
      this.showUser = (arg === this.BTN_ADD_USER) ? !this.showUser : this.showUser;
    }
  
  }

  displayDivfunc(arg) {
    // opening a div and making it visible
    if (this.displayDiv == false ) {
      this.displayDiv = true;      
    }

      if (this.displayDiv == true) {

        // because of arg, one of these flags will be true and displays div
        if (arg === this.BTN_SHOW_USER) {
          this.showUserfunc();
        }

        else if (arg === this.BTN_ADD_USER) {
          this.addUserfunc();
        }

        else if (arg === this.BTN_SHOW_PRODUCTS) {
          this.showProductsfunc();
        }

        this.changeView(arg)

        // closes div element and makes it not visible
        if (!this.showUser && !this.addUser &&!this.showProducts) {
          this.displayDiv = false;
        }
    }
  }

  showUser:boolean=false;
  showUserfunc(){
    if(this.showUser==false){
      this.showUser=true;
    }
    else{
      this.showUser=false;
    }
  }

  showProducts:boolean=false;
  showProductsfunc() {
    this.showProducts = (!this.showProducts) ? true : false;
  }
  
  delete(id:number):void{
    this.userListCrudService.delete(id).subscribe();
    var loggedInUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if(loggedInUser.id==id){
      sessionStorage.removeItem('currentUser');
      this.router.navigate([""]);
    }
    else{
      window.location.reload();
    }
    
  }

  deleteSessionUserInfo():void{
    sessionStorage.removeItem('currentUser');
  }
  addProduct:boolean = false;
  toggleAddProduct(){
    if(this.addProduct==false){
      this.addProduct=true;
    }
    else{
      this.addProduct=false;
    }
    
  }
  public onFileChange(event) {
    const reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
        this.newProductForm.patchValue({
          picture: reader.result
        });
      };
    }
  }
 
  postProduct()
  {
    let inpOne = this.newProductForm.controls['product_name'].value.trim();
    let inpTwo = this.newProductForm.controls['description'].value.trim();
    let inpFour = this.newProductForm.controls['price'].value;
    let inpFile = this.newProductForm.controls['picture'].value;
    this.productCrudService.postProduct(this.newProductForm.value).subscribe();
  }

}
