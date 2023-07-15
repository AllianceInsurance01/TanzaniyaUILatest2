import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-warranty-list',
  templateUrl: './warranty-list.component.html',
  styleUrls: ['./warranty-list.component.scss']
})
export class WarrantyListComponent implements OnInit {


  tableData: any[] = [];
  insuranceName: any; activeMenu = "War Rate";
  public columnHeader: any[] = [];
  public AppConfig: any = (Mydatas as any).default;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public BodyTypeId: any;
  public insuranceId: any;
  BranchDetails: any = {}; WarrantyDetails: any;
  public branchList: any; branchValue: any;
  public WarrantyData: any;
  productList: any;
  productId: any; sectionYn: any = "N";
  productValue: any;
  userDetails: any; sectionValue:any;
  sectionList: any[];
  insuranceList: { InsuranceId: string; CompanyName: string; }[];
  constructor(private router: Router, private sharedService: SharedService) {
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (userDetails) {

      // this.insuranceId = userDetails?.Result?.InsuranceId;
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      // this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    }
  }

  ngOnInit(): void {


    this.columnHeader = [
      { key: 'WarrantyDescription', display: 'Warranty Description' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'EffectiveDateStart', display: 'Effective Date Start' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];


    let obj =  JSON.parse(sessionStorage.getItem('WarrantyId'));
    console.log('KKKKKKKKKKKK',obj)
    if(obj){
      this.branchValue=obj.BranchCode
      this.productValue=obj.ProductId
      this.sectionValue=obj.SectionId
      this.insuranceId=obj.InsuranceId
      if(this.sectionValue=='99999'){
        this.sectionYn='N'
      }
      else{
        this.sectionYn='Y'
      }
    }
    this.getCompanyList();
    //sessionStorage.removeItem('WarrantyId')

    // this.getBranchList();
    // this.getCompanyProductList();

  }
  getBranchList(type) {
    if(type=='change'){this.WarrantyData=[];this.branchValue=null;this.productValue=null;this.sectionYn='N';this.sectionValue=null;}
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {

          let obj = [{ Code: "99999", CodeDesc: "ALL" }];
          this.branchList = obj.concat(data?.Result);
          if (!this.branchValue) { this.branchValue = "99999";this.getCompanyProductList('change')}
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
          if(this.insuranceId){this.getBranchList('direct'); this.getCompanyProductList('direct');}
        }
  
      },
      (err) => { },
    );
  }
  getCompanyProductList(type) {
    if(type=='change'){this.WarrantyData=[];this.productValue=null;this.sectionYn='N';this.sectionValue=null;}
    let ReqObj = {
      "InsuranceId": this.insuranceId,

    }
    let urlLink = `${this.ApiUrl1}master/getallcompanyproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.productList = data?.Result;
          let obj = []
          this.productList = obj.concat(data?.Result)

          let docObj = JSON.parse(sessionStorage.getItem('WarrantyId'))
          if(docObj){ this.sectionValue = docObj?.SectionId;
            this.productValue = docObj?.ProductId;
            console.log('LLLLLLLLLL',this.sectionValue);
            this.getSectionList(); this.getExistingWarranty() }
          else{ this.productValue=''; this.getSectionList(); this.getExistingWarranty() }


          /*if (!this.productValue) { this.productValue = "5";
          this.getSectionList(); this.getExistingWarranty()}*/
        }

      },
      (err) => { },
    );
  }
  EditStatus(event) {
    let ReqObj = {
      "WarrantyId": event.WarrantyId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchValue,
      "ProductId": this.productValue,
      "SectionId": this.sectionValue,
      "Status": event.ChangedStatus,
      "EffectiveDateStart": event.ChangedEffectiveDate
    }
    let urlLink = `${this.CommonApiUrl1}master/warranty/changestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (data.Result) {
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
          //   'Status Changed Successfully',
          //   'Status Updated',
          //   config);
          window.location.reload()
        }
      },
      (err) => { },
    );
  }
  onAddSection() {
    let ReqObj = {
      "WarrantyId": null,
      "BranchCode": this.branchValue,
      "ProductId": this.productValue,
      "SectionId": this.sectionValue,
      "InsuranceId": this.insuranceId,
    }
    sessionStorage.setItem('WarrantyId', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/warrantyMaster/newWarrantyDetails'])

  }
  getExistingWarranty() {

    if(this.sectionYn=='N'){
      //this.productValue="99999";
      this.sectionValue="99999"
    }

    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchValue,
      "ProductId": this.productValue,
      "SectionId": this.sectionValue,

    }
    let urlLink = `${this.CommonApiUrl1}master/getallwarranty`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.WarrantyData = data?.Result;

          if(this.sectionValue!=undefined && this.sectionValue!=null){
            let docObj = {"Section":this.sectionValue,"Product": this.productValue,"Insuranceid":this.insuranceId};
            sessionStorage.setItem('addDocDetailsObj',JSON.stringify(docObj));
          }
        }
      },
      (err) => { },
    );
  }
  public onEditSection(event) {


    let ReqObj = {
      "WarrantyId": event.WarrantyId,
      "BranchCode": this.branchValue,
      "ProductId": this.productValue,
      "SectionId": this.sectionValue,
      "InsuranceId": this.insuranceId,
    }
    sessionStorage.setItem('WarrantyId', JSON.stringify(ReqObj));
    this.router.navigateByUrl('/Admin/warrantyMaster/newWarrantyDetails');
  }
  onChangeSectionYn() {
    if (this.sectionYn != 'Y') {
      this.sectionValue = '99999';
    }
    else {
      this.sectionValue = null;
      this.WarrantyData = [];
    }
  }
  getSectionList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productValue,
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [];
          this.sectionList = obj.concat(data?.Result);
          //let secObj = JSON.parse(sessionStorage.getItem('WarrantyId'))
          let secObj = JSON.parse(sessionStorage.getItem('WarrantyId'))
          if (secObj) {
            this.sectionValue = secObj?.SectionId;

          }
          else{
            this.sectionValue = '99999';
          }

          //this.getExistingWarranty()
        }
      },
      (err) => { },
    );
  }
  /*onAddSectionList(event) {
    let ReqObj = {
      "WarrantyId": null,
      "BranchCode": this.branchValue,
      "ProductId": this.productValue,
      "SectionId": this.sectionValue
    }
    sessionStorage.setItem('ValueGet', JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/warrantyMaster/addWarrantyDetails']);
  }*/
}
