import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { ProductSelectionComponent } from './modules/product-selection/product-selection.component'
import { BranchSelectionComponent } from './modules/branch-selection/branch-selection.component'
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component'
import { AuthGuard } from './Auth/auth.guard'
import { CustomerRedirectComponent } from './modules/customer-redirect/customer-redirect.component';
import { CustomerProductsComponent } from './modules/customer-products/customer-products.component';

const routes: Routes = [
	// {
	// 	path: '',
	// 	component: ProductAdminComponent,
	// },
	// {
	// 	path: 'product',
	// 	component: ProductItemComponent,
	// },
	// {
	// 	path: 'admin',
	// 	component: ProductAdminComponent,
	// },
	// {
	// 	path: 'admin/product',
	// 	component: ProductFormComponent,
	// },
	// {
	// 	path: '**',
	// 	redirectTo: '',
	// },
	{
		path: 'login',
		loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
	},
	{
		path: 'b2clogin',
		loadChildren: () => import('./modules/b2c-login/b2c-login.module').then(m => m.B2cLoginModule),
		
	},
	{
		path: 'customerRedirect',
		component: CustomerRedirectComponent,
	},
	{
		path: 'customerProducts',
		component: CustomerProductsComponent,
	},
	// {
	// 	path:'branch',
	// 	component:BranchSelectionComponent
	// },
	{
		path: 'product',
		component: ProductSelectionComponent,
	},
	{
		path: '',
		component: HomeLayoutComponent,
		canActivate: [AuthGuard],
		children: [
	
		  {
			path: 'Home',
			loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
			data: {
			  preload: true,
			  title: "Home",
			  breadcrumb: 'Home',
			}
		  },
		  {
			path: 'Admin',
			loadChildren: () => import('./modules/Admin/admin.module').then(m => m.AdminModule),
			data: {
			  preload: true,
			  title: "Admin",
			  breadcrumb: 'Admin',
			}
		  },
		]
	},
	{ path: '**', redirectTo: 'login' },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
