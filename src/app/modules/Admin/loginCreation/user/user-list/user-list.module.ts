
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
import { DigitOnlyModule } from '@uiowa/digit-only';
//import { ThemeModule } from '../../../../../@theme/theme.module';
import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
import { UserService } from '../User.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserBranchListComponent } from '../user-branch-list/user-branch-list.component';
import { NewUserbranchDetailsComponent } from '../new-userbranch-details/new-userbranch-details.component';
import { UserCoverListComponent } from '../user-cover-list/user-cover-list.component';
import { NewUsercoverDetailsComponent } from '../new-usercover-details/new-usercover-details.component';
import { UserProductListComponent } from '../user-product-list/user-product-list.component';
import { NewUserprductDetailsComponent } from '../new-userprduct-details/new-userprduct-details.component';
import { AddproductDetailsComponent } from '../addproduct-details/addproduct-details.component';
import { AddBranchDetailsComponent } from '../add-branch-details/add-branch-details.component';
import { EndrosementUserComponent } from '../endrosementuser/endrosementuser.component';
import { DirectivesModule } from 'src/app/shared/Directives/directives.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';





@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserBranchListComponent,
    NewUserbranchDetailsComponent,
    UserListComponent,
    UserCoverListComponent,
    UserProductListComponent,
    NewUsercoverDetailsComponent,
    NewUserprductDetailsComponent,
    AddproductDetailsComponent,
    AddBranchDetailsComponent,
    EndrosementUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    //ThemeModule,
    // NbTabsetModule,
    // NbRouteTabsetModule,
    // NbStepperModule,
    // NbCardModule,
    // NbButtonModule,
    // NbListModule,
    // NbAccordionModule,
    // NbUserModule,
    UserListRoutingModule,
    // NbInputModule,
    // NbSelectModule,
    // NbPopoverModule,
    TablesModule,
    // NbSearchModule,
    // NbDatepickerModule,
    // NbMomentDateModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,

  ],
  bootstrap: [UserListComponent],
  providers: [
    CurrencyPipe,
    UserService
  ],
})
export class UserListModule { }
