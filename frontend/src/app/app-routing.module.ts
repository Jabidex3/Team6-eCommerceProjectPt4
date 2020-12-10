import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { AdminProfileComponent } from "./components/admin-profile/admin-profile.component";
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { ShopComponent } from './components/shop/shop.component';
import { ViewItemComponent } from './components/view-item/view-item.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThanksComponent } from './components/thanks/thanks.component';
import { EditProductComponent } from './edit-product/edit-product.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "admin", component: AdminComponent },
  { path: "adminprofile", component: AdminProfileComponent },
  { path: "register", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "shop", component: ShopComponent },
  { path: "viewItem", component: ViewItemComponent },
  { path: "user", component: UserComponent },
  { path: "cart", component: CartComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "thanks", component: ThanksComponent },
  { path: "**", redirectTo: "" },
  { path: "editProduct", component: EditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
