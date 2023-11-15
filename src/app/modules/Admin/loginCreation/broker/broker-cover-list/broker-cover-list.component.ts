import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-broker-cover-list',
  templateUrl: './broker-cover-list.component.html',
  styleUrls: ['./broker-cover-list.component.scss']
})
export class BrokerCoverListComponent implements OnInit {

  activeMenu:any="Cover";brokerId:any;
  branchValue:any; coverList:any[]=[];
  insuranceId:any;brokerLoginId:any;sectionValue:any="";
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchData: any[]=[];branchHeader:any[]=[];
  tableData: any[]=[];sectionList:any[]=[];
  branchsData:any[]=[];
  agencyCode: any;
  productList: any[]=[];productValue:any;columnHeader:any[]=[];
  AgencyCode: any;
  IncludedExcluded:any[]=[];
  Inc:any[]=[];
  IncValue: string;
  select=false;
  rowData:any[]=[]; brokerList:any[]=[];
  mindate:any;
  EffectiveValue:any;
  effectiveDate: any;
  minDate:any;
  dialogRef:any;statusValue='Y';
  constructor(private router:Router,private sharedService: SharedService, private datePipe:DatePipe,private dialog: MatDialog) {
    let brokerObj = JSON.parse(sessionStorage.getItem('brokerConfigureDetails'));
    this.minDate=new Date();
    if(brokerObj){
      if(brokerObj.loginId) this.brokerLoginId = brokerObj.loginId;
      if(brokerObj.insuranceId) this.insuranceId = brokerObj.insuranceId;
      if(brokerObj.brokerId) this.brokerId = brokerObj.brokerId;
      if(brokerObj.brokerId) this.AgencyCode= brokerObj.brokerId
    }
    this.brokerId = this.brokerLoginId;
    this.getProductList();
    this.mindate=new Date();
    console.log('jjjjj',this.mindate)

    this.Inc=[{
      "Code":"1","CodeDesc":"Included"},
      {"Code":"2","CodeDesc":"Excluded"}]
   }


