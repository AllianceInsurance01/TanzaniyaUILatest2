import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../../../app-config.json';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-plan-type-benefits-list',
  templateUrl: './plan-type-benefits-list.component.html',
  styleUrls: ['./plan-type-benefits-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PlanTypeBenefitsListComponent {
  insuranceName: any=null;
  insuranceId: any=null;
  productId: any=null;coverSection:boolean=true;
  loginId: any=null;countryList:any[]=[];planTypeList:any[]=[];
  public activeMenu:any='PlanType';planTypeValue:any=null;
  sectionList:any[]=[];sectionValue:any=null;countryValue:any=null;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl:any= this.AppConfig.CommonApiUrl;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  benefitsList: any[]=[];coverName:any=null;excessLimits:any=null;
  columnHeader: any[]=[];currencyValue:any=null;excessValue:any='0';
  innerColumnHeader: any[]=[];coverEffectiveDate:any=null
  dataSource: any;statusValue:any='Y';
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;
  @ViewChild(MatPaginator) private paginator2!: MatPaginator;
  @ViewChild('myModalClose') myModalClose: ElementRef
  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';
  filterValue: any = '';filterValue2: any = '';
  public selectedData:any;
  expandedSymbol: string = null;
  selectedIndex: any=null;
  minus: boolean;
  closeResult: string;
  dataSource2: any;
  statusList: any[]=[];Remarks:any=null;
  minDate: Date;EffectiveDateStart:any;
  policyTypeDesc: any;
  planTypeDesc: any;
  totalQuoteRecords: number;
  pageCount: number;
  quotePageNo: number;
  startIndex: any;
  endIndex: any;
  limit: any=0;
  innerTableData: any[]=[];
  selectedCoverId: any=null;
  selectedSubCoverId: any=null;
  subCoverName: any=null;
  subCoverStatus: any='Y';
  subCoverNameError: boolean;
  currencyError: boolean;
  excessError: boolean;
  limitsError: boolean;
  coverStatusValue: any;
  constructor(private router:Router,private sharedService: SharedService,private datePipe:DatePipe,private modalService: NgbModal,) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.minDate = new Date();
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
   this.statusList = [
    {"Code":"Y","CodeDesc":"Active"},
    {"Code":"N","CodeDesc":"DeActive"},
   ]
    this.getPlanTypeList();
    
  }
  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.benefitsList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.applyFilter(this.filterValue);
    this.applyFilter2(this.filterValue2);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue?.trim().toLowerCase();
  }
  applyFilter2(filterValue: string) {
    this.dataSource2.filter = filterValue?.trim().toLowerCase();
  }
  get keys() {
    return this.columnHeader.map(({ key }) => key);
  }
  get subKeys() {
    return this.innerColumnHeader.map(({ key }) => key);
  }
  
  ngOnInit(){
    this.columnHeader =  [
      
      { key: 'CoverDesc', display: 'Cover Name' },
      { key: 'EffectiveDate',display: 'Effective Date' },
      {
        key: 'CoverStatus',
        display: 'Status',
        
      },
      {
        key: 'edit',
        display: 'SubCovers',
        sticky: false,
        config: {
          isCollapse: true,
          isCollapseName:'View'
        },
      },
      {
        key: 'add',
        display: 'Action',
        config: {
          isEdit:true,
          //isDelete: true
        }
      },
    ];

    this.innerColumnHeader =  [
      { key: 'SubCoverDesc', display: 'SubCover Name' },
      { key: 'Currency', display: 'Currency' },
      { key: 'SumInsured', display: 'Limits' },
      { key: 'ExcessAmt', display: 'Excess' },
      {
        key: 'Status',
        display: 'Status',
        
      },
      {
        key: 'add',
        display: 'Action',
        config: {
          isSubCoverEdit:true,
         // isDelete: true,
        }
      },

    ];
  }
  onDeleteCoverRow(rowData){
    // this.benefitsList.splice(index,1);
    // this.dataSource = new MatTableDataSource(this.benefitsList);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
  }
  onSubCoverEdit(rowData,modal){
    this.subCoverNameError = false;this.currencyError=false;this.excessError = false;this.limitsError = false;
      if(this.selectedCoverId!=null){
          if(rowData==null){
            this.selectedSubCoverId = null;
            this.subCoverName = rowData?.SubCoverDesc;
            this.excessValue = rowData?.ExcessAmt;
            this.excessLimits = rowData?.SumInsured;
            this.subCoverStatus = rowData?.Status;
            this.currencyValue = rowData?.Currency;
          }
          else{
            this.selectedSubCoverId = rowData?.SubCoverId;
            this.subCoverName = rowData?.SubCoverDesc;
            this.excessValue = rowData?.ExcessAmt;
            this.excessLimits = rowData?.SumInsured;
            this.subCoverStatus = rowData?.Status;
            this.currencyValue = rowData?.Currency;
          }
          this.open(modal)
      }
      
  }
  onDeleteSubCoverRow(coverIndex,subCoverIndex){
    let subCoverDetails = this.benefitsList[this.selectedIndex].SubCoverDetails;
    subCoverDetails.splice(subCoverIndex,1);
    this.dataSource2 = new MatTableDataSource(subCoverDetails);
    this.dataSource2.sort = this.sort;
    this.dataSource2.paginator = this.paginator;
  }
  onSaveSubCoverDetails(modal){
    let effectiveDate = null;
    this.subCoverNameError = false;this.currencyError=false;this.excessError = false;this.limitsError = false;
    if(this.subCoverName==null || this.subCoverName=='') this.subCoverNameError = true;
    if(this.currencyValue==null || this.currencyValue=='') this.currencyError = true;
    if(this.excessValue==null || this.excessValue=='') this.excessError = true;
    if(this.excessLimits==null || this.excessLimits=='') this.limitsError = true;
    if(!this.subCoverNameError && !this.currencyError && !this.excessError && !this.limitsError){
      let sectionDesc=null,planTypeDesc = null;
      if(this.subCoverStatus==undefined || this.subCoverStatus==null) this.subCoverStatus = 'Y';
      if(this.planTypeDesc!=undefined && this.planTypeDesc!=null){
        sectionDesc = this.policyTypeDesc;planTypeDesc=this.planTypeDesc;
      }
      if(this.coverEffectiveDate!=undefined && this.coverEffectiveDate!=null) effectiveDate = this.datePipe.transform(this.coverEffectiveDate, "dd/MM/yyyy");
      let ReqObj={
        "BranchCode": "99999",
        "CoverDesc": this.coverName,
        "CreatedBy": this.loginId,
        "CoverStatus": this.coverStatusValue,
        "CoverId": this.selectedCoverId,
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "Currency": this.currencyValue,
        "ExcessAmt": this.excessValue,
        "Status": this.subCoverStatus,
        "SubCoverDesc": this.subCoverName,
        "SubCoverId": this.selectedSubCoverId,
        "SumInsured": this.excessLimits,
        "EffectiveDateStart": effectiveDate,
        "PlanTypeDesc": planTypeDesc,
        "PlanTypeId": this.planTypeValue,
        "PolicyTypeDesc": sectionDesc,
        "PolicyTypeId": this.sectionValue,
        "Remarks": this.Remarks,
      }
      let urlLink = `${this.ApiUrl1}master/insertpolicytypesubcover`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.ErrorMessage.length!=0){

            }
            else{
              modal.dismiss('Cross click');
              let element = {
                "CoverId":this.selectedCoverId,
                "Remarks": this.Remarks,
                "CoverDesc": this.coverName,
                "CoverStatus": this.coverStatusValue,
                "EffectiveDateStart": effectiveDate
              }
              this.onInnerData(element)
            }
        },
        (err) => { },
      );
    }
  }
  getPlanTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let obj = [{ Code: "", CodeDesc: "--SELECT--" }];
        this.sectionList = obj.concat(data?.Result);
        this.sectionValue = '';
        let details = JSON.parse(sessionStorage.getItem('planBenefitsObj'));
        if(details){
          this.planTypeValue = details?.planTypeId;
          this.sectionValue = details?.policyTypeId;
          if(this.planTypeValue!=null && this.planTypeValue!='') this.getPlanList();
          else this.planTypeValue = '';
        }
        else this.planTypeValue = '';
        //this.typeList = data.Result;
      },
      (err) => { },
    );
  }
  createCover(element,modal){
    if(element==null){
      this.selectedCoverId = null;
      this.coverName = null;
      this.EffectiveDateStart = null;
      this.coverEffectiveDate = null;
      this.Remarks = null;
      this.coverStatusValue = 'Y';
      this.open(modal)
    }
    else{
      this.selectedCoverId = element?.CoverId;
      this.Remarks = element?.Remarks;
      this.coverStatusValue = element?.CoverStatus;
      this.coverName = element?.CoverDesc;
      if(element?.EffectiveDateStart!=null && element?.EffectiveDateStart!=''){ this.coverEffectiveDate = this.onDateFormatInEdit(element?.EffectiveDateStart); }
      this.open(modal)
    }
  }
  getPlanList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "BranchCode": "99999",
      "SectionId": this.sectionValue,
      "LoginId": this.loginId
    }
    let urlLink = `${this.CommonApiUrl}dropdown/plantype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let obj = [{ Code: "", CodeDesc: "--SELECT--" }];
        this.policyTypeDesc = (this.sectionList.find(ele=>ele.Code==this.sectionValue))?.CodeDesc
        this.planTypeList = obj.concat(data?.Result);
        if(this.planTypeValue!=null && this.planTypeValue!=''){
          this.getBenefitsList(null,'change');
        }
        else this.planTypeValue = '';
        //this.typeList = data.Result;
      },
      (err) => { },
    );
  }
  getBenefitsList(element,entryType){
    this.planTypeDesc = (this.planTypeList.find(ele=>ele.Code==this.planTypeValue))?.CodeDesc
    
    this.benefitsList = [];
      let ReqObj = {
        "PlanTypeId": this.planTypeValue,
        "PolicyTypeId": this.sectionValue,
        "CompanyId": this.insuranceId,
        "ProductId": this.productId,
        "BranchCode":"99999",
        "Status":"",
        "Limit":this.limit,
        "Offset": 60
      }
      let urlLink = `${this.ApiUrl1}TravelPolicyType/getalltravelpolicytype`;
     //let urlLink = `${this.ApiUrl1}TravelPolicyType/getalltravelpolicytype`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result.TravelPolicyType.length!=0){
            this.planTypeDesc = data?.Result?.TravelPolicyType[0].PlanTypeDesc;
            this.policyTypeDesc = data?.Result?.TravelPolicyType[0].PolicyTypeDesc;
            let obj = {
              "planTypeId":this.planTypeValue,
              "policyTypeId": this.sectionValue
            }
            sessionStorage.setItem('planBenefitsObj',JSON.stringify(obj))
            this.totalQuoteRecords = data.Result?.TotalCount;
            this.pageCount = 10;
            if (entryType == 'change') {
              this.quotePageNo = 1;
              let startCount = 1, endCount = this.pageCount;
              startCount = endCount + 1;
                let quoteData = data.Result.TravelPolicyType;
                this.benefitsList = data.Result.TravelPolicyType;
                if (quoteData.length <= this.pageCount) {
                  endCount = quoteData.length
                }
                else endCount = this.pageCount;
              
              this.startIndex = startCount; this.endIndex = endCount;
            }
            else {

              let startCount = element.startCount, endCount = element.endCount;
              this.pageCount = element.n;
              startCount = endCount + 1;
                this.benefitsList = data.Result.TravelPolicyType;
                //this.quoteData = this.quoteData.concat(data.Result?.CustomerDetails);
              if (this.totalQuoteRecords <= endCount + (element.n)) {
                endCount = this.totalQuoteRecords
              }
              else endCount = endCount + (element.n);
              this.startIndex = startCount; this.endIndex = endCount;
            }
           
           
           
            // this.dataSource = new MatTableDataSource(this.benefitsList);
            // this.dataSource.sort = this.sort;
            // this.dataSource.paginator = this.paginator;
          }
          else{this.benefitsList=[]}
        },
        (err) => { },
      );
  }
  onNextData(element){
    this.limit = String(Number(this.limit)+1);
    this.quotePageNo = this.quotePageNo+1;
    this.startIndex = element.startCount;
    this.endIndex = element.endCount
    this.getBenefitsList(element,'direct');
  }
  onPreviousData(element){
    this.limit = String(Number(this.limit)-1);
      this.quotePageNo = this.quotePageNo-1;
    this.getBenefitsList(element,'direct');
  }
  onAddCoverRow(){
    let entry = [
      {
        "CoverId": null,
        "CoverDesc": "",
        "CoverStatus":"Y",
        "SubCoverDetails": [
           
        ]
      }
    ]
    this.benefitsList = entry.concat(this.benefitsList);
    this.dataSource = new MatTableDataSource(this.benefitsList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  onAddSubCoverRow(coverIndex){
    console.log("Cover Index",this.selectedIndex)
      let subCoverDetails = this.benefitsList[this.selectedIndex].SubCoverDetails;
      let entry = [
        {
          "SubCoverId": null,
          "SubCoverDesc": null,
          "Currency": null,
          "SumInsured": null,
          "ExcessAmt": null,
          "EntryDate": null,
          "Status": "Y",
          "Remarks": null
        },
      ];
    
      this.benefitsList[this.selectedIndex].SubCoverDetails = entry.concat(subCoverDetails);
      console.log("Final SubCovers",this.benefitsList)
      this.dataSource2 = new MatTableDataSource(this.benefitsList[this.selectedIndex].SubCoverDetails);
      this.dataSource2.sort = this.sort;
      this.dataSource2.paginator = this.paginator;
  }
  onInnerData(element){
    if(element){
      this.selectedCoverId = element?.CoverId;
      this.Remarks = element?.Remarks;
      this.coverName = element?.CoverDesc;
      this.coverStatusValue = element?.CoverStatus;
      this.EffectiveDateStart = element.EffectiveDateStart;
      if(element?.EffectiveDateStart!=null && element?.EffectiveDateStart!=''){ this.coverEffectiveDate = this.onDateFormatInEdit(element?.EffectiveDateStart); }
    }
    
    let ReqObj = {
        "PolicyTypeId": this.sectionValue,
        "PlanTypeId": this.planTypeValue,
        "CoverId": element?.CoverId,
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "BranchCode": "99999"
    }
    let urlLink = `${this.CommonApiUrl}master/getallpolicytypesubcover`;
    //let urlLink = `${this.ApiUrl1}TravelPolicyType/getalltravelpolicytype`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
       (data: any) => {
         if(data.Result.length!=0){
          if(element?.BranchCode)  element['MotorList'] = data.Result;
          else{
            let entry = this.benefitsList.find(ele=>ele.CoverId==this.selectedCoverId);
            if(entry){console.log("Entry",entry);entry['MotorList'] = data.Result;}
          }

         }
      });
    //element['MotorList'] = element.SubCoverDetails;
  }
  onPassData(element:any,index){
   
    element.isClicked = !element.isClicked;
    this.dataSource2 = new MatTableDataSource(element.SubCoverDetails);
    this.dataSource2.sort = this.sort;
    this.dataSource2.paginator = this.paginator;
    this.applyFilter(this.filterValue);
    if(element.isClicked){
      this.selectedIndex = index;
      // this.onAdd.emit(element);
      // this.add.emit(element);
      this.selectedData = element;
      this.minus=false;
    }
    else{
      this.selectedIndex = null;
      this.minus=true;
    }
    
  }
  private _filter(value: any, data: any[]): any[] {
    if (value == null) {
      value = '';
    }
    const filterValue = value.toLowerCase();
    return data.filter((option) => option?.CodeDescription?.toLowerCase().includes(filterValue));
  }
  onSaveCoverAltDetails(modal){
    let sectionDesc=null,planTypeDesc = null,effectiveDate=null;
    if(this.planTypeDesc!=undefined && this.planTypeDesc!=null){
      sectionDesc = this.policyTypeDesc;planTypeDesc=this.planTypeDesc;
    }
    if(this.coverStatusValue==null || this.coverStatusValue==undefined) this.coverStatusValue = 'Y';
    if(this.coverEffectiveDate!=undefined && this.coverEffectiveDate!=null) effectiveDate = this.datePipe.transform(this.coverEffectiveDate, "dd/MM/yyyy");
    let ReqObj = {
      "PlanTypeId": this.planTypeValue,
      "PolicyTypeId": this.sectionValue,
      "CoverId": this.selectedCoverId,
      "CompanyId": this.insuranceId,
      "ProductId": this.productId,
      "BranchCode": "99999",
      "PolicyTypeDesc": sectionDesc,
      "PlanTypeDesc": planTypeDesc,
      "CoverDesc": this.coverName,
      "Remarks": this.Remarks,
      "EffectiveDateStart": effectiveDate,
      "CreatedBy": this.loginId,
      "CoverStatus": this.coverStatusValue
    }
    let urlLink = `${this.ApiUrl1}TravelPolicyType/inserttravelpolicytype`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.ErrorMessage.length!=0){

            }
            else{
              modal.dismiss('Cross click')
              $('#myModal2').modal('hide');
              this.getBenefitsList(null,'change');
            }
        },
        (err) => { },
      );
  }
  onSaveCoverDetails(){
    let sectionDesc=null,planTypeDesc = null;
    if(this.planTypeDesc!=undefined && this.planTypeDesc!=null){
      sectionDesc = this.policyTypeDesc;planTypeDesc=this.planTypeDesc;
    }
    let effectiveDate = null;
    console.log("Final Insert List",this.benefitsList);
      let ReqObj =  {
        "BranchCode": "99999",
        "CoverDetails": this.benefitsList,
        "CreatedBy": this.loginId,
        "EffectiveDateEnd": null,
        "EffectiveDateStart": this.EffectiveDateStart,
        "InsuranceId": this.insuranceId,
        "PlanTypeDesc": planTypeDesc,
        "PlanTypeId": this.planTypeValue,
        "PolicyTypeDesc": sectionDesc,
        "PolicyTypeId": this.sectionValue,
         "Remarks": this.Remarks,
        "ProductId": this.productId
      }
      let urlLink = `${this.ApiUrl1}planbenefits/insertplanbenefits`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
             if(data.ErrorMessage.length==0){
              Swal.fire({
                title: '<strong>Success</strong>',
                icon: 'success',
                html:
                  `Plan Benefits Inserted/Updated Successfully`,
                showCloseButton: true,
                //focusConfirm: false,
                showCancelButton: false,
    
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancel',
              })
             }   
        },
        (err) => { },
      );

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
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }

    }
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
    if(value=='PlanType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/planTypeBenefits']);
    if(value=='policyterm') this.router.navigate(['/Admin/lifepolicyterms']);
    if(value=='Excell')this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/excelllist']);
  }
  toggleExpandableSymbol(symbol: null): void {
    this.expandedSymbol = this.expandedSymbol === symbol
      ? null
      : symbol;
  }
}
