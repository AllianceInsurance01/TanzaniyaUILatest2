import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent {

  isReadMore: boolean = true;
  isReadMoretravel: boolean = true;
  isReadMorecorporate: boolean = true;
  isReadMoremarine: boolean = true;
  userDetails: any; userResponse: any;loginId: any;
  userType: any;userTypes: any; productList: any;

  constructor(private router:Router){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userResponse = this.userDetails?.Result;
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails.Result.UserType;
    //this.userTypes = this.userDetails.Result.BranchCode;
    this.userTypes= this.userDetails.Result.BrokerBranchName
    this.productList = this.userDetails.Result.BrokerCompanyProducts;  
  }
  onPress() {
        sessionStorage.clear();
        this.router.navigate(['./Home/login'])
  }
  onSelectProduct(item: any) {
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    userDetails.Result['ProductId'] = item.ProductId;
    console.log('ppppppp',item.ProductId)
    userDetails.Result['ProductName'] = item.ProductName;
    userDetails.Result['PackageYn'] = item.PackageYn;
    sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
    console.log("Products",item,userDetails.Result)
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('quoteReferenceNo');
    this.router.navigate(['./Home/existingQuotes/customerSelection/customerDetails/customer-details']);
    // else if(item.ProductId =='4') this.router.navigate(['/Travel']);
    // //else if(item.ProductId=='7') this.router.navigate(['/HomeIns']);
    // else if(item.ProductId=='3') this.router.navigate(['/HomeIns']);
  }
  tohome() {
    (document.getElementById("hero") as any).scrollIntoView();
  }
  toAbout() {
    (document.getElementById("about") as any).scrollIntoView();
  }
  toServices() {
    (document.getElementById("services") as any).scrollIntoView();
  }
  toProduct() {
    (document.getElementById("products") as any).scrollIntoView();
  }
  tocontact() {
    (document.getElementById("contact") as any).scrollIntoView();
  }
  scrollToTop() {
    document.body.scrollIntoView({ behavior: 'smooth' })
  }
  readmore() {
    this.isReadMore = !this.isReadMore
  }
  readmoretravel() {
    this.isReadMoretravel = !this.isReadMoretravel
  }
  readmorecorporate() {
    this.isReadMorecorporate = !this.isReadMorecorporate
  }
  readmoremarine() {
    this.isReadMoremarine = !this.isReadMoremarine
  }
}
