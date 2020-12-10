import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog'

import { AdminComponent } from './components/admin/admin.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './components/user/user.component';
import { ShopComponent } from './components/shop/shop.component';
import { ViewItemComponent } from './components/view-item/view-item.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThanksComponent } from './components/thanks/thanks.component';
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    UserComponent,
    ShopComponent,
    ViewItemComponent,
    CartComponent,
    AdminProfileComponent,
    CheckoutComponent,
    ThanksComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatRadioModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
