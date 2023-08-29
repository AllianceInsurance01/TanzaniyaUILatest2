import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var $:any;

@Component({
  selector: 'app-underwriter',
  templateUrl: './underwriter.component.html',
  styleUrls: ['./underwriter.component.scss']
})
export class UnderWriterComponent implements OnInit {

  activeMenu:any="Product";
  productList:any[]=[];
  productId:any;
  productData:any[]=[];productHeader:any[]=[];
  productData1:any []=[];
  userLoginId: any;insuranceId: any;userId: any;
  public columnHeader: any[] = [];
  public columnHeader1: any[] = [];
  brokerCompanyYN: any;BrokerCode:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  closeResult: string;
    userDetails: any;
    NewList: any[]=[];
    p:any=1;
  requestref: any;
  constructor(private router:Router,private sharedService:SharedService,private modalService: NgbModal) {
    // let userObj = JSON.parse(sessionStorage.getItem('userEditDetails'));
    // if(userObj){
    //   if(userObj.loginId) this.userLoginId = userObj.loginId;
    //   if(userObj.BrokerId) this.BrokerCode = userObj.BrokerId;
    //   console.log('Product loginid',this.userLoginId)
    //   if(userObj.InsuranceId) this.insuranceId = userObj.InsuranceId;
    //   console.log('Product insuranceId',this.insuranceId)
    //   if(userObj.userId) this.userId = userObj.userId;
    // }
    this.userId = this.userLoginId;
   

    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    console.log('UUUUUUUUUUUUUUU',this.insuranceId);

    if(this.insuranceId){
      this.getProductList();
    }
    //this.getUserProductList();
  }

  ngOnInit(): void {
    // this.columnHeader = [
    //   {
    //     key: 'UnderWriterLoginId',
    //     display: 'Select',
    //     config: {
    //       isChecked: true,
    //       model:'isChecked'
    //     },
    //   },
    //   { key: 'RequestReferenceNo', display: 'Request ReferenceNo' },
    //   // { key: 'UnderWriterLoginId', display: 'UW LoginId' },
    //   { key: 'Status', display: 'Status' },
    //   { key: 'EntryDate', display: 'EntryDate' },
  
    // ];
    this.columnHeader1 = [
      { key: 'RequestReferenceNo', display: 'Request ReferenceNo' },
      { key: 'ClientName', display: 'Client Name' },
      { key :'BranchName',display:'Branch Name'},
      { key: 'Status', display: 'Status' },
      { key: 'PolicyStartDate', display: 'PolicyStartDate' },
      { key: 'EntryDate', display: 'EntryDate' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
  
    ];
  }
  getProductList(){
    console.log('KKKKKKKKKKKK',this.insuranceId);
    let ReqObj = {
      "InsuranceId": this.insuranceId,
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/companyproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.productList = data.Result;
        }
      },
      (err) => { },
    );
    // let urlLink = `${this.ApiUrl1}master/dropdown/product`;
    // this.sharedService.onGetMethodSync(urlLink).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     if(data.Result){
    //       this.productList = data.Result;
    //     }

    //   },
    //   (err) => { },
    // );
  }
  getUserProductList(){
    this.productData = [];
    console.log('KKKKKKKKKKKK',this.insuranceId);
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": "",
      "ProductId":this.productId,
      "Limit": "0",
      "Offset": "100000"
    }
    let urlLink = `${this.CommonApiUrl}api/superadminreferralpending`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
       
          this.productData = data.Result.PendingGrid;
          console.log('PPPPPPPPPPPPPPPPPP',this.productData);
        }

      },
      (err) => { },
    );
  }

