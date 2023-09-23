import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginService } from './login.service';
import { MatTabsModule } from '@angular/material/tabs'
import { NgSelectModule } from '@ng-select/ng-select';
import { B2cLoginComponent } from './b2c-login.component';
import { B2cLoginRoutingModule } from './b2c-login-routing.module';





@NgModule({
  declarations: [
    B2cLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    B2cLoginRoutingModule,
    MatTabsModule,
    NgSelectModule
  ],
  providers:[LoginService],
  bootstrap: [B2cLoginComponent],
})
export class B2cLoginModule { }
