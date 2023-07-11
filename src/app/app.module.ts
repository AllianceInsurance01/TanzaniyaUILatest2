import { BrowserModule } from '@angular/platform-browser'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BranchSelectionComponent } from './modules/branch-selection/branch-selection.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button'
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MatStepperModule } from '@angular/material/stepper';
import { FormlyModule } from '@ngx-formly/core'
import { FormlyMaterialModule } from '@ngx-formly/material'
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker'
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
	MultilevelMenuService,
	NgMaterialMultilevelMenuModule,
	ɵb,
  } from "ng-material-multilevel-menu";
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { FormlyFieldStepper } from './stepper.type';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common'
import { AuthService } from './Auth/auth.service'
import { AuthGuard } from './Auth/auth.guard'
import { CustomLoadingService } from './shared/custom-loading.service'
import { ProductSelectionComponent } from './modules/product-selection/product-selection.component'
import { HttpInterceptorService } from './HttpInterceptors/http-interceptor.service'
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component'
import { NavbarComponent } from './layout/components/navbar/navbar.component'
import { HeaderComponent } from './layout/components/header/header.component'
import { MaterialModule } from './shared/material/material.module'
import { BreadcrumbComponent } from './modules/breadcrumb/breadcrumb.component'
import { NgSelectFormlyComponent } from './ngselect.type';
import { CustomerRedirectComponent } from './modules/customer-redirect/customer-redirect.component';
import { BranchDetailsComponent } from './modules/Admin/loginCreation/Company/branch-details/branch-details.component'
import { FooterComponent } from './layout/components/footer/footer.component';
import { CustomerProductsComponent } from './modules/customer-products/customer-products.component';


@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		HeaderComponent,
		FooterComponent,
		HomeLayoutComponent,
		BreadcrumbComponent,
		BranchSelectionComponent,
		ProductSelectionComponent,
		BranchDetailsComponent,
		NgSelectFormlyComponent, FormlyFieldStepper, CustomerRedirectComponent, CustomerProductsComponent],
	imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgSelectModule,
		MatButtonModule,
		MatStepperModule,
		ReactiveFormsModule,
		FormlyModule.forRoot({
			validationMessages: [{ name: 'required', message: 'This field is required' }],
			types: [
				{ name: 'stepper', component: FormlyFieldStepper, wrappers: [] }
			],
		  }),
		FormlyMaterialModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatRadioModule,
		MatSelectModule,
		MatTableModule,
		MatIconModule,
		MaterialModule,
		FormlyBootstrapModule,
		MatNativeDateModule,
		FormlyMatDatepickerModule,
		FormlyMatToggleModule,
		NgMaterialMultilevelMenuModule 
	],
	providers: [ɵb,MultilevelMenuService,DatePipe, 
		{provide: LocationStrategy, useClass: HashLocationStrategy},
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
	AuthService,
    AuthGuard,
    CustomLoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },],
	bootstrap: [AppComponent],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
