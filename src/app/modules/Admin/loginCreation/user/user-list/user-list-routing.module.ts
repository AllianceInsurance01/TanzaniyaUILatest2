
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserBranchListComponent } from '../user-branch-list/user-branch-list.component';
import { NewUserbranchDetailsComponent } from '../new-userbranch-details/new-userbranch-details.component';
import { NewUserprductDetailsComponent } from '../new-userprduct-details/new-userprduct-details.component';
import { NewUsercoverDetailsComponent } from '../new-usercover-details/new-usercover-details.component';
import { UserCoverListComponent } from '../user-cover-list/user-cover-list.component';
import { UserProductListComponent } from '../user-product-list/user-product-list.component';
import { AddproductDetailsComponent } from '../addproduct-details/addproduct-details.component';
import { AddBranchDetailsComponent } from '../add-branch-details/add-branch-details.component';
import { EndrosementUserComponent } from '../endrosementuser/endrosementuser.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: 'newUserDetails',
    component: UserDetailsComponent,
    data: {
      preload: true,
      title: "Update User Details",
      breadcrumb:  "Update User Details",
    },
  },
  {
    path: 'userBranchDetails',
    component: UserBranchListComponent,
    data: {
      preload: true,
      title: "User Branch Details",
      breadcrumb:  " Branch Details",
    },
  },
  {
    path: 'newUserbranchDetails',
    component: NewUserbranchDetailsComponent,
    data: {
      preload: true,
      title: "User Branch Details",
      breadcrumb:  "User branch Details",
    },
  },
  {
    path: 'newUserproductDetails',
    component: NewUserprductDetailsComponent,
    data: {
      preload: true,
      title: "User Product Details",
      breadcrumb:  "User Product Details",
    },
  },
  {
    path: 'newUsercoverDetails',
    component: NewUsercoverDetailsComponent,
    data: {
      preload: true,
      title: "User Cover Details",
      breadcrumb:  "User Cover Details",
    },
  },
  {
    path: 'userCoverList',
    component: UserCoverListComponent,
    data: {
      preload: true,
      title: "User Cover List",
      breadcrumb:  "User Cover List",
    },
  },
  {
    path: 'UserproductList',
    component: UserProductListComponent,
    data: {
      preload: true,
      title: "User Product List",
      breadcrumb:  "User Product List",
    },
  },
  {
    path: 'newProductDetails',
    component: AddproductDetailsComponent,
    data: {
      preload: true,
      title: "User Product Details",
      breadcrumb:  "User Product Details",
    },
  },
  {
    path: 'addBranchDetails',
    component: AddBranchDetailsComponent,
    data: {
      preload: true,
      title: "Add Branch Details",
      breadcrumb:  "Add Branch Details",
    },
  },
  {
    path: 'EndrosementUser',
    component: EndrosementUserComponent,
    data: {
      preload: true,
      title: "EndrosementUser",
      breadcrumb:  "EndrosementUser",
    },
  },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserListRoutingModule {}
