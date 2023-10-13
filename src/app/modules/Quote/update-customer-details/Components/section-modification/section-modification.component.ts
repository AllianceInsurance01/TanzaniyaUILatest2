import { Component,OnInit } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../../shared/shared.service';
declare var $:any;
import { cloneDeep } from 'lodash';

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
  p=1;industryError: boolean=false;selectedSections: any[]=[];
  sectionError: boolean=false;
  requestReferenceNo: any=null;
  brokerBranchCode: any;
  brokerCode: any;
  currencyCode: any;
  customerDetails: any=null;
  brokerbranchCode: string;
  applicationId: string;
  commonDetails: any={};
  subuserType: string;
  sourceType: any=null;
  issuerSection: boolean=false;
  bdmCode: any=null;
  customerCode: any=null;
  endrosementid: string;
  Addsection:boolean=false;
  Removesection:boolean=false;
  newsection:boolean=true;
  addproductList:any;
  optedsection:any[]=[];
  nonoptedsections:any[]=[];
  optedTypeList:any[]=[];
  optedlist:any[]=[];
  enableFieldsList: any;
  endorsementSection: boolean = false;enableIndustry:boolean = false;
  endorsementDate: any=null;
  endorsementEffectiveDate: any=null;
  endorsementRemarks: any=null;
  endorsementType: any=null;
  endorsementTypeDesc: any=null;
  endtCategoryDesc: any=null;
  endtCount: any=null;
  endtPrevQuoteNo: any=null;
  endtStatus: any=null;
  endtPrevPolicyNo: any=null;
  orginalPolicyNo: any=null;
  isFinanceEndt: any=null;
  endorsementDetails: any;
  customerName: any;
  endorsePolicyNo: any=null;
  constructor(private router:Router,private sharedService: SharedService,private datePipe:DatePipe,
    private updateComponent:UpdateCustomerDetailsComponent) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
      let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
      if (commonDetails) this.commonDetails = commonDetails;
      console.log("UserDetails",this.userDetails);
      this.loginId = this.userDetails.Result.LoginId;
      this.userType = this.userDetails?.Result?.UserType;
      this.agencyCode = this.userDetails.Result.OaCode;
      this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
      this.branchCode = this.userDetails.Result.BranchCode;
      this.productId = this.userDetails.Result.ProductId;
      this.PackageYn= this.userDetails.Result.PackageYn
      this.insuranceId = this.userDetails.Result.InsuranceId;
      this.branchList = this.userDetails.Result.LoginBranchDetails;
      this.updateComponent.showStepperSection = true;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.getSectionDetails();
        //this.onproductdisplay();
      }
      else{
        this.onproductdisplay();
      }
      let existEnd = JSON.parse(sessionStorage.getItem('endorseTypeId'));
      if(existEnd){
        
        this.endorsementSection = true;
        this.endorsementDetails = existEnd;
        console.log("Entered Data",existEnd)
        this.endrosementid=existEnd?.EndtTypeId;
        this.enableFieldsList = existEnd.FieldsAllowed;
        this.endorsePolicyNo = existEnd?.PolicyNo;
        let addSection = this.enableFieldsList.some(ele=>ele=='AddSection' || ele=='Add Section');
        let removeSection = this.enableFieldsList.some(ele=>ele=='RemoveSection' || ele=='Remove Section');
          if(addSection){
            this.Addsection=true;
            this.newsection=false;
            this.getAddsectionDetails();
          }
          else if(removeSection){
            this.Removesection=true;
            this.newsection=false;
            this.getAddsectionDetails();
          }
        else{
          this.newsection=true;
          this.Removesection=false;
          this.Addsection=false;
        }
      }
      else{
        this.newsection=true;
        this.Removesection=false;
        this.Addsection=false;
        this.endorsementSection = false;
      }
    }

    ngOnInit(): void{
      
      this.getIndustryList();
    }