   /*getInclude()
   {
    this.Inc=[{
      "Code":"1","CodeDesc":"Included"},
      {"Code":"2","CodeDesc":"Excluded"}]
     this.IncValue="";

   }*/
  ngOnInit(): void {
    this.columnHeader = [
      {
        key: 'CoverId',
        display: 'Select',
        config: {
          isChecked: true,
          model:'isChecked'
        },
      },
      { key: 'CoverName', display: 'Cover Name' },
      { key: 'CoverDesc', display: 'Cover Desc' },
      { key: 'EffectiveDateStart', display: 'Start Date' },
      { key: 'EffectiveDateEnd', display: 'End Date' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
      {
        key: 'SubCoverYn',
        display: 'CoverRating',
        config: {
          isCoverRatingEdit:true,
        },
      },
      {
        key:'SubCover',
        display:'SubCoverRating',
        config:
        {
          isSubCoverRatingEdit:true,
        },
      }
    ];
    console.log('AAAAAAAAA',this.AgencyCode);
  }


  openDialog(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
     //width: '100%',
     //height:'50%'
   });
  }
  close(){
    this.effectiveDate="";
    this.dialog.closeAll();
  }

  onSelectCustomer(row:any,template){
    
    let t:any;
    this.rowData=row;
    /*if(row.isChecked == true){
      this.select=true;
    }
    else if(row.isChecked == false){
      this.select=false;
    }*/
    console.log('hhhhhhhh',row)
    /*if(this.IncValue=='1'){
         this.Included(row)
    }
    else if(this.IncValue =='2'){
      this.Excluded(row)
    }*/
    /*if(this.EffectiveValue!=null){
       t=  this.datePipe.transform(this.EffectiveValue, "dd/MM/yyyy");
      console.log('kkkkkkkkk',t)
    }*/
    console.log("RowData",row);
    if(row.isChecked == true){
      this.select=true;
      if(this.IncValue =='2'){
        this.select=true;
        let entry =  {
          "CreatedBy": this.brokerLoginId,
          "InsuranceId": this.insuranceId,
          "ProductId": this.productValue,
          "SectionId":this.sectionValue,
          "CoverId": row.CoverId,
          "EffectiveDateStart":t,
          "AgencyCode":this.AgencyCode,
          "BranchCode":this.branchValue,
          "Status":"Y",
        }
        this.coverList.push(entry);
      }
      else if(this.IncValue =='1'){
        this.select=true;
          //this.openDialog(template);

          //console.log('effffffff',this.effectiveDate)
          /*if(this.effectiveDate!=null){
            t=  this.datePipe.transform(this.effectiveDate, "dd/MM/yyyy");
           console.log('kkkkkkkkk',t)
         }*/
        let entry={
         "InsuranceId":this.insuranceId,
         "ProductId":this.productValue,
         "CoverId":row.CoverId,
         "SectionId":this.sectionValue,
         "Status":row.Status,
         "EffectiveDateStart":t,
         "BranchCode":this.branchValue,
         "AgencyCode":this.AgencyCode
        }
        this.brokerList.push(entry);
   }  
      console.log("Cover List",this.coverList);
    }
    else if(row.isChecked == false){
      this.select=false;
      if(this.IncValue =='2'){
      let index = this.coverList.findIndex(ele=>ele.CoverId==row.CoverId);
      this.coverList.splice(index,1);
      }
      else if(this.IncValue =='1'){
        let index = this.brokerList.findIndex(ele=>ele.CoverId==row.CoverId);
        this.brokerList.splice(index,1);
      }
    }

   console.log("Cover List",this.brokerList);

  }
  getBack(){
      this.router.navigate(['Admin/brokersList']);
  }
  Effectivedate(effectiveDate)
  {
    this.EffectiveValue=effectiveDate;
  }

  submit(){
    let t:any;
  if(this.IncValue=='1'){
      //this.Included(this.rowData)
      if(this.effectiveDate!=null){
        t=  this.datePipe.transform(this.effectiveDate, "dd/MM/yyyy");
       console.log('efffffffffff',t);
       //this.brokerList[0].EffectiveDateStart=t;
     }
      let i=0;
      console.log('kkkkkkkkkkkkkkkkk',this.brokerList)
        for(let u of this.brokerList){
          u['Status'] = this.statusValue;
        u['EffectiveDateStart']=t;
          console.log('efffffffffff',t);
          i++;
           this.brokersubmit(u,i)
      
        }
 }
 else if(this.IncValue =='2'){
  if(this.effectiveDate!=null){
    t=  this.datePipe.transform(this.effectiveDate, "dd/MM/yyyy");
   console.log('efffffffffff',t);
   //this.brokerList[0].EffectiveDateStart=t;
 }
  let i=0;
  console.log('kkkkkkkkkkkkkkkkk',this.coverList)
    for(let u of this.coverList){
    u['EffectiveDateStart']=t;
      console.log('efffffffffff',t);
      i++;
      if(i==this.coverList.length) this.Included(u,i)
  
    }
 
   //this.Excluded(this.rowData)
 }
  }

  Included(row:any,index){
      if(this.coverList.length!=0){
        let ReqObj = this.coverList;
      let urlLink = `${this.ApiUrl1}master/insertbrokersectioncover`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
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
              //         'Cover Details Inserted Successfully',
              //         'Cover Details',
              //         config);
              this.IncValue="1";
              if(index==this.coverList.length){
                this.select=false;
                this.close();
                this.getBrokerCoverList();
                this.coverList=[];
              }
              
                      //this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails']);
            }
            else if(data.ErrorMessage){
                if(data.ErrorMessage){
                  // for(let entry of data.ErrorMessage){
                  //   let type: NbComponentStatus = 'danger';
                  //   const config = {
                  //     status: type,
                  //     destroyByClick: true,
                  //     duration: 4000,
                  //     hasIcon: true,
                  //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  //     preventDuplicates: false,
                  //   };
                  //   this.toastrService.show(
                  //     entry.Field,
                  //     entry.Message,
                  //     config);
                  // }
                  console.log("Error Iterate",data.ErrorMessage)
                  //this.loginService.errorService(data.ErrorMessage);
                }
              }
  
          },
          (err) => { },
        );
      }
      else{
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
        //   "Please Select Minimum One Cover to Include",
        //   "Add Cover",
        //   config);
      }
  
    }

  Excluded(rowData){
    //let urlLink = `${this.ApiUrl1}master/sectioncover/changestatus`;
     
  }

  onDateFormatInEdit(date) {
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
          // var NewDate = new Date(new Date(format[2], format[1], format[0]));
          // NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2] + '-' + format[1] + '-' + format[0];
          return NewDate;
        }
      }
    }
  }
  

  brokersubmit(entry,index){
    if(this.brokerList.length!=0){
      let ReqObj = entry;
    let urlLink = `${this.ApiUrl1}master/sectioncover/changestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
          if(data.Result){
            this.IncValue="2";
            if(index==this.brokerList.length){
              this.select=false;
              this.close();
              this.getBrokerAllCoverList();
              this.brokerList=[];
            }
            
                    //this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails']);
          }
          else if(data.ErrorMessage){
              if(data.ErrorMessage){
               
                console.log("Error Iterate",data.ErrorMessage)
                //this.loginService.errorService(data.ErrorMessage);
              }
            }

        },
        (err) => { },
      );
    }
    else{
     
    }
  }

  getInc(){
     if(this.IncValue =='1'){
       this.getBrokerCoverList();
     }
     else if(this.IncValue =='2'){
          this.getBrokerAllCoverList();
     }
  }
  getBrokerBranchList(){
    let ReqObj = {
      "LoginId": this.brokerLoginId
    }
    let urlLink = `${this.CommonApiUrl}admin/getallbrokercompanybranch`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let obj = [{BranchCode:"99999",BrokerBranchName:"ALL"}];
          this.branchsData = obj.concat(data?.Result);
          let branchCode= sessionStorage.getItem('BranchCode');
          let Inc =sessionStorage.getItem('IncValue')
          if(branchCode){
            this.branchValue=branchCode;
            this.IncValue=Inc;

            if(Inc == '1'){
              this.getBrokerCoverList();
            }
            else if(Inc == '2'){
              this.getBrokerAllCoverList();
            }
            //this.getBrokerCoverList();
          }
          else {
            this.IncValue=Inc;
               if(Inc =='1'){
                this.branchValue = "99999";
              
                this.getBrokerCoverList();
               }
               else if(Inc == '2'){
                this.branchValue = "99999";
          
                this.getBrokerAllCoverList();
               }
              }
          //this.branchsData = data?.Result;
          //this.getBrokerCoverList();
        }
      },
      (err) => { },
    );

  }
  getProductList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "LoginId": this.brokerLoginId
    }
    let urlLink = `${this.CommonApiUrl}admin/dropdown/brokerproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.productList = data.Result;
            let productValue = sessionStorage.getItem('brokerProductId');
            if(productValue){
              this.productValue = productValue;
              //this.getBrokerBranchList();
              this.onChangeProduct();
            }
            else if(this.sectionList.length!=0){
              this.productValue = this.productList[0].Code;
              //this.getBrokerBranchList();
              this.onChangeProduct();
            }
        }
      },
      (err) => { },
    );
  }
  onChangeProduct(){
    this.sectionValue = null;
    this.sectionList = [];
    this.tableData = [];
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productValue,
      "BranchCode":this.branchValue,
      "AgencyCode":this.AgencyCode
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          sessionStorage.setItem('brokerProductId',this.productValue)
          this.sectionList = data.Result;
          let sectionValue = sessionStorage.getItem('brokerSectionId');

          if(sectionValue){
            this.sectionValue = sectionValue;
            this.getBrokerBranchList();
            //this.getBrokerCoverList();
          }
          else if(this.sectionList.length!=0){
            this.sectionValue = this.sectionList[0].Code;
            this.getBrokerBranchList();

            //this.getBrokerCoverList();
          }
        }

        },
        (err) => { },
      );
  }
  getBrokerCoverList(){
      let ReqObj = {
      "Limit":"",
      "Offset":"100000",
      "InsuranceId": this.insuranceId,
      "SectionId":this.sectionValue,
      "ProductId": this.productValue,
      "BranchCode":this.branchValue,
      "AgencyCode":this.AgencyCode
    }
    let urlLink = `${this.ApiUrl1}master/getallsectionbrokercoverdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            sessionStorage.setItem('brokerSectionId',this.sectionValue)
            sessionStorage.setItem('BranchCode',this.branchValue);
            sessionStorage.setItem('IncValue',this.IncValue)
            //sessionStorage.setItem('companySectionId',this.sectionValue);
            this.tableData = data.Result;
        }
      },
      (err) => { },
    );
  }


  getBrokerAllCoverList(){
    let ReqObj = {
    "Limit":"",
    "Offset":"100000",
    "InsuranceId": this.insuranceId,
    "SectionId":this.sectionValue,
    "ProductId": this.productValue,
    "BranchCode":this.branchValue,
    "AgencyCode":this.AgencyCode
  }
  let urlLink = `${this.ApiUrl1}master/getallsectioncoverbroker`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
          sessionStorage.setItem('brokerSectionId',this.sectionValue)
          sessionStorage.setItem('BranchCode',this.branchValue)
          sessionStorage.setItem('IncValue',this.IncValue)
          //sessionStorage.setItem('companySectionId',this.sectionValue);
          this.tableData = data.Result;
      }
    },
    (err) => { },
  );
}
  onAddNewCover(){
    sessionStorage.removeItem('editBrokerCoverId');
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/newBrokerCoverDetails']);
  }
  onEditCover(rowData){

    let reqobj={
      "CoverId":rowData.CoverId,
      "BranchCode":this.branchValue,
      "AgencyCode":this.AgencyCode
    }
    //sessionStorage.setItem('editBrokerCoverId',);
    //sessionStorage.setItem('BranchCode',this.branchValue);
    sessionStorage.setItem('editBrokerCoverId',JSON.stringify(reqobj));
    sessionStorage.removeItem('companyCoverId');
    sessionStorage.removeItem('SubCoverEdit');
    this.router.navigate(['/Admin/brokersList/newBrokerDetails/newBrokerCoverDetails']);
  }

  onCoverRatingEdit(rowData){
    // this.dialogService.open(NewCoverDetailsComponent, {
    //   context: {
    //     title: 'Cover Details'
    //   },
    // });
   let reqobj={

      "BranchCode":this.branchValue,
      "AgencyCode":this.AgencyCode
    }

    sessionStorage.setItem('companyCoverId',rowData.CoverId);
    sessionStorage.setItem('BranchCode',this.branchValue);
    sessionStorage.setItem('AgencyCode',this.AgencyCode);
    sessionStorage.removeItem('SubCoverEdit');
    sessionStorage.removeItem('editBrokerCoverId');
    //sessionStorage.getItem('editBrokerCoverId');

    this.router.navigate(['/Admin/brokersList/newBrokerDetails/newBrokerCoverDetails'])
  }
  onSubCoverRatingEdit(rowData)
  {
    /*let reqobj={

      "BranchCode":this.branchValue,
      "AgencyCode":this.AgencyCode
    }*/
    console.log("SubCover Edit",rowData)
   sessionStorage.setItem("SubCoverEdit",rowData.CoverId);
   sessionStorage.setItem('BranchCode',this.branchValue);
   sessionStorage.setItem('AgencyCode',this.AgencyCode)
   //sessionStorage.getItem('editBrokerCoverId');
this.router.navigate(['/Admin/brokersList/newBrokerDetails/newBrokerCoverDetails'])

  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Branch') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerBranchList']);
    if(value=='Product') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList']);
    if(value=='Cover') this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerCoverList']);
    if(value=='Deposit') this.router.navigate(['/Admin/brokersList/newBrokerDetails/depositMasterList']);
    if(value=='paymentTypes') this.router.navigate(['/Admin/brokersList/newBrokerDetails/paymentTypesList']);
  }
}
