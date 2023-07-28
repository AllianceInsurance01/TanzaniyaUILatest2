import { Component, OnInit,ViewChild,ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';
import { Promo } from './promo';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-new-promo-code-details',
  templateUrl: './new-promo-code-details.component.html',
  styleUrls: ['./new-promo-code-details.component.scss']
})
export class NewPromoCodeDetailsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource:any;
  btnNextPrev = {
    prev: true,
    next: false,
    index: 0
  }
  productList:any[]=[];renewalValue:any="Both";
  typeList:any[]=[];statusValue:any="Y";promoList:any[]=[];
  calcTypesList:any[]=[];
  promoTypeValue:any="";productValue:any="";
  public AppConfig:any = (Mydatas as any).default
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  factorTypeLists: BehaviorSubject<any>;

  rangeApiurl: any;
  rangeApiurl2: any;rangeApiurl3: any;rangeApiurl4: any;
  rangeApiurl1: any;rangeApiurl5: any;rangeApiurl6: any;
  rangeApiurl7: any;
  insuranceName: string;
  insuranceId: string;
  productId: string;
  loginId: any;
  promocode: any;
  SectionId: any;
  promoDetails:any;
  calcTypeList:any[]=[];
  factorList:any[]=[];
  factorValue:any;
  minDate: Date;
  FactorTypeId:any;
  rangeFirstName: any;rangeSecondName: any;coverUploadSection: boolean= false;
  rangeThirdName: any;rangeFourthName: any;basedOnColumnList:any[]=[];
  rangeFifthName: any;rangeSixthName: any;
  rangeSeventhName: any;rangeEigthName: any;
  discreteFirstName: any;discreteSecondName: any;
  discreteThirdName: any;discreteFourthName: any;
  subRangeFirstName: any;subRangeSecondName: any;
  subRangeThirdName: any;subRangeFourthName: any;
  subRangeFifthName: any;subRangeSixthName: any;columnHeader:any[]=[];
  subRangeSeventhName: any;subRangeEigthName: any;
  subDiscreteFirstName: any;subDiscreteSecondName: any;
  subDiscreteThirdName: any;subDiscreteFourthName: any;selectSubCoverSection:boolean = false;
  coverRangeFirst: boolean=false;coverRangeSecond: boolean=false;
  coverRangeThird: boolean=false;coverRangeFourth: boolean=false;
  coverDiscreteFirst: boolean=false;coverDiscreteSecond: boolean=false;
  coverDiscreteThird: boolean=false;coverDiscreteFourth: boolean=false;
  factorTypeList:any[]=[];
  basedOnColumnValue:any;
  DiscountList:any;
  open: boolean=false;
  SPromocode: any;
  CoverId: any;
  PromocodeType: string;
  calculationTypes2:any[]=[];
  CoverIds: any;
  taxTypeList:any[]=[];
  pro: any;
  constructor(private router:Router,private sharedService: SharedService,private datePipe:DatePipe,private _changeDetectorRef: ChangeDetectorRef) {

    this.minDate = new Date();
    this.promoList = [
      {"value":"D","text":"Discount"},
      {"value":"S","text":"Scheme"},
    ];
    this.productList = [
      {"Code":"Home","CodeDesc":"Home Insurance"},
      {"Code":"Motor","CodeDesc":"Motor Insurance"},
      {"Code":"Life","CodeDesc":"Life Insurance"},
    ]
    this.calculationTypes2 = [
      {"value": "","text": "Select"},
      {"value": "A","text": "Amount"},
      {"value": "M","text": "Mile"},
      {"value": "P","text": "Percentage"}
    ];

    this.calcTypeList = [
      {"value": "","text": "- - -Select- - -"},
      {"value": "A","text": "Amount"},
      //{"value": "M","text": "Mile"},
      {"value": "P","text": "Percentage"},
      //{"value": "F","text": "Factor"},
    ]
    this.calcTypesList = [
      {"value": "","text": "- - -Select- - -"},
      //{"value": "A","text": "Amount"},
      //{"value": "M","text": "Mile"},
      //{"value": "P","text": "Percentage"},
      {"value": "F","text": "Factor"},
    ]
 this.promoDetails = new Promo();
 this.getTaxTypeList();

   }

  ngOnInit(): void {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }

  let promoObj = JSON.parse(sessionStorage.getItem('PromoCode'));
  this.promocode=promoObj?.PromocodeId;
  console.log('ttttttttt',this.promocode)
    this.SectionId=promoObj?.SectionId;
  if(this.promocode){
    this. getExistingpromoCode()
  }

  else{
    //this.getExistingpromoCode();

  this.promoDetails = new Promo();

  let promo=sessionStorage.getItem('sectionId')
  this.SectionId=promo;
    if(this.promoDetails.Status==null)  this.promoDetails.Status= 'Y';
    if(this.promoDetails.IsTaxExcempted==null)  this.promoDetails.IsTaxExcempted= 'N';

    //this.promoDetails= new Promo();
  }

  this.getFactorTypeList();
  this.getBasedonList();
  this.setPagination(this.factorTypeList);
  this.getDiscount();

  if(this.promoDetails.IsTaxExcempted == 'Y'){
    this.getTaxTypeList()
  }


  }


  setPagination(factorTypeList) {
    this.dataSource = new MatTableDataSource(this.factorTypeList);
    this._changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.factorTypeLists = this.dataSource.connect();
    console.log("s",this.factorTypeLists);
  }


  getTaxTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": "99999"
    }
    let urlLink = `${this.CommonApiUrl}dropdown/taxexcemptiontype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.taxTypeList = data?.Result;
        }

      },
      (err) => { },
    );
  }

  getBasedonList(){
    let ReqObj = {
      "ProductId": this.productId,
      "SectionId":this.SectionId
        }
      let urlLink = `${this.ApiUrl1}dropdown/getproducttabledetails`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
             this.basedOnColumnList = data?.Result;
             this.basedOnColumnValue="promocode";
          }

        },
        (err) => { },
      );
  }

  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster']);
  }
  onProceed(){
    this.router.navigate(['/Admin/promoCodeMaster']);
  }
  onGetCovers(){
    this.router.navigate(['/Admin/promoCodeMaster/viewPromoCoverDetails']);
  }
  onGetDiscount(){
    this.router.navigate(['/Admin/promoCodeMaster/viewPromoDiscountDetails']);
  }

  onCoverFactorTypeChange(){
    if(this.FactorTypeId != '' && this.FactorTypeId!= undefined){
      this.rangeFirstName="";this.rangeSecondName="";
      this.rangeThirdName="";this.rangeFourthName="";
      this.rangeFifthName="";this.rangeSixthName="";
      this.rangeSeventhName="";this.rangeEigthName="";
      this.discreteFirstName="";this.discreteSecondName="";
      this.discreteThirdName="";this.discreteFourthName="";
      this.rangeApiurl="";this.rangeApiurl1="";this.rangeApiurl2="";
      this.rangeApiurl3="";this.rangeApiurl4="";this.rangeApiurl5="";
      this.rangeApiurl6="";this.rangeApiurl7="";
      this.coverRangeFirst=false;this.coverRangeSecond=false;
      this.coverRangeThird=false;this.coverRangeFourth=false;
      this.coverDiscreteFirst=false;this.coverDiscreteSecond=false;
      this.coverDiscreteThird=false;this.coverDiscreteFourth=false;
      this.factorTypeList = [];
      let ReqObj = { "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "FactorTypeId": this.FactorTypeId}
      let urlLink = `${this.ApiUrl1}master/getfactortypeforrating`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            let factorDetails = data.Result;
            let paramList:any[] = factorDetails.RatingFieldDetails;
            if(paramList.length!=0){
              let i=0;
              for(let param of paramList){
                if(param.RangeYn=='Y'){
                  if(param.ColumnsId=="1"){
                    if(param.ApiUrl){
                      this.rangeApiurl = param.ApiUrl;
                    }
                    this.rangeFirstName = param.FromDisplayName;
                    this.rangeSecondName = param.ToDisplayName;
                    this.coverRangeFirst = true;
                  }
                  else if(param.ColumnsId == '2'){

                    if(param.ApiUrl){
                      this.rangeApiurl1 = param.ApiUrl;
                    }
                    this.rangeThirdName = param.FromDisplayName;
                    this.rangeFourthName = param.ToDisplayName;
                    this.coverRangeSecond = true;
                  }
                  else if(param.ColumnsId == '3'){
                    if(param.ApiUrl){
                      this.rangeApiurl2 = param.ApiUrl;
                    }
                    this.rangeFifthName = param.FromDisplayName;
                    this.rangeSixthName = param.ToDisplayName;
                    this.coverRangeThird = true;
                  }
                  else if(param.ColumnsId == '4'){
                    if(param.ApiUrl){
                      this.rangeApiurl3 = param.ApiUrl;
                    }
                    this.rangeSeventhName = param.FromDisplayName;
                    this.rangeEigthName = param.ToDisplayName;
                    this.coverRangeFourth = true;
                  }
                }
                if(param.RangeYn=='N'){
                  if(param.ColumnsId=="5"){
                    if(param.ApiUrl){
                      this.rangeApiurl4 = param.ApiUrl;
                    }
                    this.discreteFirstName = param.DiscreteDisplayName;
                    this.coverDiscreteFirst = true;
                  }
                  else if(param.ColumnsId == '6'){
                    if(param.ApiUrl){
                      this.rangeApiurl5 = param.ApiUrl;
                    }
                    this.discreteSecondName = param.DiscreteDisplayName;
                    this.coverDiscreteSecond = true;
                  }
                  else if(param.ColumnsId == '7'){
                    if(param.ApiUrl){
                      this.rangeApiurl6 = param.ApiUrl;
                    }
                    this.discreteThirdName = param.DiscreteDisplayName;
                    this.coverDiscreteThird = true;
                  }
                  else if(param.ColumnsId == '8'){
                    if(param.ApiUrl){
                      this.rangeApiurl7 = param.ApiUrl;
                    }
                    this.discreteFourthName = param.DiscreteDisplayName;
                    this.coverDiscreteFourth = true;
                  }
                }
                i+=1;
                if(i==paramList.length){
                  this.getFactorTypeDetails(null,this.FactorTypeId);
                }
              }
            }
          }

        },
        (err) => { },
      );
    }
  }


  getFactorTypeDetails(subCoverId,FactorValue){

  
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "SectionId":this.SectionId,
      "CoverId": this.CoverIds,
      "SubCoverId":"0",
      "FactorTypeId":FactorValue
    }
    let urlLink = `${this.ApiUrl1}master/getbyfactorrateid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            if(data.Result.FactorParams==null){
              //this.downloadSection=false;
            this.factorTypeList = [];
//this.setPagination(this.factorTypeList);
this.onAddFactorList();
            }
            else{
              //this.downloadSection = true;
              this.factorTypeList = data.Result.FactorParams;
            }
        }


      },
      (err) => { },
    );
    }

  onAddFactorList(){
    let entry = {
              "SNo":String(this.factorTypeList.length+1),
              "Param1":null,
              "Param2":null,
              "Param3":null,
              "Param4":null,
              "Param5":null,
              "Param6":null,
              "Param7":null,
              "Param8":null,
              "Param9":null,
              "Param10":null,
              "Param11":null,
              "Param12":null,
              "CalcType":"",
              "Rate":null,
              "MinimumPremium":null,
              "RegulatoryCode": null,
              "Status":"Y"
    }
    this.factorTypeList.push(entry);
}
  getFactorTypeList(){
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/factortype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.factorList = data?.Result;
           //this.getExistingCoverist();
        }

      },
      (err) => { },
    );
  }
  getExistingpromoCode(){
 let ReqObj = {
      "PromocodeId":this.promocode,
       "SectionId":this.SectionId,
       "ProductId": this.productId,
      "InsuranceId": this.insuranceId
      }
    let urlLink = `${this.ApiUrl1}master/getbycompanypromocodeid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.promoDetails = data.Result;
          this.PromocodeType= this.promoDetails.PromocodeType;
          this.FactorTypeId=this.promoDetails.FactorTypeId;
          this.getFactorTypeList();
          this.getBasedonList();
          this.getTaxTypeList();
          
           this.pro=this.promoDetails.PromocodeId;

           this.basedOnColumnValue=this.promoDetails.CoverBasedOn;
           this.CoverIds=this.promoDetails.CoverId;
           if(this.PromocodeType=='S'){
            this.open=true;
            this.onCoverFactorTypeChange();
            //this.getFactorTypeDetails(null,this.FactorTypeId)
           }

          console.log('YYYYYYYYY',this.promoDetails);
          if(this.promoDetails){
            if(this.promoDetails?.PeriodFrom!=null){
              this.promoDetails.PeriodFrom= this.onDateFormatInEdit(this.promoDetails?.PeriodFrom)
            }if(this.promoDetails?.PeriodTo!=null){
              this.promoDetails.PeriodTo= this.onDateFormatInEdit(this.promoDetails?.PeriodTo)
            }
          }
        }

      },
      (err) => { },
    );
  }

  onDeleteRow(index:any){
    this.factorTypeList.splice(index,1);
}

  onDateFormatInEdit(date) {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if(format.length >1){
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else{
        format = date.split('/');
        if(format.length >1){
          //var NewDate = new Date(new Date(format[2], format[1], format[0]));
          //NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }

  onSave(){
    let FactorId:any;
    if(this.promoDetails.IsTaxExcempted=='N'){
      this.promoDetails.TaxExcemptionReference=null;
      this.promoDetails.TaxExcemptionType=null;
 }
if(this.FactorTypeId!=null && this.FactorTypeId!=undefined && this.FactorTypeId!=''){
  FactorId=this.FactorTypeId;
}
else{
  FactorId=null;
}
 if(this.promocode){
  this.promoDetails.PromocodeId=this.promocode;
 }
 else{
  this.promoDetails.PromocodeId="";
 }

 if(this.PromocodeType=='S'){
 this.promoDetails.PromoRateOrAmt=null;
  }
    let ReqObj = {
      "PromocodeId": this.promoDetails.PromocodeId,
"ProductId":this.productId,
"InsuranceId":this.insuranceId,
"Promocode":this.promoDetails.Promocode,
"SectionId":this.SectionId,
"CoreAppCode":this.promoDetails.CoreAppCode,
"BranchCode":"99999",
"Remarks":this.promoDetails.Remarks,
"Status":this.promoDetails.Status,
"ToolTip":this.promoDetails.ToolTip,
"FactorTypeId":FactorId,
//this.promoDetails.FactorTypeId
"PeriodFrom":this.promoDetails.PeriodFrom,
"PeriodTo":this.promoDetails.PeriodTo,
"RegulatoryCode":this.promoDetails.RegulatoryCode,
"CreatedBy":this.loginId,
"PromocodeDesc":this.promoDetails.PromocodeDesc,
"PromocodeType":this.PromocodeType,
"CalcType":this.promoDetails.CalcType,
"IsTaxExcempted":this.promoDetails.IsTaxExcempted,
"PromoRateOrAmt":this.promoDetails.PromoRateOrAmt,
"AgencyCode":"99999",
"MinimumPremium":this.promoDetails.MinimumPremium,
"TaxExcemptionReference": this.promoDetails.TaxExcemptionReference,
"TaxExcemptionType":this.promoDetails.TaxExcemptionType,
"DiscountCoverId":this.promoDetails.DiscountCoverId
    }
    let urlLink = `${this.ApiUrl1}master/insertcompanypromocode`;
    if (ReqObj.PeriodFrom != '' && ReqObj.PeriodFrom != null && ReqObj.PeriodFrom != undefined) {
      ReqObj['PeriodFrom'] =  this.datePipe.transform(ReqObj.PeriodFrom, "dd/MM/yyyy")
    }
    else{
      ReqObj['PeriodFrom'] = "";
    }
    if (ReqObj.PeriodTo != '' && ReqObj.PeriodTo != null && ReqObj.PeriodTo != undefined) {
      ReqObj['PeriodTo'] =  this.datePipe.transform(ReqObj.PeriodTo, "dd/MM/yyyy")
    }
    else{
      ReqObj['PeriodTo'] = "";
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
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
            //         'Referal Details Inserted/Updated Successfully',
            //         'Referal Details',
            //         config);


            if(this.PromocodeType=='D'){
              console.log('ttttttttttt',this.PromocodeType)
this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster']);
            }
            else if(this.PromocodeType=='S') {
              console.log('ffffffff',this.PromocodeType)
              this.nav('next');
              this.SPromocode=data.Result.SuccessId;
              this.CoverId=data.Result.CoverId;
              this.open=true;
              console.log('FACTORS',this.FactorTypeId);
              this.getFactorTypeDetails(null,this.FactorTypeId)
              this.cover(this.SPromocode,this.CoverId)

//this.cover()

//this.insertScheme()

            }

          }
          else if(data.ErrorMessage){
              if(res.ErrorMessage){
                for(let entry of res.ErrorMessage){
                  // let type: NbComponentStatus = 'danger';
                  // const config = {
                  //   status: type,
                  //   destroyByClick: true,
                  //   duration: 4000,
                  //   hasIcon: true,
                  //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  //   preventDuplicates: false,
                  // };
                  // this.toastrService.show(
                  //   entry.Field,
                  //   entry.Message,
                  //   config);
                }
                console.log("Error Iterate",data.ErrorMessage)
                //this.loginService.errorService(data.ErrorMessage);
              }
          }
        },
        (err) => { },
      );
  }

  nav(n) {
    switch (n) {
      case 'next': {
        this.btnNextPrev.index++
        if (this.btnNextPrev.index > 3) {
          this.btnNextPrev.prev = false
          this.btnNextPrev.next = true
        } else {
          this.btnNextPrev.prev = false
        }
      }; break;
      case 'prev': {
        this.btnNextPrev.index--
        if (this.btnNextPrev.index == 0) {
          this.btnNextPrev.prev = true
          this.btnNextPrev.next = false
        } else {
          this.btnNextPrev.next = false
        }
      }; break;

    }
  }

  cover(sporo,gh){


  }
  insertScheme(){

this.cover(this.SPromocode,this.CoverId)

let CoverId

if(this.CoverId!=null){
  CoverId=this.CoverId
}
else if(this.CoverIds!=null){
  CoverId=this.CoverIds
}
let promo
if(this.SPromocode){
  promo=this.SPromocode
}
else{
promo=this.pro
}
    if(this.promoDetails.PromocodeType='S'){
      this.promoDetails.PromoRateOrAmt=null;
       }
    let ReqObj={
    "PromocodeId":promo,
    "ProductId":this.productId,
    "InsuranceId":this.insuranceId,
    "SectionId":this.SectionId,
    "BranchCode":"99999",
    "CoverId":CoverId,
    "FactorTypeId":this.FactorTypeId,
    "CoverBasedOn":this.basedOnColumnValue,
    "FactorParams":this.factorTypeList,
    "CreatedBy":this.loginId,

      }
      let urlLink = `${this.ApiUrl1}master/insertpromocodescheme`;

    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          console.log(data);
          let res:any=data;
          if(data.Result){
            this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster']);
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
            //         'Referal Details Inserted/Updated Successfully',
            //         'Referal Details',
            //         config);


          }
          else if(data.ErrorMessage){
              if(res.ErrorMessage){
                for(let entry of res.ErrorMessage){
                  // let type: NbComponentStatus = 'danger';
                  // const config = {
                  //   status: type,
                  //   destroyByClick: true,
                  //   duration: 4000,
                  //   hasIcon: true,
                  //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  //   preventDuplicates: false,
                  // };
                  // this.toastrService.show(
                  //   entry.Field,
                  //   entry.Message,
                  //   config);
                }
                console.log("Error Iterate",data.ErrorMessage)
                //this.loginService.errorService(data.ErrorMessage);
              }
          }
        },
        (err) => { },
      );

  }


  getDiscount(){
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "SectionId": this.SectionId,
      "CoverId": ""
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/discountsectioncover`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.DiscountList = data?.Result;
           //this.getExistingCoverist();
        }

      },
      (err) => { },
    );
  }

}
