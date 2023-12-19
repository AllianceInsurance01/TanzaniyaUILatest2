//import { Branch } from './../../../loginCreation/user/add-branch-details/branch';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
//import { SharedService } from '../../../../../../shared/shared.service';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.scss']
})
export class IndustryListComponent implements OnInit {

  public activeMenu:any='Industry';
  public tinyUrlData:any[]=[];columnHeader:any[]=[];branchList:any[]=[];
  IndustryValue:any;
  IndustryList:any[]=[];
  branchValue: string;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  minDate: Date;
  insuranceId: string;
  productId: string;
  insuranceName: string;
  loginId: any;
  userDetails: any;
  productList: any;
  productValue: any;
  CategoryList:any[]=[];
  CategoryValue:any;
  insuranceList: { Code: string; CodeDesc: string; }[];
  constructor(private router:Router,private sharedService:SharedService,) {
    this.minDate = new Date();
    //this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    //this.productId = sessionStorage.getItem('companyProductId');
    /*this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    //this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }*/

    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    // this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.loginId = user?.LoginId;
    
    // this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    this.columnHeader = [
      { key: 'IndustryName', display: 'Industry Name' },
      { key: 'Remarks', display: 'Remarks' },
      { key: 'EffectiveDateStart', display: 'Effective Date' },

      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];


