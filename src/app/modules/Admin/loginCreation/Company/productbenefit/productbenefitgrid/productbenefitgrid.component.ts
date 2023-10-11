import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../../app-config.json';
import { DatePipe } from '@angular/common';
//import { NbDialogService } from '@nebular/theme';
//import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../../shared/shared.service';
import { Toaster } from 'ngx-toast-notifications';
//import { StateDetailsComponent } from '../state-details/state-details.component';


@Component({
  selector: 'app-productbenefitgrid',
  templateUrl: './productbenefitgrid.component.html',
  styleUrls: ['./productbenefitgrid.component.scss']
})
export class ProductBenefitGridComponent implements OnInit {

    stateValue:any;
    sectionValue:any;
    sectionList:any[]=[];
    CoverList:any[]=[];
    stateList:any[]=[];brokerYN:any="NO";
    activeMenu:any='Benefit';
    regionList:any[]=[];
    regionValue:any;
    cityData:any[]=[];cityHeader:any[]=[];
    insuranceName: string;
    CountryList: any[]=[];CountryValue:any;
    StateList: any[]=[];StateValue:any;
    MakeId: any;
    BranchCode:any; branchList:any;
    public AppConfig:any = (Mydatas as any).default
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
    NotificationHeader:any[]=[];
    ProductBenefitData:any[]=[];
    insuranceId: string;
    productId: string;
    loginId: any;
  CoverValue: any;
  MotoYn: string;
    constructor(private router:Router,private sharedService:SharedService,) {
     
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.productId =  sessionStorage.getItem('companyProductId');
      this.MotoYn=sessionStorage.getItem('productType');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
  
      if(userDetails){
        this.loginId = userDetails?.Result?.LoginId;
      }
      this.getSectionList();
       // let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    }
  
    ngOnInit(): void {
      this.NotificationHeader = [
        { key: 'BenefitDescription', display: 'Description' },
        { key: 'EffectiveDateStart', display: 'Effective Date' },
        { key: 'CoreAppCode', display: 'Core App Code' },
        { key: 'Status', display: 'Status' },
        {
          key: 'actions',
          display: 'Action',
          config: {
            isEdit: true,
          },
        }
      ];
  
  //this.getExistingNotification();
    }
    EditStatus(event){
  
      let ReqObj = {
        "InsuranceId":this.insuranceId,
        "ProductId":this.productId,
        "FactorTypeId":event.FactorTypeId,
        "Status":event.ChangedStatus,
        "EffectiveDateStart":event.ChangeEffectiveDate,
        "NotifTemplateCode":event.NotifTemplateCode,
      "CreatedBy":this.loginId,
  
      }
      let urlLink = `${this.ApiUrl1}master/notitemplete/changestatus`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data:any) => {
          console.log(data);
          let res:any=data;
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
                    //this.getExistingNotification()
                  //window.location.reload()
          }
        },
        (err) => { },
      );
      //console.log("Status Changed",event)
  }
    getExistingProduct()
    {
      let ReqObj = {
        "InsuranceId":this.insuranceId,
        "ProductId":this.productId,
        "BranchCode": "99999",
        "SectionId":this.sectionValue,
        "CoverId":this.CoverValue
      }
  
       let urlLink = `${this.CommonApiUrl1}master/getallproductbenefit`;
         this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
           (data: any) => {
             console.log(data);
             if(data.Result){
                 this.ProductBenefitData = data?.Result;
                 if(this.sectionValue!=undefined && this.sectionValue!=null){
                  let docObj = {"Section":this.sectionValue,"CoverId":this.CoverValue};
                  sessionStorage.setItem('addDetailsObj',JSON.stringify(docObj));
                }

             }
           },
         (err) => { },
       );
    }

    getSectionList(){
      
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "ProductId": this.productId
        }
        let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            /*if(data.Result){
              this.sectionList = data.Result;
              let sectionValue = sessionStorage.getItem('companySectionId');
              if(sectionValue){
                this.sectionValue = sectionValue;
                this.getExistingpromo();
              }
              else if(this.sectionList.length!=0){
                this.sectionValue = this.sectionList[0].Code;
                this.getExistingpromo();
              }
            }*/
            if(data.Result){
              let obj = [];
              this.sectionList = obj.concat(data?.Result);
              console.log(this.sectionList);
              let docObj = JSON.parse(sessionStorage.getItem('addDetailsObj'))
              if(docObj){ this.sectionValue = docObj?.Section;
                console.log('LLLLLLLLLL',this.sectionValue);
                this.getCoverList('direct');
                //this.getExistingpromo()
            }
              else{ this.sectionValue=null; 
                this.CoverValue=null;
                this.getCoverList('direct');
                //this.getExistingpromo();
            }
    
            }
    
            },
            (err) => { },
          );
      }


      getCoverList(type){
         
        
        let ReqObj = {
          "InsuranceId":this.insuranceId,
          "ProductId":this.productId,
          "SectionId":this.sectionValue
        }
        let urlLink = `${this.ApiUrl1}master/dropdown/sectioncover`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            let obj = [];
            this.CoverList = obj.concat(data?.Result);
            let docObj = JSON.parse(sessionStorage.getItem('addDetailsObj'))
            if(docObj){ this.CoverValue = docObj?.CoverId;
              if(type=='Change'){
                this.CoverValue=null;
              }
              console.log('LLLLLLLLLL',this.CoverValue);
              if(this.CoverValue!==null){
              this.getExistingProduct();
              }
              //this.getExistingpromo()
          }
            else{ 
              this.CoverValue=null;
              if(this.CoverValue==null){
              this.getExistingProduct();
              }
              //this.getExistingpromo();
          }
            //this.getExistingDocument();
            //if(!this.CountryValue){ this.CountryValue = "99999"; this.getStateList() }
          }
        },
    
        (err) => { },
      );
      }
    onEditNotification(event){
      let entry = {
       "SectionId":event.SectionId,
       "CoverId":event.CoverId,
       "BenefitId":event.BenefitId
      }
      sessionStorage.setItem('BenefitDetails',JSON.stringify(entry));
      this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit/productbenefitnew']);
      //this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification/newNotificationDetails'])
    }
  
  
    onAddNew() {

      let entry = {
        "SectionId":this.sectionValue,
        "CoverId":this.CoverValue,
        "BenefitId":null
       }
       sessionStorage.setItem('BenefitDetails',JSON.stringify(entry));
      //sessionStorage.removeItem('NotifTemplateCode')
      // let entry = {
      //   "NotifTemplateCode":null,
      //   "InsuranceId":this.insuranceId,
      //   "ProductId":this.productId,
      // }
      // sessionStorage.setItem('NotifTemplateCode',JSON.stringify(entry));
      this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit/productbenefitnew']);
  
    }
    onRedirect(value){
      if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails']);
      if(value=='Section') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/sectionDetails']);
      if(value=='Cover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails']);
      if(value=='SubCover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/subCoverDetails']);
      if(value=='UwQues') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/uwQuestionsList']);
      if(value=='Tax') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/taxDetails']);
      if(value=='Referral') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails']);
      if(value=='Document') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails']);
      if(value=='FactorType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/factorTypeList']);
      if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails']);
      if(value=='Prorata') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/prorata']);
      if(value=='Emi') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/emiDetails']);
      if(value=='Payment') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/paymentList']);
      if(value=='Notification') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification']);
      if(value=='TinyUrl') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/tinyurlList']);
      if(value=='Premia') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList']);
      if(value=='Policy') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/policytypeList']);
      if(value=='Industry') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/IndustryList']);
      if(value=='Promo') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster']);
      if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield']);
      if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType']);
      if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit']);
      if(value=='PlanType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/planTypeBenefits']);
      if(value=='policyterm') this.router.navigate(['/Admin/lifepolicyterms']);
      if(value=='SURVIVAL')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/survival']);
      if(value=='Surrender')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/surrender']);
      if(value=='Excell')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/excelllist']);
    }
  }
  
