import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { ShopComponent } from './components/shop/shop.component';
import { ViewItemComponent } from './components/view-item/view-item.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "admin", component: AdminComponent },
  { path: "register", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "shop", component: ShopComponent },
  { path: "viewItem", component: ViewItemComponent },
<<<<<<< HEAD
  { path: "user", component: UserComponent},
=======
  { path: "cart", component: CartComponent },
>>>>>>> 54bbdb4... added cart component
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