    //this.insuranceId = userDetails.LoginBranchDetails[0].InsuranceId;
   }

  ngOnInit(): void {
    this.getCompanyList();
    //this.getBranchList();

    //this.getExistingTinyUrl()
  }
  getCompanyList(){
    let ReqObj = {
      "BrokerCompanyYn":"",
      "LoginId": this.loginId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/superadmincompanies`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultObj = [{"Code":"","CodeDesc":"--SELECT--"}]
          this.insuranceList = defaultObj.concat(data.Result);
          if(this.insuranceId){this.getBranchList('direct');}
          else if(this.insuranceList.length>1){this.insuranceId=this.insuranceList[1].Code;this.getBranchList('direct');}
        }
  
      },
      (err) => { },
    );
  }

getBranchList(type){
  if(type=='change'){
    this.tinyUrlData=[];
    this.branchValue='';
  }
    let ReqObj = {
      "InsuranceId": this.insuranceId

    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        let docObj = JSON.parse(sessionStorage.getItem('addcatObj'))
        if(docObj){
          this.branchValue = docObj?.Branch;
          this.productValue = docObj?.ProductValue;
          this.getCompanyProductList();
        //this.getIndustryList()
      }
        else{
          this.branchValue="99999";
          this.productValue="19"
          this.getCompanyProductList();
          //this.getIndustryList()
        }
        //if(!this.branchValue){ this.branchValue = "99999"; this.getCompanyProductList() }
      }
    },
    (err) => { },
  );
  }


  getCompanyProductList(){
    if(this.insuranceId==null) this.insuranceId = "100002"
    let ReqObj ={
      "InsuranceId":this.insuranceId,
      "Limit":"0",
      "Offset":"100000"
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/companyproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
       this.productList = data?.Result;
        let obj =[{Code:"",CodeDesc:"--SELECT--"}]
        this.productList = obj.concat(data?.Result);
        this.getCatogery();

        /*if(!this.productValue){ this.productValue = "19";
        this.getIndustryList() }*/
        /*let docObj = JSON.parse(sessionStorage.getItem('addcatObj'))
        if(docObj){
          this.productValue = docObj?.ProductValue;
          console.log('LLLLLLLLLL',this.productValue );
          this.getCatogery();
        }
        else{ this.productValue='19';
        this.getCatogery();
      }*/
        }



      },
      (err) => { },
    );
  }

  getCatogery(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode":this.branchValue,
    }
    let urlLink = `${this.CommonApiUrl}dropdown/industrycategory`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        //let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.CategoryList = data?.Result;

        let docObj = JSON.parse(sessionStorage.getItem('addcatObj'))
        if(docObj){ this.CategoryValue = docObj?.Catogry;
          console.log('IIIIIIIIII',this.CategoryValue);
          this.getExistingTinyUrl();}
        else{ this.CategoryValue='3'; this.getExistingTinyUrl();}
        //if(!this.branchValue){ this.branchValue = "99999";  }
      }
    },
    (err) => { },

  );
  }
  /*getIndustryList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId ,
      "CategoryId":this.CategoryValue,
      "BranchCode":this.branchValue,
      "ProductId": this.productValue,

    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/industry`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        //let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.IndustryList = data?.Result;

        let docObj = JSON.parse(sessionStorage.getItem('addDocDetailsObj'))
        if(docObj){ this.IndustryValue = docObj?.Section;
          console.log('IIIIIIIIII',this.IndustryValue);
          this.getExistingTinyUrl();}
        else{ this.IndustryValue='13'; this.getExistingTinyUrl();}
        //if(!this.branchValue){ this.branchValue = "99999";  }
      }
    },
    (err) => { },

  );
  }*/
  getExistingTinyUrl(){
    if(this.productValue!='' && this.productValue!=null && this.branchValue!='' && this.branchValue!=null && this.CategoryValue!='' && this.CategoryValue!=null){
      this.tinyUrlData=[];
      let ReqObj = {
        "BranchCode":this.branchValue,
        "InsuranceId": this.insuranceId,
        "ProductId":this.productValue,
        "CategoryId":this.CategoryValue,
      }
      let urlLink = `${this.CommonApiUrl}master/getallindustry`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.tinyUrlData = data?.Result;
          }
          if(this.CategoryValue!=undefined && this.CategoryValue!=null){
            let docObj = {"Branch":this.branchValue,"Catogry":this.CategoryValue,"ProductValue":this.productValue};
            sessionStorage.setItem('addcatObj',JSON.stringify(docObj));
          }
  
        },
        (err) => { },
      );
    }
    
  }
  onEditSection(event){
    let ReqObj = {
      "CategoryId": this.CategoryValue,
      "BranchCode": this.branchValue,
      "ProductId":this.productValue,
      "IndustryId":event.IndustryId,
      "InsuranceId": this.insuranceId
    }
    console.log('branch',this.branchValue,this.productId,event.CategoryId)
    sessionStorage.setItem('CategoryId', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/Industry/industryDetails'])
   //this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/IndustryList/industryDetails'])
  }
  onAddSection(){
    //sessionStorage.removeItem('CategoryId')

    let ReqObj = {

      "CategoryId":this.CategoryValue,
      "BranchCode":this.branchValue,
      "ProductId":this.productValue,
      "IndustryId":null,
      "InsuranceId": this.insuranceId

    }
    sessionStorage.setItem('CategoryId', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/Industry/industryDetails'])
    //this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/IndustryList/industryDetails'])
  }
  EditStatus(event){
    let ReqObj = {
      "BranchCode": this.branchValue,
      "InsuranceId":this.insuranceId,
      "ProductId": this.productValue,
      "Status":event.ChangedStatus,
      "CategoryId":this.IndustryValue,
      "EffectiveDateStart":event.ChangeEffectiveDate
    }
    let urlLink = `${this.ApiUrl1}master/industrychangestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any) => {
        console.log(data);
        if(data.Result){
          // let type: NbComponentStatus = 'success';
          //       const config = {
          //         status: type,
          //         destroyByClick: true,
          //         duration: 4000,
          //         hasIcon: true,
          //         position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //         preventDuplicates: false,
          //       };
          //       this.toastrService.show(
          //         'Status Changed Successfully',
          //         'Status Updated',
          //         config);
                  this.getExistingTinyUrl()
                //window.location.reload()
        }
      },
      (err) => { },
    );
  }
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails'])
    if(value=='Section') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/sectionDetails'])
    if(value=='Cover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails'])
    if(value=='SubCover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/subCoverDetails'])
    if(value=='UwQues') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/uwQuestionsList'])
    if(value=='Tax') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/taxDetails'])
    if(value=='Referral') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails'])
    if(value=='Document') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails'])
    if(value=='FactorType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/factorTypeList'])
    if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
    if(value=='Prorata') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/prorata'])
    if(value=='Emi') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/emiDetails'])
    if(value=='Payment') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/paymentList'])
    if(value=='Notification') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification'])
    if(value=='TinyUrl') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/tinyurlList'])
  }
}