getSectionDetails(){
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "ProductId":this.productId,
    "RiskId":"1",
    "InsuranceId": this.insuranceId
  }
  let urlLink = `${this.motorApiUrl}api/slide/getcommondetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data?.Result){
        this.selectedSections = data?.Result?.SectionIds;
        this.IndustryId = data?.Result?.IndustryId;
        this.BuildingOwnerYn = data?.Result?.BuildingOwnerYn;
        let contents:boolean=false,building:boolean=false;
        if(this.selectedSections.some(ele=>ele=='47')) contents = true;
        if(this.selectedSections.some(ele=>ele=='40' || ele=='1')) building = true;
        if(building) this.coversRequired = 'B';
        if(contents) this.coversRequired = 'C';
        if(building && contents) this.coversRequired = 'BC';
        this.onproductdisplay();
      }
          
    },

    (err) => { },
  );
}    
onproductdisplay(){
  let ReqObj = {
    "InsuranceId":this.insuranceId,
    "ProductId": this.productId
  }
  let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      console.log('IIIIII',data);
      if(data.Result){
          let products = data.Result;
          if(products.length!=0){
            let i=0;
            for(let product of products){
                if(this.selectedSections.length!=0){
                  product['checked'] = this.selectedSections.some(ele=>ele==product.Code);
                }
                else product['checked']=false;
                i+=1;
                if(i==products.length) this.productList = products
            }
          }
          console.log('KKKKKKKKKKKKKK',this.productList)
          //this.premiunDropdown()

      }
      
    },

    (err) => { },
  );
}
onIndustryChange(){
  let entry = this.industryList.find(ele => ele.Code == this.IndustryId);
    console.log("Selected Entry ", entry);
    if (entry) {
      this.categoryDesc = entry.CategoryDesc;
    }
}
getIndustryList() {
  this.industryList = [];
  let ReqObj = {
    "CategoryId": null,
    "BranchCode": this.branchCode,
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
  }
  let urlLink = `${this.CommonApiUrl}master/dropdown/industry`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
      this.industryList = defaultObj.concat(data.Result);


    },
    (err) => { },
  );
}
  onFormSubmit(){
    if(this.IndustryId!=null && this.IndustryId!='' && this.IndustryId!=undefined){
      this.industryError = false;
      if(this.selectedSections.length!=0){
        this.sectionError = false;
        this.finalProceed();
      }
      else{this.sectionError = true;}
      
    }
    else{
        this.industryError = true;
    }
   
  }
  onOwnerYNChange(){
    this.coversRequired = 'C';
    if(this.coversRequired=='C' || this.coversRequired==null){
      let entry = this.productList.find(ele=>ele.Code=='40' || ele.Code=='1');
      entry.checked = false;
      this.selectedSections = this.selectedSections.filter(ele=>ele!='40' && ele!='1');
   }
   if(this.coversRequired=='B' || this.coversRequired==null){
     let entry = this.productList.find(ele=>ele.Code=='47');
     entry.checked = false;
     this.selectedSections = this.selectedSections.filter(ele=>ele!='47');
   }
  }
  onChangeCoversType(){
    if(this.coversRequired=='C'){
       let entry = this.productList.find(ele=>ele.Code=='40' || ele.Code=='1');
       entry.checked = false;
       let build = this.productList.find(ele=>ele.Code=='47');
      if(build) build.checked = true;
       this.selectedSections = this.selectedSections.filter(ele=>ele!='40' && ele!='1');
       if(this.productList.some(ele=>ele.Code=='47') && !this.selectedSections.some(ele=>ele=='47')) this.selectedSections.push('47');
       
    }
    else if(this.coversRequired=='B'){
      let entry = this.productList.find(ele=>ele.Code=='47');
      entry.checked = false;
      let build = this.productList.find(ele=>ele.Code=='40');
      if(build) build.checked = true;
      let build2 = this.productList.find(ele=>ele.Code=='1');
      if(build2) build2.checked = true;
      this.selectedSections = this.selectedSections.filter(ele=>ele!='47');
      if(this.productList.some(ele=>ele.Code=='1') && !this.selectedSections.some(ele=>ele=='1')){this.selectedSections.push('1');}
      if(this.productList.some(ele=>ele.Code=='40') && !this.selectedSections.some(ele=>ele=='40')) this.selectedSections.push('40');
   }
   else{
    let build3 = this.productList.find(ele=>ele.Code=='47');
      if(build3) build3.checked = true;
       this.selectedSections = this.selectedSections.filter(ele=>ele!='40' && ele!='1');
       if(this.productList.some(ele=>ele.Code=='47') && !this.selectedSections.some(ele=>ele=='47')) this.selectedSections.push('47');
    let build = this.productList.find(ele=>ele.Code=='40');
      if(build) build.checked = true;
      let build2 = this.productList.find(ele=>ele.Code=='1');
      if(build2) build2.checked = true;
    if(this.productList.some(ele=>ele.Code=='1') && !this.selectedSections.some(ele=>ele=='1')){this.selectedSections.push('1');}
    if(this.productList.some(ele=>ele.Code=='40') && !this.selectedSections.some(ele=>ele=='40')) this.selectedSections.push('40');

   }
  }
  finalProceed(){
    let promocode = null;
    let appId = "1", loginId = "", brokerbranchCode = "";let createdBy = "";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      //createdBy = this.vehicleDetailsList[0].CreatedBy;
    }
    else {
      createdBy = this.loginId;
      if (this.userType != 'Issuer') {
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId = this.loginId;
        brokerbranchCode = this.brokerbranchCode;
      }
      else {
        appId = this.loginId;
        loginId = this.commonDetails[0].LoginId
        brokerbranchCode = null;
      }
    }
    this.applicationId = appId;
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      if (this.applicationId != '01' && this.applicationId != '1') { this.issuerSection = true; }
      else { this.issuerSection = false; }
    }
    else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; }
    else this.issuerSection = false
    this.subuserType = sessionStorage.getItem('typeValue');
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
    }
    if (this.commonDetails[0].Promocode) {
      promocode = this.commonDetails[0].Promocode;
    }
    else if (this.commonDetails[0].PromoCode) promocode = this.commonDetails[0].PromoCode;
    if (this.commonDetails[0].CustomerCode != null && this.commonDetails[0].CustomerCode != undefined){this.customerCode = this.commonDetails[0].CustomerCode;
    this.customerName = this.commonDetails[0].CustomerName
    }
    else{
      this.customerCode = null;this.customerName=null;
    }
    if (this.issuerSection) {
      this.sourceType = this.commonDetails[0].SourceType;
      this.bdmCode = this.commonDetails[0].BrokerCode;
      this.brokerCode = this.commonDetails[0].BrokerCode;
      brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
      
    }
    else{
      this.sourceType = this.subuserType
    }
    if(this.endorsementSection){
      this.endorsementDate = this.endorsementDetails.EndorsementDate;
      this.endorsementEffectiveDate = this.endorsementDetails?.EndorsementEffectiveDate;
      this.endorsementRemarks = this.endorsementDetails?.EndorsementRemarks;
      this.endorsementType = this.endorsementDetails?.EndorsementType;
      this.endorsementTypeDesc = this.endorsementDetails?.EndorsementTypeDesc;
      this.endtCategoryDesc = this.endorsementDetails?.EndtCategoryDesc;
      this.endtCount = this.endorsementDetails?.EndtCount;
      this.endtPrevQuoteNo = this.endorsementDetails?.EndtPrevQuoteNo;
      this.endtStatus = this.endorsementDetails?.EndtStatus;this.orginalPolicyNo = this.endorsementDetails?.OrginalPolicyNo;
      this.endtPrevPolicyNo = this.endorsementDetails?.EndtPrevPolicyNo;this.isFinanceEndt = this.endorsementDetails?.IsFinanceEndt;
    }
    let ReqObj = { 
        "AcexecutiveId": "",
        "PolicyNo": this.endorsePolicyNo,
        "ProductId": this.productId,
        "ProductType": "Asset",
        "TiraCoverNoteNo": null,
        "RequestReferenceNo": this.requestReferenceNo,
        "AgencyCode": this.agencyCode,
        "ApplicationId": this.applicationId,
        "BdmCode": this.customerCode,
        "BranchCode": this.branchCode,
        "BrokerBranchCode": brokerbranchCode,
        "BrokerCode": this.brokerCode,
        "BuildingOwnerYn": this.BuildingOwnerYn,
        "Createdby": this.loginId,
        "SourceType": this.sourceType,
        "Currency": this.commonDetails[0].Currency,
        "CustomerReferenceNo": sessionStorage.getItem('customerReferenceNo'),
        "CustomerCode": this.customerCode,
        "CustomerName": this.customerName,
        "ExchangeRate": this.commonDetails[0].ExchangeRate,
        "Havepromocode": this.commonDetails[0].HavePromoCode,
        "Promocode": promocode,
        "InsuranceId": this.insuranceId,
        "LoginId": loginId,
        "UserType": this.userType,
        "PolicyEndDate": this.commonDetails[0].PolicyEndDate,
        "PolicyStartDate": this.commonDetails[0].PolicyStartDate,
        "SectionIds": this.selectedSections,
        "SubUsertype": this.subuserType,
        "RiskId":"1",
        "IndustryId": this.IndustryId,
        "EndorsementDate": this.endorsementDate,
        "EndorsementEffectiveDate": this.endorsementEffectiveDate,
        "EndorsementRemarks": this.endorsementRemarks,
        "EndorsementType": this.endorsementType,
        "EndorsementTypeDesc": this.endorsementTypeDesc,
        "EndtCategoryDesc": this.endtCategoryDesc,
        "EndtCount": this.endtCount,
        "EndtPrevPolicyNo": this.endtPrevPolicyNo,
        "EndtPrevQuoteNo":  this.endtPrevQuoteNo,
        "EndtStatus": this.endtStatus,
        "IsFinanceEndt": this.isFinanceEndt,
        "OrginalPolicyNo": this.orginalPolicyNo,
        "Status": "Y"
    }
    let urlLink = `${this.motorApiUrl}api/slide/savecommondetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
                let sections = data.Result?.SectionIds;
                let refNo = data.Result?.RequestReferenceNo;
                this.updateComponent.referenceNo = refNo;
                sessionStorage.setItem('quoteReferenceNo',refNo);
                let homeDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
                if (homeDetails) {
                    if(this.IndustryId)
                    homeDetails[0]['IndustryName'] = this.industryList.find(ele=>ele.Code==this.IndustryId).CodeDesc;
                    if (homeDetails[0].SectionId == undefined || homeDetails[0].SectionId == "undefined") homeDetails[0]['SectionId'] = sections;
                    else homeDetails[0].SectionId = sections;
                    sessionStorage.setItem('homeCommonDetails', JSON.stringify(homeDetails))
                    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident']);
                }
        }
      },
      (err) => { },
    );
  }
  checkDisable(){
    return this.selectedSections.some(ele=>ele =='56' || ele=='39' || ele=='53' || ele=='54')
  }
  checkSectionOpted(rowData){
    return this.selectedSections.some(ele=>ele==rowData.Code);
  }
  // SectionOpted(rowData){
  //   return this.optedsection.some(ele=>ele==rowData.SectionId);
  // }
  checkSections(rowData){
    return rowData.checked;
  }
  onChangeSections(rowData,index){
    if(!this.endorsementSection){
      let entry = this.checkSectionOpted(rowData);
      if(!entry){
        this.sectionError = false;
        this.productList[index].checked = true;
        this.selectedSections.push(rowData.Code);
  
      }
      else{
        this.selectedSections = this.selectedSections.filter(ele=>ele!=rowData.Code);
        this.productList[index].checked = false;
        if(this.selectedSections.length==0) this.sectionError = true;
      }
    }
    
    //if(this.selectedSections.length!=0){
    //   let entry = this.selectedSections.some(ele=>ele==rowData.Code);
    //   if(entry){
    //     this.selectedSections = this.selectedSections.filter(ele=>ele!=rowData.Code);
    //     if(this.selectedSections.length==0) this.sectionError = true;
    //   }
    //   else{
    //     this.sectionError = false;
    //     this.selectedSections.push(rowData.Code);
    //   }
    // }
    // else{
    //     this.sectionError = false;
    //     this.selectedSections.push(rowData.Code);
    // }
    console.log("Final Sections",this.selectedSections,rowData)
  }

  getAddsectionDetails(){
    let i=0;let list
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo,
      "ProductId":this.productId,
      "InsuranceId": this.insuranceId,
    }
    let urlLink = `${this.CommonApiUrl}endorsment/sectionlist`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
         this.addproductList=data.Result;
         this.optedsection= this.addproductList.OptedSections;
         this.optedTypeList = cloneDeep(data);
         this.nonoptedsections=this.addproductList.NonOptedSections;
         for(let r of this.optedsection){
             list=r.SectionId;
             this.optedlist.push(list);
             i++;
         }
         console.log('opted Product List',this.optedlist);
         console.log('Non opted Product List',this.nonoptedsections);
        }
            
      },
  
      (err) => { },
    );
  }   


  onChangeOptedSections(rowData,index,event){
    console.log('Datass',event.checked);
    //let entry = this.SectionOpted(rowData);
   
    if(event.checked == true){
      let entry=this.optedsection.some(ele=>ele==rowData.SectionId);
      console.log('IIIIIIIIIIII',entry);
      if(!entry){
        this.sectionError = false;
        this.selectedSections.push(rowData.SectionId)
        //this.optedsection[index].checked = true;
        //this.optedsection.push(rowData);
      }
    }
    else if(event.checked==false){
      let entry = this.selectedSections.some(ele=>ele==rowData.SectionId);
      console.log('SSSSSSSS',entry);
      if(!entry){
        console.log(rowData.SectionId)
        //this.selectedSections.splice(rowData.SectionId,index);
      }
     
      // this.selectedSections = this.selectedSections.filter(ele=>ele!=rowData.Code);
      // this.productList[index].checked = false;
      // if(this.selectedSections.length==0) this.sectionError = true;
    }
  }


  onSave(){
    let promocode = null;
    let appId = "1", loginId = "", brokerbranchCode = "";let createdBy = "";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      //createdBy = this.vehicleDetailsList[0].CreatedBy;
    }
    else {
      createdBy = this.loginId;
      if (this.userType != 'Issuer') {
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId = this.loginId;
        brokerbranchCode = this.brokerbranchCode;
      }
      else {
        appId = this.loginId;
        loginId = this.commonDetails[0].LoginId
        brokerbranchCode = null;
      }
    }
    this.applicationId = appId;
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      if (this.applicationId != '01' && this.applicationId != '1') { this.issuerSection = true; }
      else { this.issuerSection = false; }
    }
    else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; }
    else this.issuerSection = false
    this.subuserType = sessionStorage.getItem('typeValue');
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
    }
    if (this.commonDetails[0].Promocode) {
      promocode = this.commonDetails[0].Promocode;
    }
    else if (this.commonDetails[0].PromoCode) promocode = this.commonDetails[0].PromoCode;
    if (this.commonDetails[0].CustomerCode != null && this.commonDetails[0].CustomerCode != undefined) this.customerCode = this.commonDetails[0].CustomerCode;
    if (this.issuerSection) {
      this.sourceType = this.commonDetails[0].SourceType;
      this.bdmCode = this.commonDetails[0].BrokerCode;
      this.brokerCode = this.commonDetails[0].BrokerCode;
     brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
    }
    else {
      this.sourceType = this.subuserType = sessionStorage.getItem('typeValue');
    }
    let ReqObj = { 
      "BranchCode":this.branchCode,
     "EndorsementDate": "07/07/2023",
     "EndorsementEffectiveDate": "07/07/2023",
     "EndorsementRemarks": "None",
     "EndorsementType": this.endrosementid,
    "EndorsementTypeDesc": "Add Section ",
     "EndtCategoryDesc": "Financial",
     "EndtCount": 1,
     "EndtPrevPolicyNo": "P11/2023/100/1002/10/01212",
     "EndtPrevQuoteNo": "Q03533",
    "EndtSectionIds": [
    "52","47"
    ],
  "EndtStatus": "P",
  "InsuranceId": "100002",
  "IsFinanceEndt": "Y",
  "OrginalPolicyNo": "P11/2023/100/1002/10/01212",
  "PolicyNo": "P11/2023/100/1002/10/01212-1",
  "ProductId": "19",
  "RequestReferenceNo": "SME-05532",
  "SectionEndtModification": "Added"
    }
    let urlLink = `${this.motorApiUrl}api/slide/savecommondetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
                let sections = data.Result?.SectionIds;
                let refNo = data.Result?.RequestReferenceNo;
                this.updateComponent.referenceNo = refNo;
                sessionStorage.setItem('quoteReferenceNo',refNo);
                let homeDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
                if (homeDetails) {
                    if (homeDetails[0].SectionId == undefined || homeDetails[0].SectionId == "undefined") homeDetails[0]['SectionId'] = sections;
                    else homeDetails[0].SectionId = sections;
                    sessionStorage.setItem('homeCommonDetails', JSON.stringify(homeDetails))
                    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident']);
                }
        }
      },
      (err) => { },
    );
  }

}

