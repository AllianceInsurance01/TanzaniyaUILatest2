import { Component,OnInit } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../../shared/shared.service';
declare var $:any;

@Component({
  selector: 'app-section-modification',
  templateUrl: './section-modification.component.html',
  styleUrls: ['./section-modification.component.css']
})
export class SectionModificationComponent implements OnInit {

  premium:any;
  
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  userDetails:any;coversRequired:any='C';
  loginId: any;BuildingOwnerYn:any='Y';
  userType: any;industryList:any[]=[];
  agencyCode: any;IndustryId:any='';
  branchCode: any;categoryDesc:any='';
  productId: any;
  PackageYn: any;
  insuranceId: any;
  branchList: any;
  productList:any[]=[];
  p=1;
  constructor(private router:Router,private sharedService: SharedService,private datePipe:DatePipe,
    private updateComponent:UpdateCustomerDetailsComponent) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      console.log("UserDetails",this.userDetails);
      this.loginId = this.userDetails.Result.LoginId;
      this.userType = this.userDetails?.Result?.UserType;
      this.agencyCode = this.userDetails.Result.OaCode;
      this.branchCode = this.userDetails.Result.BranchCode;
      this.productId = this.userDetails.Result.ProductId;
      this.PackageYn= this.userDetails.Result.PackageYn
      this.insuranceId = this.userDetails.Result.InsuranceId;
      this.branchList = this.userDetails.Result.LoginBranchDetails;
      this.updateComponent.showStepperSection = true;
    }

    ngOnInit(): void{
      this.onproductdisplay();
    }

    
onproductdisplay(){
  let ReqObj = {
    "InsuranceId":this.insuranceId,
    "ProductId": this.productId
  }
  let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.productList = data.Result;
          console.log('KKKKKKKKKKKKKK',this.productList)
          //this.premiunDropdown()

      }
      
    },

    (err) => { },
  );
}
}

