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
  selector: 'app-prorata-list',
  templateUrl: './prorata-list.component.html',
  styleUrls: ['./prorata-list.component.scss']
})
export class ProRataListComponent implements OnInit {

  public activeMenu: any = 'Prorata';
  public effectiveDateStart: any;
  public minDate: Date; statusValue = 'N';
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1; calculationTypes2: any[] = [];
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  public ProrataList: any[] = [{}];
  public loginId: any; Remarks: any; Status: any; Percent: any;
  public Endto: any; Startfrom: any; Sno: any;
  public insuranceName: string; insuranceId: string; productId: string;
  constructor(private router: Router, private sharedService: SharedService,
   private datePipe: DatePipe) {
    this.minDate = new Date();
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId = sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (userDetails) {
      this.loginId = userDetails?.Result?.LoginId;
    }
   // this.getProrataDetails();
  }

  ngOnInit(): void {

    this.getallprorata()

  }

  onSaveProrataDetails() {
    let ReqObj = {
      "CreatedBy": this.loginId,
      "EffectiveDateStart": this.effectiveDateStart,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "ProrataDetails": this.ProrataList
    }
    let urlLink = `${this.ApiUrl1}master/insertcompanyprorata`;
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] = this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else {
      ReqObj['EffectiveDateStart'] = "";
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (data.Result) {
          // this.Toaster.open({
          //   text:'Prorata Details Inserted/Updated Successfully',
          //   caption: 'Prorata Details',
          //   type: 'success',
          // });
          this.getallprorata()

          // let type: NbComponentStatus = 'success';
          // const config = {
          //   status: type,
          //   destroyByClick: true,
          //   duration: 4000,
          //   hasIcon: true,
          //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //   preventDuplicates: false,
          // };
          // this.toastrService.show(
          //   'ProRata Details Inserted/Updated Successfully',
          //   'ProRata Details',
          //   config);
        }

      },
      (err) => { },
    );
  }
  onAddNewEntry() {
    console.log("Final Tax List ", this.ProrataList);
    let number = String(this.ProrataList.length + 1);
    this.ProrataList.push(
      {
        "Sno": number,
        "Status": "Y",
        "EndTo":null,
        "StartFrom": null,
        "Percent": null,
        "Remarks": null,
      }
    );
    this.ProrataList.push()
  }
  deleteRow(x){
    var delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.ProrataList.splice(x, 1 );
    }
  }
  // getProrataDetails() {
  //   let ReqObj = {
  //     "ProductId": this.productId,
  //     "InsuranceId": this.insuranceId,
  //   }
  //   let urlLink = `${this.ApiUrl1}master/getallcompanyprorata`;
  //   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  //     (data: any) => {
  //       console.log(data);
  //       if (data.Result) {
  //         if(data?.Result?.EffectiveDateStart!=null){
  //           this.effectiveDateStart = this.onDateFormatInEdit(data?.Result?.EffectiveDateStart)
  //         }
  //         this.ProrataList = data?.Result?.ProrataDetails;
  //         console.log("ProrataList ", this.ProrataList)
  //         if (this.ProrataList.length==0) {
  //           this.ProrataList = [
  //             {
  //               "Sno": null,
  //               "Status": "Y",
  //               "EndTo": null,
  //               "StartFrom": null,
  //               "Percent": null,
  //               "Remarks": null,
  //               "delete":null,
  //             }
  //           ]
  //         }
  //       }
  //     },
  //     (err) => { },
  //   );
  // }
  onDateFormatInEdit(date) {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if (format.length > 1) {
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else {
        format = date.split('/');
        if (format.length > 1) {
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }
    }
  }

  getallprorata(){
    let ReqObj={
      "InsuranceId":this.insuranceId,
      "ProductId": this.productId

    }
let urlLink = `${this.ApiUrl1}master/getbycompanyprorataid`;

   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          if(data?.Result?.EffectiveDateStart!=null){
            this.effectiveDateStart = this.onDateFormatInEdit(data?.Result?.EffectiveDateStart)
          }
            this.ProrataList= data?.Result.ProrataDetails;
            console.log('tttttttt',this.ProrataList);

            if(this.ProrataList.length==0){
              this.ProrataList = [
                {
                  "Sno": null,
                  "Status": "",
                  "EndTo":null,
                  "StartFrom": null,
                  "Percent": null,
                  "Remarks": null,
                  /*"CalcType": null,
                  "Status": "Y",
                  "TaxDesc": null,
                  "TaxCode": null,
                  "TaxId": "1",
                  "TaxName": null,
                  "Value": null,
                  "Delete":null,*/
                }
              ]
            }

            //this.premiaId=this.premiaListData.PremiaId;
            /*if(this.sectionValue!=undefined && this.sectionValue!=null){
              let docObj = {"Section":this.sectionValue};
              sessionStorage.setItem('addDocDetailsObj',JSON.stringify(docObj));
            }*/
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
    if(value=='Premia') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList'])
    if(value=='Policy') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/policytypeList'])
    if(value=='Industry') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/IndustryList'])
    if(value=='Promo') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster'])
    if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield'])
    if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
    if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit']);
    if(value=='PlanType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/planTypeBenefits'])
  }
  onDeleteCommonProrata() {
  }



}
