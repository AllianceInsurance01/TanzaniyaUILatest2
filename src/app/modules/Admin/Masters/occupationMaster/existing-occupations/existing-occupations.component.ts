import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-existing-occupations',
  templateUrl: './existing-occupations.component.html',
  styleUrls: ['./existing-occupations.component.scss']
})
export class ExistingOccupationsComponent implements OnInit {

  public activeMenu:any='Occupation';filterValue:any;productId:any;
  insuranceName: string;regionValue:any="";insuranceId:any;
  occupationData:any[]=[];occupationHeader:any[]=[];
  productList:any[]=[];
  productValue:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchList: any[]=[];branchValue:any;userDetails:any;
  pro: any;
  insuranceList: { InsuranceId: string; CompanyName: string; }[];
  constructor(private router:Router,private sharedService: SharedService) {

     //this.productId =  sessionStorage.getItem('companyProductId');
     //this.productId = sessionStorage.getItem('productId');
     //this.productId =  sessionStorage.getItem('brokerProductId');


    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));

    const user = this.userDetails?.Result;
    this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    console.log('PPPPPPPPPPPP',this.productId);
    let docObj = JSON.parse(sessionStorage.getItem('addDetails'))
    if(docObj){ this.branchValue = docObj?.branch;this.insuranceId=docObj?.InsuranceId}
    this.getCompanyList();
   }

  ngOnInit(): void {
    this.occupationHeader = [
      { key: 'OccupationName', display: 'Occupation Name' },
      { key: 'CoreAppCode', display: 'CoreAppCode' },
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
   

    console.log('PPPPPPPPPPPP',this.productId);
  }
  EditStatus(event){
    let ReqObj = {
      "OccupationId":event.OccupationId,
      "Status": event.ChangedStatus,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchValue,
      "ProductId":this.productId,
      //"EffectiveDateStart":event.ChangedEffectiveDate,
    }
    let urlLink = `${this.CommonApiUrl}master/occupation/changestatus`;
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
          if(this.insuranceId){this.getBranchList('direct');}
        }
  
      },
      (err) => { },
    );
  }
  getBranchList(type){
    if(type=='change'){this.branchValue=null;this.productValue=null;}
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        //this.getProductList()
        //if(!this.branchValue){ this.branchValue = "99999"; this.getExistingOccupations()
       //}
       let docObj = JSON.parse(sessionStorage.getItem('addDetails'))
       if(docObj){ this.branchValue = docObj?.branch;
        
         this.getProductList();}
       else{ this.branchValue='99999';
       console.log('hhhhhhhh',this.branchValue);
        this.getProductList();}
      }
    },
    (err) => { },
  );
  }

  getProductList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/companyproducts`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        //this.productList = data?.Result;
          let obj = [{Code:"99999",CodeDesc:"ALL"}]
          this.productList = obj.concat(data?.Result);

          let docObj = JSON.parse(sessionStorage.getItem('addDetails'))
        if(docObj){ this.productValue = docObj?.CodeDesc;
          console.log('LLLLLLLLLL',this.productValue);
          this.getExistingOccupations();}
        else{ this.productValue="99999"; this.getExistingOccupations();}
          //if(!this.productValue){ this.productValue = "14"; this.getExistingOccupations()}
          //this.getExistingOccupations();
          /*let docObj = JSON.parse(sessionStorage.getItem('addDocDetails'))
          if(docObj){ this.productValue = docObj?.Section;
            console.log('LLLLLLLLLL',this.productValue);
            this.getExistingOccupations();}
          else{ this.productValue='14'; this.getExistingOccupations(); }*/


          /*let pro =sessionStorage.getItem('produ');
          //this.getExistingOccupations();
          //sessionStorage.setItem('product',this.productValue);
          if (!this.productValue) { this.productValue=pro;
            this.getExistingOccupations();
         }*/



      }
    },
    (err) => { },
  );
  }

  /*getCategoryList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode":this.branchValue
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/categoryid`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){

        this.productList=data.Result;
      }
    },

    (err) => { },
  );
  }*/

  getExistingOccupations(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchValue,
      "ProductId": this.productValue,


    }
    let urlLink = `${this.CommonApiUrl}master/getalloccupation`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.occupationData = data?.Result;
            if(this.productValue!=undefined && this.productValue!=null){

              let docObj = {"CodeDesc":this.productValue,"branch":this.branchValue,"InsuranceId":this.insuranceId};
              sessionStorage.setItem('addDetails',JSON.stringify(docObj));
             }
            //this.getProductList()
        }
      },
      (err) => { },
    );
  }

  onAddOccupations(){
    let entry = {
      "OccupationId" : null,
      "BranchCode" : this.branchValue,
      "ProductId":this.productValue,"InsuranceId":this.insuranceId
    }
    sessionStorage.setItem('editOccupationId',JSON.stringify(entry));
    //sessionStorage.removeItem('editOccupationId');
    this.router.navigate(['/Admin/occupationMaster/updateOccupationDetails'])
  }
  onEditOccupation(event){
    let entry = {
      "OccupationId" : event.OccupationId,
      "BranchCode" : event.BranchCode,
      "ProductId":event.ProductId,"InsuranceId":this.insuranceId
    }
    sessionStorage.setItem('editOccupationId',JSON.stringify(entry));
    sessionStorage.setItem('produc',event.ProductId)
    this.router.navigate(['/Admin/occupationMaster/updateOccupationDetails'])
  }
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure'])
    if(value=='Dropdown') this.router.navigate(['/Admin/companyList/companyConfigure/existingDropdowns'])
    if(value=='Occupation') this.router.navigate(['/Admin/companyList/companyConfigure/existingOccupations'])
    if(value=='Branch') this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
    if(value=='Region') this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
    if(value=='State') this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
    if(value=='City') this.router.navigate(['/Admin/companyList/companyConfigure/cityList']);
    if(value=='Currency') this.router.navigate(['/Admin/companyList/companyConfigure/currencyList']);
    if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
  }
}