//   onConfigure(event:any){
//     sessionStorage.setItem('productuser',this.insuranceId);
//     sessionStorage.setItem('userproduct',event.ProductId);
//     sessionStorage.setItem('loginUser',this.userLoginId);
//    this.router.navigate(['Admin/userList/EndrosementUser']);
//   }
//   onAddNewProduct(){
//     let entry = {
//       "BrokerId":this.BrokerCode,
//       "InsuranceId": this.insuranceId,
//       "loginId": this.userLoginId,
//       "UserId":this.userId,
//       "ProductId": null
//   }
//   sessionStorage.setItem('userEditDetails',JSON.stringify(entry));
//     this.router.navigate(['/Admin/userList/newUserproductDetails'])
//   }
//   onRedirect(value){
//     this.activeMenu = value;
//     if(this.activeMenu=='Branch') this.router.navigate(['/Admin/userList/userBranchDetails']);
//     if(value=='Product') this.router.navigate(['/Admin/userList/UserproductList']);
//     if(value=='Cover') this.router.navigate(['/Admin/userList/userCoverList']);
//   }
//   onEditProduct(rowData){
//     let entry = {
//       "BrokerId":this.BrokerCode,
//       "InsuranceId": this.insuranceId,
//       "loginId": this.userLoginId,
//       "UserId":this.userId,
//       "ProductId": rowData.ProductId
//   }
//   sessionStorage.setItem('userEditDetails',JSON.stringify(entry));
//     this.router.navigate(['/Admin/userList/newProductDetails'])
//   }

EditStatus(rowData,modal){
  this.productData1=[];
let ReqObj={
    "RequestReferenceNo":rowData.RequestReferenceNo,
    "InsuranceId":this.insuranceId,
    "BranchCode":rowData.BranchCode,
    "ProductId": rowData.ProductId,
    "Limit": "0",
    "Offset": "200"
}
let urlLink = `${this.CommonApiUrl}api/uwpendinggrid`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    if(data.Result){
      this.productData1 = data.Result?.PendingList;
      this.requestref = data.Result?.PendingList[0].RequestReferenceNo;
      console.log('NNNNNNNNNNN',this.productData1);
      this.open(modal);
    }

  },
  (err) => { },
);
}
onViews(rowData){

}
onEditSection(rowData){

}

open(content) {
  this.modalService.open(content, { size: 'lg', backdrop: 'static',ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

submitForm(modal){

  let i=0; let req:any=[];
        let selectedList = this.productData1.filter(ele=>ele.UWStatus=='Y');
        for(let entry of selectedList){
          // let SumInsured =0;
          // if(entry.SumInsuredEnd.includes(',')){ SumInsured = entry.SumInsuredEnd.replace(/,/g, '') }
          // else SumInsured = entry.SumInsuredEnd;
          // let effectiveDate = this.datePipe.transform(entry.EffectiveDate, "dd/MM/yyyy");
          let Obj =  {
            "RequestReferenceNo":entry.RequestReferenceNo,
      "InsuranceId":this.insuranceId,
      "BranchCode": entry.BranchCode,
      "ProductId": entry.ProductId,
      "LoginId": entry.UnderWriterLoginId,
      "UWStatus": entry.UWStatus
          }
          req.push(Obj);
          i+=1;
          if(i==selectedList.length) this.finalProceed(req,modal);
        }
  // modal.dismiss('Cross click');
  // $('#mymodalEdit').modal('hide');
}
onSelectCustomer(rowData,event,i){
  console.log('HHHHHHHHHH',rowData,event,i)
  if(event){
      rowData.UWStatus = 'Y';
      //rowData.Checked = true;
  }
  else{
      rowData.UWStatus = 'N';
  }
//   this.NewList=[];
//   if(event){
//     let entry =  {
//       "RequestReferenceNo":rowData.RequestReferenceNo,
//       "InsuranceId":this.insuranceId,
//       "BranchCode": rowData.BranchCode,
//       "ProductId": rowData.ProductId,
//       "LoginId": rowData.UnderWriterLoginId,
//       "UWStatus":rowData.UWStatus
//     }
//     this.NewList.push(entry);
// }
// else{
//   let index = this.NewList.findIndex(ele=>ele==rowData.ProductId);
//   this.NewList.splice(index,1);
// }
console.log("Product List",this.productList);
}

onCheckEndorseSelect(rowData){
  return rowData.UWStatus=='Y';
}

finalProceed(req,modal){
  let urlLink = `${this.CommonApiUrl}api/updateuwreferraldetails`;
  this.sharedService.onPostMethodSync(urlLink, req).subscribe(
    (data: any) => {
      if (data.Result) {
        console.log('KKKKKKKK')
        modal.dismiss('Cross click');
  $('#mymodalEdit').modal('hide');
      }
    },
    (err) => { },
  );
}
}
