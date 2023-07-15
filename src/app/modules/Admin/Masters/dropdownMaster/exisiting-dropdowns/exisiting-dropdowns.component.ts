import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-exisiting-dropdowns',
  templateUrl: './exisiting-dropdowns.component.html',
  styleUrls: ['./exisiting-dropdowns.component.scss']
})
export class ExisitingDropdownsComponent implements OnInit {

  public activeMenu:any='Dropdown';filterValue:any;@Input() DropdownId  :any;
  insuranceName: string;regionValue:any="";
  dropdownData:any[]=[];dropdownHeader:any[]=[];
  public AppConfig:any =(Mydatas as any).default;
  public CommonApiUrl1:any = this.AppConfig.CommonApiUrl;
  public ApiUrl1:any = this.AppConfig.ApiUrl1;tableList:any;
  TypeList:any[]=[];TypeValue:any;
  insuranceList: { InsuranceId: string; CompanyName: string; }[];


  public branchList:any;branchValue:any;BranchCode:any;insuranceId:any;
  userDetails: any;

  constructor(private router:Router ,private sharedService:SharedService,) {
    this.insuranceName = sessionStorage.getItem('insuranceName');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    // this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
// this.getBranchList()
   }

  ngOnInit(): void {
    sessionStorage.removeItem("ItemId")
    this.dropdownHeader = [
      { key: 'ItemValue', display: 'Description' },
      { key: 'ItemCode', display: 'Code' },
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
    this.getCompanyList();
    //this.getBranchList();
    //this.getList();

  }

  // getBranchList(){
  //   let ReqObj = {
  //     "InsuranceId": this.insuranceId
  // }
  //   let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
  // this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  //   (data: any) => {
  //     if(data.Result){
  //       let obj = [{Code:"99999",CodeDesc:"ALL"}];
  //       this.branchList = obj.concat(data?.Result);
  //       let docObj = JSON.parse(sessionStorage.getItem('CategoryId'))
  //       if(docObj){
  //         this.branchValue = docObj?.BranchCode;

  //       }
  //       else{
  //         this.branchValue="99999";


  //       }

  //       //if(!this.branchValue){ this.branchValue = "99999"; this.getCompanyProductList() }
  //     }
  //   },
  //   (err) => { },
  // );
  // }


  /*getBranchList(){
    let ReqObj = {
      "InsuranceId":'100002',
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        if(!this.BranchCode){ this.BranchCode = "99999"; this.getExistingDropdown() }
      }
    },
    (err) => { },
  );
  }*/
  getCompanyList(){
    let ReqObj = {
      "BrokerCompanyYn":"N",
      "Limit":"0",
      "Offset":""
    }
    let urlLink = `${this.ApiUrl1}master/getallinscompanydetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultObj = [{"InsuranceId":"99999","CompanyName":"ALL"}]
          this.insuranceList = defaultObj.concat(data.Result);
          if(this.insuranceId){this.getList('direct');}
        }
  
      },
      (err) => { },
    );
  }
  getList(type){
    if(type=='change'){this.dropdownData=[];}
    let ReqObj ={
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/lovlist`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.TypeList = data?.Result;
        let docObj = JSON.parse(sessionStorage.getItem('addDocDetailsObj'));
        console.log('IIIIIIIIIIII',docObj)
        if(docObj){
          console.log('iiiiiiiii',this.TypeValue)
          this.TypeValue = docObj?.ItemType;
          this.getExistingDropdown();
       }
        else{
          this.TypeValue="--Select--"
          this.getExistingDropdown();
        }
        //if(!this.branchValue){ this.branchValue = "99999"; this.getCompanyProductList() }
      }
    },
    (err) => { },
  );
  }

  getExistingDropdown(){
    let ReqObj = {
      // "BranchCode":this.branchValue,
      "InsuranceId": this.insuranceId,
      "ItemType": this.TypeValue
    }
    let urlLink = `${this.CommonApiUrl1}master/getalllovdetails
    `;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.dropdownData = data?.Result;
            console.log('KKKKKKKKKKKK',this.dropdownData)
            if(this.TypeValue!=undefined && this.TypeValue!=null){
              let docObj = {"ItemType":this.TypeValue,"insuranceid":this.insuranceId};
              sessionStorage.setItem('addDocDetailsObj',JSON.stringify(docObj));
            }
        }
      },
      (err) => { },
    );
  }

  onAddDropdowns(){

      /*"ItemId": null,
      "BranchCode": this.branchValue*/
      let ReqObj = {
        "BranchCode":"99999",
        "ItemId": null,
        "ItemCode":null,
        "ItemType": this.TypeValue,
        "InsuranceId":this.insuranceId
      }
      console.log("Edit Req Obj",event);
      sessionStorage.setItem('ItemId', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/dropdownMaster/newDropdownDetails'])
  }
  onEditDrop(event){
    let ReqObj = {
      "BranchCode": "99999",
      "ItemCode": event.ItemCode,
      "ItemType": this.TypeValue,
      "ItemId":event.ItemId,
      "InsuranceId":this.insuranceId
    }
    console.log("Edit Req Obj",event);
    sessionStorage.setItem('ItemId', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/dropdownMaster/newDropdownDetails'])
  }
  EditStatus(event){
    let ReqObj = {
      "ItemId":event.DropdownId,
      "InsuranceId":"1000002",
      "BranchCode":this.branchValue,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangedEffectiveDate
    }
    let urlLink = `${this.CommonApiUrl1}api/constanttabledetails/changestatus`;
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
                window.location.reload()
        }
      },
      (err) => { },
    );
  }
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure'])
    if(value=='Dropdown') this.router.navigate(['/Admin/companyList/companyConfigure/existingDropdowns'])
    if(value=='Occupation') this.router.navigate(['/Admin/companyList/companyConfigure/existingOccupations'])
    if(value=='Branch') this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
    if(value=='Region') this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
    if(value=='State') this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
    if(value=='City') this.router.navigate(['/Admin/companyList/companyConfigure/cityList'])
  }

}

