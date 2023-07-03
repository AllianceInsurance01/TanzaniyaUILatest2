import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as Mydatas from '../../../../../app-config.json';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';
import { SharedService } from '../../../../../shared/shared.service';
import { DatePipe } from '@angular/common';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogComponent } from '../../../dialog/dialog.component';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

declare var $:any;


@Component({
  selector: 'app-excess-discount',
  templateUrl: './excess-discount.component.html',
  styleUrls: ['./excess-discount.component.css'],
  standalone: false,
  //imports: [NgbPopoverModule],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExcessDiscountComponent implements OnInit {

  closeResult: string;
  tooltip:boolean=false;
  coverList:any[]=[];discountList:any[]=[];
  HtmlCard:boolean=false;
  public dataSource: any;columnHeader: any[] = [];
  //@ViewChild(NbPopoverDirective) popover;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  sortProperty: any = 'AllotedYN';loadingList:any[]=[];
  sortDirection: any = 'desc';taxList:any[]=[];
  filterValue: any = '';innerColumnHeader:any[]=[];
  dataExt: any[] = [];
  ClausesDataId:any[]=[];
  columnsToDisplay = [
    'Id',
    'Username',
    'Gender',
    'DateOfBirth',
    'KnownAs',
    'Created',
    'LastActive',
    'City',
    'Country'
  ];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  innerDisplayedColumns = ['Id', 'Username', 'City', 'Country'];
  displayedColumns: string[] = ['CoverName', 'PremiumAfterDiscount'];
  vehicleId: string;quoteRefNo: string;isMannualReferal:any="N";
  emiPeriod:any="N";
  beforeDiscount: any;afterDiscount: any;havePromoCode:any;
  premiumExcluedTax: any; premiumIncluedTax: any;promoCode:any;
  selectedCoverList: any[]=[];totalPremium: any=0;
  motorDetails: any;customerDetails: any;
  vehicleDetails: any;panelOpen:boolean=false;custPanelOpen:boolean=false;
  title: any;clientName: any;agencyCode:any;remarks:any;
  dateOfBirth: any;emailId: any;branchCode:any;showSection:boolean = false;
  mobileNo: any;idNumber: any;userType:any;insuranceId:any;
  clientType: string;userDetails:any;branchList:any;statusValue:any="";
  currencyCode: any="";loginId:any;productId:any;quoteNo:any;rejectedReason:any;
  vehicleList: any[]=[];config = { multi: false };vehicleDetailsList:any[]=[];
  vehicleData: any;adminSection:boolean=false;statusList:any[]=[];
  MinimumPremium: any;emiYN:any="N"; gridshow=false;
  requestReferenceNo:any;
  typeList: any[]=[];
  typeValue:any;
  motorTypeList: any[]=[];
  bodyTypeValue:any;
  vehicleSI:any;accessoriesSI:any;
  windShieldSI:any;tppdSI:any;
  cityValue:any;
  classList:any[]=[];
  borrowerList:any[]=[];
  bankList:any[]=[];
   motorUsageValue: any;
  motorUsageList: any[]=[];
  classValue: any;collateralYN:any="N";
  collateralValue: boolean;coverSection:boolean=false;
  firstLossPayee: any="";
  borrowerValue: any;
  fleetYN: string;
  fleetValue: boolean;
  noOfVehicles: any="";
  noOfCompPolicy: any="";
  claimRatio: any="";
  policyEndDate: any;
  claimsYN: any;
  policyStartDate:any;
  gpsYn: any;
  noOfDays:any;
  brokerCode:any="";
  brokerLoginId: any="";subuserType: any="";applicationId: any="";
  brokerbranchCode: any;
  acExecutiveId:any="";
  commissionType:any;
  drivenBy:any="D";currentIndex:number;
  myPopover:boolean=false;
  IsmodelShow:boolean=false
  emi3MonthsList:any[]=[];emi6MonthsList:any[]=[];
  EmiList:any[]=[];
  Emilist1:any[]=[];
  Emilist2:any[]=[];
  EmiDetails1:any[]=[];
  currencyValue:any=""; exchangeRate:any="0.98"; collateralName: any="";
  premium: any;
  EmiDetails: any[]=[];
  yearlySection: boolean;
  nineMonthSection: boolean;
  sixMonthSection: boolean;
  threeMonthSection: boolean;
  emiSection: boolean;
EmiYn:boolean;
emiyn="N";
  minDate: Date;
  maxDate: Date;
  endMinDate: Date;
  PromoCode: any;
  ClausesColumnHeader:any[]=[];ClausesData:any[]=[];
  ClauseColumnHeader:any[]=[];
  ExclusionColumnHeader:any[]=[];ExclusionData:any[]=[];
  WarrantyColumnHeader:any[]=[];WarrteData:any[]=[];
  WarrteColumnHeader:any[]=[];WarrantyData:any[]=[];
  ExclusionsColumnHeader:any[]=[];
  ExclusionDataId: any[]=[];
  WarrantyDataId: any[]=[];
  WarrantiesColumnHeader:any[]=[];
  insertClause:any[]=[];
  CoverList:any[]=[];

  onClauses:boolean= false;onExclusion:boolean= false;onWars:boolean= false;onWarranty:boolean= false;
  CoveList:boolean=true;
  viewList: any;
  referralRemarks: any[]=[];
  adminRemarks: any[]=[];
  localCurrency: any;
  localPremiumCost: any=0;
  clause: boolean;
  viewDropDown: any;
  VehicleSectionId: any[];
  insert:any[];
  clauses: any;
  warranty: boolean;
  Exclusion: boolean;
  common1:any[]=[];
  common2:any[]=[];
  common3:any[]=[];
  common4:any[]=[];

  Wcommon:any[]=[];
  Ecommon:any[]=[];
  inserts: any[] = [];
  jsonList:any[]=[];
  row:any;
  json:any[]=[];
  //ExclusionList:any[]=[];
  ExclusionList:any[]=[];
  tempVehicleId: any;
  terms:any[]=[];
  tempData: any;
  closes:any;
  button: boolean;
  ddata: any;
  Id: string;
  Ids: string;
  id: string;
  productName: any;
  endorsementSection: boolean;
  endorsementId: any;
  enableFieldsList: any;
  endorseCovers: boolean;
  endorsementDetails: any;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  p: Number = 1;
  s: Number = 1;
  pa:Number=1;
  endorseEffectiveDate: any;
  coverModificationYN: any='N';
  endorsementFeePercent: any;
  enableRemoveVehicle: any=false;
  CoverHeader:any[]=[];
  CoverName: any;
  constructor(public sharedService: SharedService,private router:Router,private modalService: NgbModal,
    private updateComponent:UpdateCustomerDetailsComponent,private datePipe:DatePipe,public dialog: MatDialog) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log("Received Session",this.userDetails)
    this.localCurrency = this.userDetails.Result.CurrencyId;
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.productName =  this.userDetails.Result.ProductName;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.updateComponent.showStepperSection = true;
    if(sessionStorage.getItem('endorsePolicyNo')){
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        console.log("Endorse obj",endorseObj)
        this.endorsementId = endorseObj.EndtTypeId;
        this.endorseEffectiveDate = endorseObj?.EffectiveDate;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        let entry = this.enableFieldsList.some(ele=>ele=='Covers' || ele=='removeVehicle');
        if(entry) this.coverModificationYN = 'Y';
        else this.coverModificationYN = 'N';
        console.log("Enable Obj",this.enableFieldsList)
        if(this.endorsementId!=42){
          this.endorseCovers = this.enableFieldsList.some(ele=>ele=='Covers');
          this.enableRemoveVehicle = this.enableFieldsList.some(ele=>ele=='removeVehicle');
        }
        else{
            this.endorseCovers = false;
        }
      }
    }
    else{
      this.endorsementSection = false;
      this.endorseCovers = false;
    }
    this.statusList = [
      {"Code":"RP","CodeDesc":"Referral Pending"},
      {"Code":"RA","CodeDesc":"Referral Approved"},
      {"Code":"RR","CodeDesc":"Referral Rejected"},
      {"Code":"RE","CodeDesc":"Referral Re-Quote"},
    ]
      this.columnHeader = [

        {
          key: 'CalcType',
          display: '',
          config: {
            isExpand:true
          },
        },
        { key: 'SectionName', display: 'Section Name' },
        {
          key: 'selected',
          display: 'Select',
          config: {
            isChecked:true
          },
        },
        { key: 'CoverName', display: 'Cover Name' },
        // { key: 'ReferalDescription', display: 'Referral' },
        { key: 'SumInsured', display: 'Sum Insured' },
        { key: 'Rate', display: 'Rate' },
        { key: 'ExcessPercent', display: 'ExcessPercent' },
        { key: 'ExcessAmount', display: 'ExcessAmount' },
        //{ key: 'MinimumPremium', display: 'Minimum' },
        { key: 'PremiumAfterDiscount', display: 'After Discount' },
        { key: 'PremiumIncludedTax', display: 'Included Tax' },

      ]

    this.innerColumnHeader =  [
      {
        key: 'SubCoverId',
        display: '',
        config: {
          select:true
        },
      },
      { key: 'SubCoverName', display: 'SubCover Name' },
      { key: 'Rate', display: 'Rate' },
      { key: 'MinimumPremium', display: 'Minimum' },
      { key: 'PremiumAfterDiscount', display: 'After Discount' },
      { key: 'PremiumIncludedTax', display: 'Included Tax' },
      // {
      //   key: 'actions',
      //   display: 'Action',
      //   config: {
      //     isEdit: true,
      //   },
      // },

    ];
    this.emi3MonthsList = [
      {
          "EmiMonth": "0",
          "InstallmentAmount": "42400.00",
          "InstallmentDesc": "Advance Amount",
          "DueDate": "10/01/2023"
      },
      {
          "EmiMonth": "1",
          "InstallmentAmount": "42400.00",
          "InstallmentDesc": "Installment Amount",
          "DueDate": "10/02/2023"
      },
      {
          "EmiMonth": "2",
          "InstallmentAmount": "42400.00",
          "InstallmentDesc": "Installment Amount",
          "DueDate": "10/03/2023"
      },
      {
          "EmiMonth": "3",
          "InstallmentAmount": "42400.00",
          "InstallmentDesc": "Installment Amount",
          "DueDate": "10/04/2023"
      }
    ];
    this.emi6MonthsList = [
      {
          "EmiMonth": "0",
          "InstallmentAmount": "24456.67",
          "InstallmentDesc": "Advance Amount",
          "DueDate": "10/01/2023"
      },
      {
          "EmiMonth": "1",
          "InstallmentAmount": "24456.67",
          "InstallmentDesc": "Installment Amount",
          "DueDate": "10/02/2023"
      },
      {
          "EmiMonth": "2",
          "InstallmentAmount": "24456.67",
          "InstallmentDesc": "Installment Amount",
          "DueDate": "10/03/2023"
      },
      {
          "EmiMonth": "3",
          "InstallmentAmount": "24456.67",
          "InstallmentDesc": "Installment Amount",
          "DueDate": "10/04/2023"
      },
      {
          "EmiMonth": "4",
          "InstallmentAmount": "24456.67",
          "InstallmentDesc": "Installment Amount",
          "DueDate": "10/05/2023"
      },
      {
          "EmiMonth": "5",
          "InstallmentAmount": "24456.67",
          "InstallmentDesc": "Installment Amount",
          "DueDate": "10/06/2023"
      },
      {
          "EmiMonth": "6",
          "InstallmentAmount": "24456.67",
          "InstallmentDesc": "Installment Amount",
          "DueDate": "10/07/2023"
      }
  ]
    // this.vehicleId = sessionStorage.getItem('editVehicleId');


    //this.vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetails'));
    // this.coverList = JSON.parse(sessionStorage.getItem('coverObject'));
    // const data:any[] = this.coverList.map(x=>({
    //   CoverageType:x.CoverageType
    // }));

    // const groupCoverList:any[] = [];
    // for (let index = 0; index < data.length; index++) {
    //   const element = data[index];
    //   let list:any[] = this.coverList.filter((ele:any)=> ele.CoverageType === element.CoverageType);

    //   groupCoverList.push(...list);

    // }
    this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    this.requestReferenceNo = this.quoteRefNo;
    this.minDate = new Date();
    var d = this.minDate;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.maxDate = new Date(year, month, day+90);
    let quoteNo = sessionStorage.getItem('quoteNo');
    if(quoteNo) this.quoteNo = quoteNo;
    let referenceNo =  sessionStorage.getItem('customerReferenceNo');
    if(referenceNo){
      this.getCustomerDetails(referenceNo);
    }
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if(quoteStatus=='AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRE'){
      if(quoteStatus=='AdminRP') this.statusValue ="RP";
      else if(quoteStatus =='AdminRA') this.statusValue ="RA";
      else if(quoteStatus =='AdminRE') this.statusValue ="RE";
        this.adminSection = true;
    }
    else{
      if(quoteStatus) this.statusValue = quoteStatus;
      this.adminSection = false;
    }
      if(this.productId=='5'  || this.productId=='3'){
        //let vehicles = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
        let vehicles:any;
        if(this.statusValue=='RA'){
          this.getUpdatedVehicleDetails();
        }
        else{
          if(vehicles && this.productId=='5'){
            let vehicleList=[];
            let i=0;
            for(let veh of vehicles){
              if(i==0) veh['Collapse'] = true;
              else veh['Collapse'] = false;
              i+=1;
              vehicleList.push(veh);
              if(i==vehicles.length){
                  this.vehicleDetailsList = vehicleList;
                  this.coverSection = true;
                  this.EmiInstallment();
              }
            }
          }
          else{

            this.getUpdatedVehicleDetails();
          }
        }
      }
      else if(this.productId!='5' && this.productId!='3'){
        // let coverListObj = JSON.parse(sessionStorage.getItem('travelCoverListObj'));
        // if(coverListObj){
        //   this.getCoverList(coverListObj);
        // }
        this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
        this.requestReferenceNo = this.quoteRefNo;
        let quoteNo = sessionStorage.getItem('quoteNo');
        if(quoteNo) this.quoteNo = quoteNo;
        this.getUpdatedVehicleDetails();
      }


   }

 ngOnInit(): void {
    let chassisNo = sessionStorage.getItem('vehChassisNo');
    //this.vehicleId = String(this.vehicleDetailsList.Vehicleid);
    // if(chassisNo) this.getVehicleDetails(chassisNo);

     this.checkSelectedCovers();

     console.log('Final Status Value',this.statusValue)
    //this.currencyCode="TZS"
     //this.getCoverList(coverListObj);
     this.ClausesColumnHeader =[
      { key: 'ClausesId', display: 'Clauses Id' },
      { key: 'ClausesDesc', display: 'Clauses Description' },
      { key: 'DocRefNo', display: 'Document Reference No' },
    ];
     this.ClauseColumnHeader =[
      { key: 'ClausesId', display: 'Clauses Id' },
      { key: 'ClausesDesc', display: 'Clauses Description' },
    ];
    this.ExclusionColumnHeader =[

      { key: 'ExclusionId', display: 'Exclusion Id' },
      { key: 'ExclusionDesc', display: 'Exclusion Description' },
      { key: 'DocRefNo', display: 'Document Reference No' },
    ];
    this.ExclusionsColumnHeader =[

      { key: 'ExclusionId', display: 'Exclusion Id' },
      { key: 'ExclusionDesc', display: 'Exclusion Descriptions' },

    ];
    this.WarrantyColumnHeader =[
      { key: 'WarrantyId', display: 'Warranty Id' },
      { key: 'WarrantyDesc', display: 'Warranty Description' },
      { key: 'DocRefNo', display: 'Document Reference No' },
    ];
    this.WarrantiesColumnHeader =[
      { key: 'WarrantyId', display: 'Warranty Id' },
      { key: 'WarrantyDesc', display: 'Warranty Description' },

    ];
    this.WarrteColumnHeader =[
      { key: 'WarrateId', display: 'Warrate Id' },
      { key: 'WarrateDesc', display: 'Warrate Description' },
      { key: 'DocRefNo', display: 'Document Reference No' },
    ];
    this.ViewDropDown();

    $('#exampleModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })

    if(this.userType=='Broker'){
      this.button=false
    }
    else{
      this.button=true
    }


    $(function () {
      $("#exampleModal").click(function () {
          $("#exampleModal").modal("hide");
      });
  });

}
getCustomerDetails(referenceNo){
  let ReqObj = {
    "CustomerReferenceNo": referenceNo
  }
  let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
        this.customerDetails = data.Result;
        this.clientName = this.customerDetails?.ClientName
        this.idNumber = this.customerDetails?.IdNumber;
        if(this.customerDetails){
          this.title = this.customerDetails?.TitleDesc;
          this.clientName = this.customerDetails?.ClientName;
          this.dateOfBirth = this.customerDetails?.DobOrRegDate;
          if(this.customerDetails?.PolicyHolderType == '1') this.clientType = "Individual";
          if(this.customerDetails?.PolicyHolderType == '2') this.clientType = "Corporate";
          this.emailId = this.customerDetails?.Email1;
          this.mobileNo = this.customerDetails?.MobileNo1;
          this.idNumber = this.customerDetails?.IdNumber;
        }
      }
    },
    (err) => { },
  );
}

close(modal) {
  //menu.hide();
  this.IsmodelShow=true;
  this.myPopover=false;
  $('#mymodalEdit').modal('hide');
  //this.modalService.close(id);
}
getCoverList(coverListObj){
  this.currencyCode = coverListObj?.Currency;
  //console.log('HCCCCCCCCCCC',this.currencyCode)
  let createdBy = this.loginId
  let groupList = coverListObj?.GroupDetails;
  let vehicleList = [];
  if(groupList.length!=0){
    let i=0;
    for(let group of groupList){
      let effectiveDate=null,policyEndDate,coverModificationYN='N';
      if(this.endorsementSection){
        effectiveDate = this.endorseEffectiveDate;
        let entry = this.enableFieldsList.some(ele=>ele=='Covers' || ele=='removeVehicle');
        if(entry) coverModificationYN = 'Y';
        else coverModificationYN = 'N';
      }
      else {

      }
      let ReqObj ={
        "EffectiveDate":null,
        "PolicyEndDate":null,
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode,
        "AgencyCode": this.agencyCode,
        "SectionId": coverListObj?.SectionId,
        "ProductId": this.productId,
        "MSRefNo": coverListObj?.MSRefNo,
        "VehicleId": group.TravelId,
        "CdRefNo": coverListObj?.CdRefNo,
        "VdRefNo": coverListObj?.VdRefNo,
        "CreatedBy": createdBy,
        "productId": this.productId,
        "Passengers":group.GroupMembers,
        "RequestReferenceNo": coverListObj?.RequestReferenceNo,
        "CoverModification": coverModificationYN
      }
      let urlLink = `${this.CommonApiUrl}calculator/calc`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          let entry = data;
          entry['DestinationCountry'] = coverListObj.DestinationCountry;
          entry['TravelStartDate'] = coverListObj.TravelStartDate;
          entry['TravelEndDate'] = coverListObj.TravelEndDate;
          let groupEntry = groupList.filter(ele=>ele.GroupId==data?.VehicleId);
          if(groupEntry){
            entry['Passengers'] = groupEntry[0].GroupMembers;
            entry['TravelId'] = entry.VehicleId;
          }
          vehicleList.push(entry);
          i+=1;
          if(i==groupList.length){
            this.vehicleDetailsList = vehicleList;
            this.checkSelectedCovers();

          }
        },
        (err) => { },
      );
    }
  }

}
  onChangeBodyType(){
    if(this.bodyTypeValue=='7') this.cityValue='';
  }
  onChangeClassType(){
    this.vehicleSI ="0";this.accessoriesSI="0",this.windShieldSI="0";this.tppdSI = "0";
  }
  /*CommaFormatted() {

    // format number
    if (this.getTotalCost) {
     this.getTotalCost = this.getTotalCost.replace(/\D/g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }}*/
    getInsuranceTypeList(){
      let ReqObj = {
        "ProductId": this.productId,
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode
      }
      let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.typeList = data.Result;
              this.getInsuranceClassList();
          }

        },
        (err) => { },
      );
    }
    onVehicleValueChange (args) {
      if (args.key === 'e' || args.key === '+' || args.key === '-') {
        return false;
      } else {
        return true;
      }
    }
    getMotorTypeList(type,motorValue,vehicleUsage){
      let ReqObj = {
        "SectionId": this.typeValue,
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode
      }
      let urlLink = `${this.CommonApiUrl}master/dropdown/bodytype`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            if(type=='change') this.cityValue = null;
              this.motorTypeList = data.Result;
              this.bodyTypeValue = motorValue;
              this.getMotorUsageList(vehicleUsage);
          }

        },
        (err) => { },
      );
    }

getInsuranceClassList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
    "BranchCode": this.branchCode,
    "LoginId":this.loginId
  }
  let urlLink = `${this.ApiUrl1}master/dropdown/policytype`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
          this.classList = data.Result;
          this.getBorrowerList();
      }
    },
    (err) => { },
  );
}
getBorrowerList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.CommonApiUrl}dropdown/borrowertype`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.borrowerList = data.Result;
          this.getBankList();
      }

    },
    (err) => { },
  );
}
getBankList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.CommonApiUrl}master/dropdown/bankmaster`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.bankList = data.Result;
          //this.getCurrencyList();
      }

    },
    (err) => { },
  );
}
onStartDateChange(){
  if(this.productId!='4'){
    var d = this.policyStartDate;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.endMinDate = new Date(this.policyStartDate);
    this.policyEndDate = new Date(year + 1, month, day-1);
    this.updateComponent.policyStartDate = this.policyStartDate;
    this.updateComponent.policyEndDate = this.policyEndDate;
    this.updateComponent.HavePromoCode = this.havePromoCode;
    this.updateComponent.PromoCode = this.promoCode;
    this.onChangeEndDate();
  }
}
getMotorUsageList(vehicleValue){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "SectionId": this.typeValue,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.CommonApiUrl}api/dropdown/vehicleusage`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.motorUsageList = data.Result;
          this.motorUsageValue = vehicleValue;
      }

    },
    (err) => { },
  );
}
    getEditVehicleDetails(rowData,type,modal){
      let ReqObj =  {
        "RequestReferenceNo": this.requestReferenceNo,
         "Idnumber": this.customerDetails?.IdNumber,
        "Vehicleid": rowData.Vehicleid
       }
       let urlLink = `${this.motorApiUrl}api/getmotordetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            this.vehicleDetails = data.Result;
            this.myPopover=true;

            if(type=='edit'){
              this.setVehicleValues(type);
              this.open(modal);
            }
          }
        },
        (err) => { },
      );
      this.getInsuranceTypeList();
    }
    setVehicleValues(type){
      console.log("Motor Details",this.vehicleDetails);
      this.vehicleId = String(this.vehicleDetails?.Vehicleid);
      console.log("Id Setted",this.vehicleId);
      this.typeValue = this.vehicleDetails?.Insurancetype;
      this.classValue = this.vehicleDetails?.InsuranceClass;
      if(type=='edit'){
        this.getMotorTypeList('direct',this.vehicleDetails?.VehicleType,this.vehicleDetails?.Motorusage)
        this.bodyTypeValue = this.vehicleDetails?.VehicleType;
        this.motorUsageValue = this.vehicleDetails?.Motorusage;
        this.collateralYN = this.vehicleDetails?.CollateralYn;
        if(this.collateralYN=='Y'){
          this.collateralValue = true;
          this.collateralYN = this.vehicleDetails?.CollateralName;
          this.firstLossPayee = this.vehicleDetails?.FirstLossPayee;
          this.borrowerValue = this.vehicleDetails?.BorrowerType;
        }
        if(this.vehicleDetails?.FleetOwnerYn){
          if(this.fleetYN!='')
          this.fleetYN = this.vehicleDetails?.FleetOwnerYn;
          if(this.fleetYN=='Y'){
            this.fleetValue = true;
            this.noOfVehicles = this.vehicleDetails?.NoOfVehicles;
            this.noOfCompPolicy = this.vehicleDetails?.NoOfComprehensives;
            this.claimRatio = this.vehicleDetails?.ClaimRatio
          }
        }
      }
      else{

      }
      this.cityValue = this.vehicleDetails?.CityLimit;
      if(this.vehicleDetails?.PolicyStartDate != null ){
        var dateParts = this.vehicleDetails?.PolicyStartDate.split("/");
        // month is 0-based, that's why we need dataParts[1] - 1
        this.policyStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        console.log("Policy Start",this.policyStartDate)
        //this.policyStartDate = dateObject.toString()
      }
      if(this.vehicleDetails?.PolicyEndDate != null ){
        var dateParts = this.vehicleDetails?.PolicyEndDate.split("/");

  // month is 0-based, that's why we need dataParts[1] - 1
        this.policyEndDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        this.onChangeEndDate();
      }
      if(type=='edit'){
        this.claimsYN = this.vehicleDetails?.NcdYn;
        this.gpsYn = this.vehicleDetails?.Gpstrackinginstalled;
        this.vehicleSI = String(this.vehicleDetails?.SumInsured);
        this.CommaFormatted();
        this.windShieldSI = String(this.vehicleDetails?.WindScreenSumInsured);
        this.WindSICommaFormatted();
        this.tppdSI = String(this.vehicleDetails?.TppdIncreaeLimit);
        this.TppdCommaFormatted();
        this.accessoriesSI = String(this.vehicleDetails?.AcccessoriesSumInsured);
        this.accessoriesCommaFormatted();
        this.getVehicleDetails(this.vehicleDetails?.Chassisnumber);
      }


    }
    onChangeEndDate(){
      const oneday = 24 * 60 * 60 * 1000;
      const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
      const formattedDate = moment(momentDate).format("YYYY-MM-DD");
      const formattedDatecurrent = new Date(this.policyStartDate);
      console.log(formattedDate);

    console.log(formattedDatecurrent);
    this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
    }
    CommaFormatted() {

      // format number
      if (this.vehicleSI) {
       this.vehicleSI = this.vehicleSI.replace(/\D/g, "")
         .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }}
      TppdCommaFormatted() {

        // format number
        if (this.tppdSI) {
         this.tppdSI = this.tppdSI.replace(/\D/g, "")
           .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }}
      accessoriesCommaFormatted() {

        // format number
        if (this.accessoriesSI) {
         this.accessoriesSI = this.accessoriesSI.replace(/\D/g, "")
           .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      }
      WindSICommaFormatted() {
        // format number
        if (this.windShieldSI) {
         this.windShieldSI = this.windShieldSI.replace(/\D/g, "")
           .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      }

  canbeChecked(rowData){
    return rowData.selected;
  }
  get keys() {
    return this.columnHeader.map(({ key }) => key);
  }
  get innerKeys() {
    return this.innerColumnHeader.map(({ key }) => key);
  }
  ngOnChanges() {

  }
  toggle(index: number) {
    let entry = this.vehicleDetailsList[index];
    if (!this.config.multi) {
      this.vehicleDetailsList.filter(
        (menu, i) => i == index
      ).forEach(menu => menu.Collapse = !menu.Collapse);
      this.vehicleList.filter(
        (menu, i) => i != index
      ).forEach(menu => menu.Collapse = false);
    }
  }
  toggleAccordian(){
    $(document).ready(function(){
      $(".accordion-button").click(function(){
        $(".referal-status").toggle();
      });
    });
  }
  onChangeSubCover(subCover,cover,vehicle,event){
    console.log("SubCover Data",subCover,event);
    if(subCover.MultiSelectYn=='Y'){
        if(event){
          if(this.selectedCoverList.length!=0){
            let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicle.VehicleId);
            if(entry.length==0){
              let element = {
                  "Covers": [
                    {
                      "CoverId": cover.CoverId,
                      "SubCoverId": subCover.SubCoverId,
                      "SubCoverYn": "Y",
                      //"isReferal": rowData.isReferal
                    }
                  ],
                  "Id": vehicle.VehicleId,
                  "SectionId": cover.SectionId,

                }
              cover.PremiumIncludedTaxLC = cover.PremiumIncludedTaxLC+subCover.PremiumIncludedTaxLC;
              cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
              cover.selected = true;
              subCover['selected'] = true;
              this.selectedCoverList.push(element);
              console.log("Selected Covers",this.selectedCoverList)
              if(vehicle?.totalPremium){
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxLC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                }
              
              }
              else{
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxLC;
                  vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxLC;
                  vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                }
                
              }
              // if(vehicle?.totalPremium){
              //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTaxLC;
              //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
              // }
              // else{
              //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxLC;
              //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              // }
                console.log("Total Premium",cover,vehicle)
              this.getTotalVehiclesCost();
              //this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
            }
            else{
             let sectionEntry = entry.find(ele=>ele.SectionId == cover.SectionId);
             if(sectionEntry == undefined){
              let element = {
                "Covers": [
                  {
                    "CoverId": cover.CoverId,
                    "SubCoverId": subCover.SubCoverId,
                    "SubCoverYn": "Y",
                    //"isReferal": rowData.isReferal
                  }
                ],
                "Id": vehicle.VehicleId,
                "SectionId": cover.SectionId
              }
              cover.PremiumIncludedTaxLC = cover.PremiumIncludedTaxLC+subCover.PremiumIncludedTaxLC;
              cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;

              cover.selected = true;
              subCover['selected'] = true;
              this.selectedCoverList.push(element);
              if(vehicle?.totalPremium){
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxLC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                }
              
              }
              else{
                if(cover.Endorsements!=null){
                  vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxLC;
                  vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxLC;
                  vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                }
                
              }
                // if(vehicle?.totalPremium){
                //   vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.PremiumIncludedTaxLC;
                //   vehicle['totalPremium'] =  vehicle['totalPremium']+cover.PremiumIncludedTax;
                // }
                // else{
                //   vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxLC;
                //   vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                // }
                console.log("Total Premium",cover,vehicle)
                this.getTotalVehiclesCost();
             }
             else{
               console.log("Sections",sectionEntry)
              let covers:any[] = sectionEntry.Covers;
              let findCover = covers.filter(ele=>ele.CoverId==cover.CoverId);
              if(findCover.length==0) {
                let newEntry = {
                  "CoverId": cover.CoverId,
                  "SubCoverId":subCover.SubCoverId,
                  "SubCoverYn": "Y"
                  //"isReferal": rowData.isReferal
                }
                cover.PremiumIncludedTaxLC = cover.PremiumIncludedTaxLC+subCover.PremiumIncludedTaxLC;
                cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
                cover.selected = true;
                subCover['selected'] = true;
                sectionEntry.Covers.push(newEntry);
                if(vehicle?.totalPremium){
                  if(cover.Endorsements!=null){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxLC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                  }
                
                }
                else{
                  if(cover.Endorsements!=null){
                    vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxLC;
                    vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxLC;
                    vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                  }
                  
                }
                console.log("Total Premium",cover,vehicle)
                this.getTotalVehiclesCost();
              }
              else{
                console.log("Finded Covers",findCover,sectionEntry)
                let subCoverEntry = findCover.filter(ele=>ele.SubCoverId==subCover.SubCoverId);
                if(subCoverEntry.length==0){
                  let newEntry = {
                    "CoverId": cover.CoverId,
                    "SubCoverId":subCover.SubCoverId,
                    "SubCoverYn": "Y"
                    //"isReferal": rowData.isReferal
                  }
                  cover.PremiumIncludedTaxLC = cover.PremiumIncludedTaxLC+subCover.PremiumIncludedTaxLC;
                  cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;
                  cover.selected = true;
                  subCover['selected'] = true;
                  sectionEntry.Covers.push(newEntry);
                  if(vehicle?.totalPremium){
                    if(cover.Endorsements!=null){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxLC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTaxLC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
                    }
                  
                  }
                  else{
                    if(cover.Endorsements!=null){
                      vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxLC;
                      vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxLC;
                      vehicle['totalPremium'] =  cover.PremiumIncludedTax;
                    }
                    
                  }
                  console.log("Total Premium",cover,vehicle)
                  this.getTotalVehiclesCost();
                }
                
              }
             }
            }
          }
          else{
            let element = {
              "Covers": [
                {
                  "CoverId": cover.CoverId,
                  "SubCoverId": subCover.SubCoverId,
                  "SubCoverYn": "Y",
                  //"isReferal": rowData.isReferal
                }
              ],
              "Id": vehicle.VehicleId,
              "SectionId": cover.SectionId
            }
            cover.PremiumIncludedTaxLC = cover.PremiumIncludedTaxLC+subCover.PremiumIncludedTaxLC;
            cover.PremiumIncludedTax = cover.PremiumIncludedTax+subCover.PremiumIncludedTax;

            cover.selected = true;
            subCover['selected'] = true;
            this.selectedCoverList.push(element);
            if(vehicle?.totalPremium){
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxLC;
                vehicle['totalPremium'] =  vehicle['totalPremium']+cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + subCover.PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium']+subCover.PremiumIncludedTax;
              }
              
            }
            else{
              if(cover.Endorsements!=null){
                vehicle['totalLcPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTaxLC;
                vehicle['totalPremium'] = cover.Endorsements[cover.Endorsements.length-1].PremiumIncludedTax;
              }
              else{
                vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxLC;
                vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              }
              
            }
            this.getTotalVehiclesCost();
          }
        }
        else{
          if(this.selectedCoverList.length!=0){
            let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicle.VehicleId);
            console.log("Entry List",entry);
            let sectionEntry = entry.find(ele=>ele.SectionId==cover.SectionId);
            sectionEntry.Covers = sectionEntry.Covers.filter(ele=>ele.SubCoverId!=subCover.SubCoverId )
            let covers:any[] = sectionEntry.Covers;
            let findCover = covers.filter(ele=>ele.CoverId==cover.CoverId);
            subCover['selected'] = false;
            
            cover.PremiumIncludedTaxLC = cover.PremiumIncludedTaxLC-subCover.PremiumIncludedTaxLC;
            cover.PremiumIncludedTax = cover.PremiumIncludedTax-subCover.PremiumIncludedTax;
            if(vehicle?.totalPremium==null || vehicle?.totalPremium==undefined){ vehicle['totalLcPremium']=0;vehicle['totalPremium']=0 }
            if(vehicle?.totalPremium){
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - subCover.PremiumIncludedTaxLC;
              vehicle['totalPremium'] =  vehicle['totalPremium']-subCover.PremiumIncludedTax;
              if(findCover.length==0){cover['selected'] = false;  vehicle['totalPremium'] =  vehicle['totalPremium']-cover.PremiumIncludedTax; vehicle['totalLcPremium'] =  vehicle['totalLcPremium']-cover.PremiumIncludedTaxLC;}
            }
            else{
              if(findCover.length!=0){
                vehicle['totalLcPremium'] =  cover.PremiumIncludedTaxLC;
                vehicle['totalPremium'] =  cover.PremiumIncludedTax;
              }
            }
            this.getTotalVehiclesCost();
          }
        }
    }
  }
  mergeConfig(options: any) {
    const config = {
      multi: true
    };

    return { ...config, ...options };
  }
  getUpdatedVehicleDetails(){
    let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
    if(referenceNo){
      this.quoteRefNo = referenceNo;
      let ReqObj = {
        "ProductId":this.productId,
        "RequestReferenceNo": this.quoteRefNo
      }
      let urlLink = `${this.CommonApiUrl}api/view/calc`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            console.log("Final Cal Response",data.Result);

              this.vehicleData = data.Result;

              if(this.vehicleData[0].HavePromoCode){
                this.havePromoCode = this.vehicleData[0].HavePromoCode;
                this.promoCode = this.vehicleData[0].PromoCode;
              }
              else{
                this.havePromoCode = "N";
                this.promoCode = null;
              }
              this.currencyCode= this.vehicleData[0].CoverList[0].Currency;
              // let refRemarks = this.vehicleData[0].ReferalRemarks;
              // if(refRemarks){
              //   this.referralRemarks = refRemarks.split('~');
              // }
              let admRemarks = this.vehicleData[0].AdminRemarks;
              if(admRemarks){
                this.adminRemarks = admRemarks.split('~');

              }
              let vehicleList:any[]=[];
              if(this.vehicleData.length!=0){
                let i=0;
                for(let veh of this.vehicleData){
                  veh['ReferralList'] = [];
                  if(veh.MasterReferral.length!=0){
                    for(let master of veh.MasterReferral){
                      veh['ReferralList'].push(master.ReferralDesc)
                    }
                  }
                  if(veh.UWReferral.length!=0){
                    for(let master of veh.UWReferral){
                      veh['ReferralList'].push(master.QuestionDesc)
                    }
                  }
                  if(veh.EndorsementYn=='Y'){
                    if(this.endorsementSection==false){
                      
                    }
                  }
                  // if(veh.ReferalRemarks){
                  //   veh['ReferralList']= veh.ReferalRemarks.split('~');
                  // }
                  if(veh.VehicleId) veh['Vehicleid'] = veh.VehicleId;
                    veh['Active'] = true;
                    let coverList = veh.CoverList;
                    let baseCovers =[],otherCovers=[];
                    baseCovers = coverList.filter(ele=>ele.CoverageType=='B');
                    otherCovers= coverList.filter(ele=>ele.CoverageType!='B');
                    veh.CoverList = baseCovers.concat(otherCovers)
                    if(i==0){
                      veh['Collapse'] = true;
                      this.remarks = veh.AdminRemarks;
                      vehicleList.push(veh);
                    }
                    else{
                      veh['Collapse'] = false;
                      vehicleList.push(veh);
                    }
                    i+=1;
                    if(i==this.vehicleData.length){
                      console.log("Vehiclessss",this.vehicleData,data.Result)
                      console.log("Final Vehicle List",vehicleList)
                      //sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleList));
                      if(this.productId!='4' && this.productId!='5'){
                        this.vehicleData = vehicleList;
                        this.filterVehicleList();
                      }
                      else{

                        this.vehicleDetailsList = vehicleList;
                        this.checkSelectedCovers();
                      }

                    }
                }
              }
          }
        },
        (err) => { },
      );
    }
  }
  filterVehicleList(){
    let vehicleList = [];
    console.log("Vehiclessss on Filter",this.vehicleDetailsList,this.vehicleData)
      if(this.vehicleData.length!=0){
          let i=0;
          this.vehicleDetailsList = [];
          for(let vehicle of this.vehicleData){
            if(i==0){
                vehicleList.push(vehicle);
            }
            else{
              let entry = vehicleList.find(ele=>ele.VehicleId==vehicle.VehicleId);
              if(entry){

                if(entry.SectionId==vehicle.SectionId){
                  entry.CoverList = entry.CoverList.concat(vehicle.CoverList);
                }
                else{
                  vehicleList.push(vehicle);
                }
              }
              else{
                vehicleList.push(vehicle);
              }
            }

            i+=1;
            if(i==this.vehicleData.length){
              this.vehicleDetailsList = vehicleList;
              console.log("Filtered Vehicle List",this.vehicleDetailsList)
              this.checkSelectedCovers();
            }
          }
      }
  }
  submitForm(rowData,modal){
    console.log("Save Obj",this.vehicleDetails)
    let index;
    let entry=rowData;
      let createdBy="";
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if(quoteStatus=='AdminRP'){
          createdBy = this.vehicleDetailsList[0].CreatedBy;
      }
      else{
        createdBy = this.loginId;
      }
      let startDate = "",endDate = "",vehicleSI="",accSI="",windSI="",tppSI="";
      if(this.vehicleSI==undefined) vehicleSI = null;
      else if(this.vehicleSI.includes(',')){ vehicleSI = this.vehicleSI.replace(/,/g, '') }
      else vehicleSI = this.vehicleSI;
      if(this.accessoriesSI==undefined) accSI = null;
      else if(this.accessoriesSI.includes(',')){ accSI = this.accessoriesSI.replace(/,/g, '') }
      else accSI = this.accessoriesSI
      if(this.windShieldSI==undefined) windSI = null;
      else if(this.windShieldSI.includes(',')){ windSI = this.windShieldSI.replace(/,/g, '') }
      else windSI = this.windShieldSI
      if(this.tppdSI==undefined) tppSI = null;
      else if(this.tppdSI.includes(',')){ tppSI = this.tppdSI.replace(/,/g, '') }
      else tppSI = this.tppdSI
      if(this.policyStartDate){
        startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
      }
      if(this.policyEndDate){
        endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
      }
      if(this.userType=='Broker'){
        this.brokerCode = this.agencyCode;
        this.brokerLoginId = createdBy;
        this.subuserType = sessionStorage.getItem('typeValue');
        this.applicationId = "01";
      }


    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.loginId;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      brokerbranchCode = null;
    }
    console.log("AcExecutive",this.acExecutiveId);
    //this.exchangeRate=this.vehicleDetails.ExchangeRate;
    let currencyValue="";
    let ReqObj = {
      "BrokerBranchCode": brokerbranchCode,
      "AcExecutiveId": this.acExecutiveId,
      "CommissionType": this.vehicleDetails.commissionType,
      "BrokerCode": this.vehicleDetails.BrokerCode,
      "LoginId": this.vehicleDetails.LoginId,
      "SubUserType": this.subuserType,
      "ApplicationId": this.vehicleDetails.ApplicationId,
      "CustomerReferenceNo": this.customerDetails?.CustomerReferenceNo,
      "RequestReferenceNo": this.requestReferenceNo,
      "Idnumber": this.customerDetails?.IdNumber,
      "VehicleId": this.vehicleId,
      "AcccessoriesSumInsured": accSI,
      "AccessoriesInformation": "",
      "AdditionalCircumstances": "",
      "AxelDistance": this.vehicleDetails?.AxelDistance,
      "Chassisnumber": this.vehicleDetails?.Chassisnumber,
      "Color": this.vehicleDetails?.Color,
      "CityLimit": this.cityValue,
      "Currency" : this.currencyCode,
      "CoverNoteNo": null,
      "OwnerCategory": this.vehicleDetails?.OwnerCategory,
      "CubicCapacity": this.vehicleDetails?.Grossweight,
      "CreatedBy": this.vehicleDetails?.CreatedBy,
      "DrivenByDesc": this.drivenBy,
      "EngineNumber": this.vehicleDetails?.EngineNumber,
      "ExchangeRate": this.vehicleDetails?.ExchangeRate,
      "FuelType": this.vehicleDetails?.FuelType,
      "Gpstrackinginstalled": this.gpsYn,
      "Grossweight": this.vehicleDetails?.Grossweight,
      "HoldInsurancePolicy": "N",
      "Insurancetype": this.typeValue,
      "InsuranceId": this.insuranceId,
      "InsuranceClass": this.classValue,
      "InsurerSettlement": "",
      "InterestedCompanyDetails": "",
      "ManufactureYear": this.vehicleDetails?.ManufactureYear,
      "ModelNumber": null,
      "MotorCategory": this.vehicleDetails?.MotorCategory,
      "Motorusage": this.motorUsageValue,
      "NcdYn": this.claimsYN,
      "NoOfClaims": null,
      "NumberOfAxels": this.vehicleDetails?.NumberOfAxels,
      "BranchCode": this.vehicleDetails?.BranchCode,
      "AgencyCode": this.agencyCode,
      "ProductId": this.productId,
      "SectionId": this.typeValue,
      "PolicyType": this.customerDetails?.PolicyHolderType,
      "RadioOrCasseteplayer": null,
      "RegistrationYear": this.customerDetails?.DobOrRegDate,
      "Registrationnumber": this.vehicleDetails?.Registrationnumber,
      "RoofRack": null,
      "SeatingCapacity": this.vehicleDetails?.SeatingCapacity,
      "SpotFogLamp": null,
      "Stickerno": null,
      "SumInsured": vehicleSI,
      "Tareweight": this.vehicleDetails?.Tareweight,
      "TppdFreeLimit": null,
      "TppdIncreaeLimit": tppSI,
      "TrailerDetails": null,
      "TiraCoverNoteNo": this.vehicleDetails?.TiraCoverNoteNo,
      "Vehcilemodel": this.vehicleDetails?.Vehcilemodel,
      "VehicleType": this.bodyTypeValue,
      "Vehiclemake": this.vehicleDetails?.Vehiclemake,
      "WindScreenSumInsured": windSI,
      "Windscreencoverrequired": null,
      "accident": null,
      "periodOfInsurance": this.noOfDays,
      "PolicyStartDate": startDate,
      "PolicyEndDate": endDate,
      "CollateralYn": this.vehicleDetails.CollateralYn,
      "BorrowerType": this.borrowerValue,
      "CollateralName": this.collateralName,
      "FirstLossPayee": this.firstLossPayee,
      "FleetOwnerYn": this.vehicleDetails?.FleetOwnerYn,
      "NoOfVehicles": this.noOfVehicles,
      "NoOfComprehensives": this.noOfCompPolicy,
      "ClaimRatio": this.claimRatio,
      "SavedFrom": this.vehicleDetails?.SavedFrom,
      "UserType": this.userType,
      "HavePromoCode": this.havePromoCode,
      "PromoCode" : this.promoCode,
      "SourceType":this.vehicleDetails?.SourceType,
      "CustomerCode": this.vehicleDetails?.CustomerCode,
      }
      ReqObj['FleetOwnerYn'] = "N";
      let urlLink = `${this.motorApiUrl}api/savemotordetails`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          let res:any = data;
          if(data.ErrorMessage.length!=0){
            if(res.ErrorMessage){
            }
          }
          else{
            this.requestReferenceNo = data?.Result?.RequestReferenceNo;
             sessionStorage.setItem('quoteReferenceNo',data?.Result?.RequestReferenceNo);
            let entry = this.motorDetails;
            entry['PolicyStartDate'] = this.vehicleDetails.PolicyStartDate;
          entry['PolicyEndDate'] = this.vehicleDetails.PolicyStartDate;
          entry['Currency'] = this.currencyCode;
          entry['HavePromoCode'] = this.havePromoCode;
          entry['PromoCode'] = this.promoCode;
          entry['ExchangeRate'] = this.exchangeRate;
            entry['InsuranceType'] = this.typeValue;
            entry['MSRefNo'] = data?.Result?.MSRefNo;
            entry['VdRefNo'] = data?.Result?.VdRefNo;
            entry['CdRefNo'] = data?.Result?.CdRefNo;
            entry['RequestReferenceNo'] = data?.Result?.RequestReferenceNo;
            entry['Active'] = true;
            entry['Vehicleid'] = this.vehicleId;
            console.log("Save Iterate 2",entry);
            this.myPopover=false;
            this.coverSection = false;
            let effectiveDate=null,coverModificationYN='N'
            if(this.endorsementSection){
                effectiveDate = this.endorseEffectiveDate;
                let entry = this.enableFieldsList.some(ele=>ele=='Covers' || ele=='removeVehicle');
                if(entry) coverModificationYN = 'Y';
                else coverModificationYN = 'N';
            }
            else {
                effectiveDate = this.vehicleDetails.PolicyStartDate
            }
            let ReqObj = {
              "InsuranceId": this.insuranceId,
              "BranchCode": this.branchCode,
              "AgencyCode": this.agencyCode,
              "SectionId": entry.InsuranceType,
              "ProductId": this.productId,
              "MSRefNo": entry?.MSRefNo,
              "VehicleId":this.vehicleId,
              "CdRefNo": entry?.CdRefNo,
              "VdRefNo": entry?.VdRefNo,
              "CreatedBy": createdBy,
              "productId": this.productId,
              "RequestReferenceNo": this.requestReferenceNo,
              "EffectiveDate": effectiveDate,
              "PolicyEndDate": this.vehicleDetails?.PolicyEndDate,
              "CoverModification": coverModificationYN
            }
            let urlLink = `${this.CommonApiUrl}calculator/calc`;
            let i=0;
            this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
              (data: any) => {
                this.coverSection = false;
                modal.dismiss('Cross click');
                $('#mymodalEdit').modal('hide');
                this.selectedCoverList = [];
                this.getUpdatedVehicleDetails();
              },
              (err) => { },
            );
          }
        },
        (err) => { },
      );



  }
  covername(){
    
  }
  covernameinfo(modal,row){
    this.tooltip=true;
    console.log('UUUUUUUUUUUUUUUUUUU',row);
    this.CoverName=row.CoverDesc
    this.open(modal);
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "SectionId":row.SectionId,
      "CoverId":row.CoverId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/productbenefit`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){

        this.CoverHeader=[
          {key: 'BenefitId',display: 'BenefitId'},
          {key: 'BenefitDescription',display: 'Benefit Description'},
          //{key: 'CoverName',display: 'CoverName'},
          {key: 'CalcType',display: 'Calc Type'},
          {key: 'SectionDesc',display: 'Section Description'},
          {key: 'Value',display: 'Value'},
          {key: 'LongDesc',display: 'Long Description'},
          

        ]

            this.CoverList=data?.Result;

        //this.CoverList = obj.concat(data?.Result);
        //this.getExistingDocument();
        //if(!this.CountryValue){ this.CountryValue = "99999"; this.getStateList() }
      }
    },

    (err) => { },
  );
    
  }



  htmlcard(rowData,modal)
  {
    this.HtmlCard=true;
    this.getEditVehicleDetails(rowData,'edit',modal);
    this.myPopover=true;
  }
  editcard(rowData,modal)
  {
    this.getEditVehicleDetails(rowData,'edit',modal);

    //this.setVehicleValues('direct')
  }
  editWarranty(id){
    //$('#WarrantyModel').modal('show');
    //this.open(modal);
    //this.getEditVehicleDetails(rowData,'direct',modal);
    const dialogRef = this.dialog.open(DialogComponent, {

      data: {
        title:"Warranty",
        existingData:this.WarrantyData,
        QuoteNo:this.quoteNo,
        ReferenceNo:this.quoteRefNo,
        RiskId: this.tempData.VehicleId,
        SectionId:this.tempData.SectionId,
        Id:"4"
        /*jsonList: this.jsonList = [
          {
            "TermsId":null,
             "Id":this.Id,
            "SubId":null,
             "SubIdDesc":""
          }
        ],
        Id:"6"*/
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      let i=id
      console.log('The dialog was closed');
       this.WarrantyStatus(i,this.tempData)
      // this.onWarranty = false;
      //  this.onClauses = true;
      //  this.onWars = false;
      //  this.onExclusion = false;
      //  this.clauses=true;
      //this.animal = result;
    });

  }
  saveClausesData(rawData){
    let clauses
     

    console.log('QQQQQ',this.quoteNo)
        let quote
    if(this.quoteNo){
      quote=this.quoteNo;
    }
    else{
      quote="";
    }

    //console.log('SSSSSSSSSSSS',this.tempData)
    //console.log('aaaaaaaaaaaaaa',this.jsonList)
    let Req = {
      BranchCode: this.branchCode,
      CreatedBy: this.loginId,
      InsuranceId: this.insuranceId,
      ProductId: this.productId,
      QuoteNo:quote,
      //TermsId:null,
      RiskId: this.tempData.VehicleId,
      SectionId:this.tempData.SectionId,
      TermsAndConditionReq:rawData,
      RequestReferenceNo: this.requestReferenceNo
    };

    let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
      if (data.Result) {
        this.CoveList=true;
        this.onExclusion = false;
        this.onWarranty=false;
        this.onWars = false;
        this.onClauses = false;
        this.warranty = false;
        this.Exclusion = false;
        this.clause = false;
        this.clauses = false;
      }
      
    });
  }
  editClauses(id){


    //this.open(modal);
    const dialogRef = this.dialog.open(DialogComponent, {

      data: {
        title:"Clauses",
        existingData:this.ClausesData,
        QuoteNo:this.quoteNo,
        ReferenceNo:this.quoteRefNo,
        RiskId: this.tempData.VehicleId,
        SectionId:this.tempData.SectionId,
        Id:"6"
        /*jsonList: this.jsonList = [
          {
            "TermsId":null,
             "Id":this.Id,
            "SubId":null,
             "SubIdDesc":""
          }
        ],
        Id:"6"*/
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      let i=id
      console.log('The dialog was closed');
       this.ClausesStatus(i,this.tempData);
      // this.onWarranty = false;
      //  this.onClauses = true;
      //  this.onWars = false;
      //  this.onExclusion = false;
      //  this.clauses=true;
      //this.animal = result;
    });
  }

  editExclusion(id){
    //this.open(modal);
    const dialogRef = this.dialog.open(DialogComponent, {

      data: {
        title:"Exclusion",
        existingData:this.ExclusionData,
        QuoteNo:this.quoteNo,
        ReferenceNo:this.quoteRefNo,
        RiskId: this.tempData.VehicleId,
        SectionId:this.tempData.SectionId,
        Id:"7"
        /*jsonList: this.jsonList = [
          {
            "TermsId":null,
             "Id":this.Id,
            "SubId":null,
             "SubIdDesc":""
          }
        ],
        Id:"6"*/
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      let i=id
      console.log('The dialog was closed');
      this.ExclusioStatus(i,this.tempData);
      //this.animal = result;
    });
  }
  saveExclusionData(){

  }
  CloseClauses(){
    //$('#exampleModal').modal('hide');
    //$("#examplemodal .close").click();
    //modal.dismiss('Cross click');
    $('#exampleModal').modal('hide');
  }

  getVehicleDetails(chassisNo){
    let ReqObj = {
      "ReqChassisNumber": chassisNo,
      "ReqRegNumber": null
    }
    let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
      this.motorDetails = data.Result;
      console.log(" this.motorDetails==", this.motorDetails);
      }
      },
      (err) => { },
    );
  }
  checkSelectedCovers(){
    console.log('VVVVVVVVV',this.vehicleDetailsList);
    if(this.vehicleDetailsList.length!=0){
      if(this.vehicleDetailsList[0].CoverList.length!=0){
        this.currencyCode== this.vehicleDetailsList[0].CoverList[0].Currency;
      }
      let j=0;
      for(let veh of this.vehicleDetailsList){
        let i=0;
        let coverList:any[]=veh.CoverList;
        for(let cover of coverList){
          cover['ExcessDesc'] = 'None';
          let fieldList = [];
          if(cover.Endorsements!=null){
            
            cover['DifferenceYN']= 'Y';
            if(veh?.EndtTypeMaster?.Endtdependantfields){
              fieldList = veh?.EndtTypeMaster?.Endtdependantfields.split(',')
            }
          }
          if(cover.Endorsements!=null && !this.endorsementSection){
            this.endorsementSection = true;
            
            let obj = {
              "EndtTypeId":cover.Endorsements[0].EndorsementId,
              "FieldsAllowed": fieldList,
              "EffectiveDate":cover.EffectiveDate,
              "Remarks":null,
              "Category": veh?.EndtTypeMaster?.Endttypecategory,
              "EndtName": cover.Endorsements[0].EndorsementDesc,
              "PolicyNo": null
            }
            this.endorsementId = cover.Endorsements[0].EndorsementId;
            this.endorseEffectiveDate = cover.EffectiveDate;
            this.enableFieldsList = fieldList;
            let entry = this.enableFieldsList.some(ele=>ele=='Covers' || ele=='removeVehicle');
            if(this.coverModificationYN=='N'){
              if(entry) this.coverModificationYN = 'Y';
              else this.coverModificationYN = 'N';
            }
            sessionStorage.setItem('endorseTypeId',JSON.stringify(obj));
          }
          if(((cover.isSelected=='D' || cover.isSelected=='O' || cover.isSelected=='Y' || cover?.UserOpt=='Y') && !this.endorsementSection) || 
          (this.endorsementSection && (cover.UserOpt=='Y' || cover.isSelected=='D' || cover.isSelected=='O')) ){
            cover['selected']= true;
            this.onSelectCover(cover,true,veh.Vehicleid,veh,'coverList','direct');
          }
          else{
            console.log("Not Selected 1",cover);
            cover['selected']= false;
          }
          if(cover.SubCovers!=null){
            let k=0;
            for(let sub of cover.SubCovers){
              if(sub.isSelected=='D' || sub.isSelected=='O' || sub.isSelected=='Y' || sub?.UserOpt=='Y'){
                    this.onChangeSubCover(sub,cover,veh,true);
              }
              k+=1;
              if(k==cover.SubCovers){
                i+=1;
                if(i==coverList.length){
                  let defaultList = coverList.filter(ele=>ele.isSelected=='D' || ele.UserOpt == 'Y');
                  let otherList = coverList.filter(ele=>ele.isSelected!='D' && ele.UserOpt != 'Y')
                  veh.CoverList = defaultList.concat(otherList);
                  if(this.adminSection) veh.CoverList = coverList.filter(ele=>ele.isSelected=='D' || ele?.UserOpt=='Y')
                }
              }
            }
          }
          else{
            i+=1;
            if(i==coverList.length){
              let defaultList = coverList.filter(ele=>ele.isSelected=='D' || ele.UserOpt == 'Y');
              let otherList = coverList.filter(ele=>ele.isSelected!='D' && ele.UserOpt != 'Y')
              veh.CoverList = defaultList.concat(otherList);
              if(this.adminSection) veh.CoverList = coverList.filter(ele=>ele.isSelected=='D' || ele?.UserOpt=='Y')
            }
          }
          
        }
        j+=1;
        if(j==this.vehicleDetailsList.length){

          if(this.quoteNo!="null" && this.quoteNo!=null){
            this.updateComponent.quoteNo = this.quoteNo;
            //this.getEditQuoteDetails();
          }
           if(this.quoteRefNo!="null" && this.quoteRefNo!=null){
            //this.updateComponent.quoteNo = this.quoteNo;
            this.getEditQuoteDetails();
          }
          else{
            this.dataSource = new MatTableDataSource(this.coverList);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.applyFilter(this.filterValue);
          }
          //this.onGetCoverListById();
        }
      }


    }
  }
  ongetBack(){
    // if(this.statusValue=='RA'){
    //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details']);
    // }
    // else{
    //   if(this.productId!='4'){
    //     this.getUWDetails();
    //     //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/underwriter-details']);
    //   }
    //   else if(this.productId == '4'){
      if(this.statusValue){
          if(this.adminSection){
              if(this.statusValue=='RA') this.router.navigate(['/Admin/referralApproved']);
              //else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details']);
              
              else this.router.navigate(['/Admin/referralPending']);
          }
          else{
            if(this.statusValue=='RA') this.router.navigate(['/Home/referralApproved']);
            else this.router.navigate(['/Home/referralPending']);
            //else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details']);
          }
      }
      else{
        if(this.endorsementSection && this.endorsementId==844){
          this.router.navigate(['/Home/policies/Endorsements/endorsementTypes']);
        }
        else{
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details']);
        }
      }
      //}
    //}
  }
  getUWDetails(){
    let ReqObj = {
    "Limit":"0",
    "Offset":"100",
    "ProductId": this.productId,
    "LoginId": this.loginId,
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/getactiveuwquestions`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        let res:any = data.Result;
        if(res.length!=0){
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/underwriter-details']);
        }
        else{
          if(this.productId=='5'){
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details']);
          }
          else if(this.productId=='3'){
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-quote-details']);
          }
        }
      },
      (err) => { },
    );
  }
  getEditQuoteDetails(){
    let i=0;
    for(let veh of this.vehicleDetailsList){
      if(veh.VehicleId) veh['Vehicleid'] = veh.VehicleId
        if(i ==0 ){ this.remarks = veh.AdminRemarks; this.rejectedReason = veh.RejectReason}
        let covers = veh.CoverList;
        let j=0;
        for(let cover of covers){
          
            let entry = this.vehicleDetailsList.find(ele=>String(ele.Vehicleid)==String(veh.VehicleId))
            if(entry){
              let coverList = entry.CoverList;
              if(cover.UserOpt=='Y' ){
                let coverEntry = coverList.find(ele=>ele.CoverId == cover.CoverId)
                if(coverEntry){
                  coverEntry['selected']= true;
                  this.onSelectCover(coverEntry,true,veh.VehicleId,veh,'coverList','direct');
                  console.log("Selected 2",cover);
                }
              }

            }
            j+=1;
            if(j==covers.length) i+=1;
        }

        if(i==this.vehicleDetailsList.length){
          this.showSection = true;
          this.coverSection = true;
          if(!this.endorsementSection){
            this.EmiInstallment();
          }
          
          console.log("Final Vehicle Listaaaa",this.vehicleDetailsList,this.selectedCoverList)
        }
    }

  }
  getTotalCost(rowData){
    if(rowData?.totalPremium) return rowData?.totalPremium;
    else return 0;

  }
  numberWithCommas(totalPremium) {
    var parts = totalPremium.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
  onCheckChange(){

  }
  onGetInfo(){

  }
  onSelectCover(rowData,event,vehicleId,vehicleData,type,directType){
    console.log("Cover Selected received",type,this.selectedCoverList)
   
    if(type=='coverList'){
        let vehicle:any;
        if(this.productId!='4' && this.productId!='5'){
          vehicle = this.vehicleDetailsList.find(ele=>(ele.Vehicleid==vehicleId || ele.VehicleId==vehicleId) && (ele.SectionId==rowData.SectionId));
        }
        else{
          vehicle = this.vehicleDetailsList.find(ele=>ele.Vehicleid==vehicleId);
        }
        
        let coverList = vehicle?.CoverList;
        if(event){
          if(this.selectedCoverList.length!=0){
           
            let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicleId);
            if(entry.length==0){
              if(rowData.SubCovers==null){
                let element = {
                  "Covers": [
                    {
                      "CoverId": rowData.CoverId,
                      "SubCoverId": null,
                      "SubCoverYn": "N",
                      //"isReferal": rowData.isReferal
                    }
                  ],
                  "Id": vehicleId,
                  "SectionId": rowData.SectionId,

                }
                this.selectedCoverList.push(element);
              }
              
              if(this.coverModificationYN=='Y'){
                rowData['DifferenceYN'] = 'Y'
              }
              if(directType=='change' && this.endorsementSection){
                if(rowData.Endorsements!=null){
                  if(this.coverModificationYN=='Y'){
                    if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  //rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxLC = 0;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxLC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                }
              }
              else if(vehicle?.totalPremium){
                if(rowData.Endorsements!=null){
                  if(this.coverModificationYN!='Y'){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxLC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  
                }
                else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxLC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                }
                
              }
              else{
                if(rowData.Endorsements!=null){
                  if(this.coverModificationYN!='Y'){
                    if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;vehicle['totalPremium']=0;}
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxLC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    
                  }
                }
                else{
                    vehicle['totalLcPremium'] =  rowData.PremiumIncludedTaxLC;
                    vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                }
                
              }
              
                console.log("Total Premium",rowData,vehicle)
              this.getTotalVehiclesCost();
              //this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
            }
            else{
              
             let sectionEntry = entry.find(ele=>ele.SectionId == rowData.SectionId);
            
             if(sectionEntry == undefined){
              if(rowData.SubCovers==null){
                let element = {
                  "Covers": [
                    {
                      "CoverId": rowData.CoverId,
                      "SubCoverId": null,
                      "SubCoverYn": "N",
                      //"isReferal": rowData.isReferal
                    }
                  ],
                  "Id": vehicleId,
                  "SectionId": rowData.SectionId,

                }
                this.selectedCoverList.push(element);
                console.log("Selected Cover",this.selectedCoverList)
              }
              if(this.coverModificationYN=='Y'){
                rowData['DifferenceYN'] = 'Y'
              }
              if(directType=='change' && this.endorsementSection){
                if(this.coverModificationYN=='Y'){
                  
                  if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                  
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }
                
              }
              else if(vehicle?.totalPremium){
                if(rowData.Endorsements!=null){
                  if(this.coverModificationYN!='Y'){
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxLC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }


                }
                else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxLC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                }
                
              }
              else{
                if(rowData.Endorsements!=null){
                  if(this.coverModificationYN!='Y'){
                    vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxLC;
                    vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  }
                }
                else{
                  
                    vehicle['totalLcPremium'] =  rowData.PremiumIncludedTaxLC;
                    vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                }
              }
                console.log("Total Premium",rowData,vehicle)
                this.getTotalVehiclesCost();
             }
             else{
                let covers:any[] = sectionEntry.Covers;
              let findCover = covers.filter(ele=>ele.CoverId==rowData.CoverId);
              if(findCover.length==0) {
                if(rowData.SubCovers==null){
                  let element = {
                        "CoverId": rowData.CoverId,
                         "SubCoverId": null,
                         "SubCoverYn": "N",
                  }
                  // let element = {
                  //   "Covers": [
                  //     {
                  //       "CoverId": rowData.CoverId,
                  //       "SubCoverId": null,
                  //       "SubCoverYn": "N",
                  //       //"isReferal": rowData.isReferal
                  //     }
                  //   ],
                  //   "Id": vehicleId,
                  //   "SectionId": rowData.SectionId,
  
                  // }
                  // this.selectedCoverList.push(element);
                  sectionEntry.Covers.push(element)
                  console.log("Selected Cover",this.selectedCoverList)
                }
                if(this.coverModificationYN=='Y'){
                  rowData['DifferenceYN'] = 'Y'
                }
                if(directType=='change' && this.endorsementSection){
                  if(rowData.Endorsements!=null){
                    if(this.coverModificationYN=='Y'){
                      if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                        vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                        vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      }
                      else{
                        vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                        vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      }
                      
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    
                  }
                  else{
                    if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;vehicle['totalPremium']=0;}
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxLC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                  }
                }
                else if(vehicle?.totalPremium){
                  if(rowData.Endorsements!=null){
                    
                    if(this.coverModificationYN!='Y'){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxLC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                  }
                  else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxLC;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
                  }
                  
                }
                else{
                  if(rowData.Endorsements!=null){
                    if(this.coverModificationYN!='Y'){
                      
                      if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;vehicle['totalPremium']=0;}
                      vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxLC;
                      vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    
                  }
                  else{
                    if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;vehicle['totalPremium']=0;}
                      vehicle['totalLcPremium'] =  rowData.PremiumIncludedTaxLC;
                      vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
                  }
                  
                }
                console.log("Total Premium",rowData,vehicle)
                this.getTotalVehiclesCost();
              }
             }
            }
          }
          else{
            
            if(rowData.SubCovers==null){
              let element = {
                "Covers": [
                  {
                    "CoverId": rowData.CoverId,
                    "SubCoverId": null,
                    "SubCoverYn": "N",
                    //"isReferal": rowData.isReferal
                  }
                ],
                "Id": vehicleId,
                "SectionId": rowData.SectionId,

              }
              this.selectedCoverList.push(element);
              console.log("Selected Cover",this.selectedCoverList)
            }
          if(this.coverModificationYN=='Y'){
                rowData['DifferenceYN'] = 'Y'
          }
          if(directType=='change' && this.endorsementSection){
            if(rowData.Endorsements!=null){
              if(this.coverModificationYN=='Y'){
                if(rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax<0){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                  vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }
                
              }
              else{
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
              }
              
            }
            else{
              vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxLC;
              vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
            }
            
          }
          else if(vehicle?.totalPremium){
            if(rowData.Endorsements!=null){
              if(this.coverModificationYN!='Y'){
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxLC;
                vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
              }
            }
            else{
                vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.PremiumIncludedTaxLC;
                vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.PremiumIncludedTax;
            }
          
          }
          else{
            if(rowData.Endorsements!=null){
              if(this.coverModificationYN!='Y'){
                vehicle['totalLcPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxLC;
                vehicle['totalPremium'] = rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
              }
            }
            else{
              vehicle['totalLcPremium'] =  rowData.PremiumIncludedTaxLC;
              vehicle['totalPremium'] =  rowData.PremiumIncludedTax;
            }
            
          }
          // vehicle['totalLcPremium'] = rowData.PremiumIncludedTaxLC;
          // vehicle['totalPremium'] = rowData.PremiumIncludedTax;
          console.log("Premium Total ",vehicle,this.selectedCoverList)
          this.getTotalVehiclesCost();
            // this.selectedCoverList.push(rowData);
            // this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
          }
        }
        else{
          let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicleId);
          if(entry){
            let sectionEntry = entry.find(ele=>ele.SectionId==rowData.SectionId);
            if(sectionEntry!=undefined){
              let covers:any[] = sectionEntry.Covers;
              let CoverIndex = covers.findIndex(ele=>ele.CoverId==rowData.CoverId);
              covers.splice(CoverIndex,1);
              if(this.coverModificationYN=='Y') rowData['DifferenceYN'] = 'N';
              if(directType=='change' && this.endorsementSection){
                if(!vehicle?.totalLcPremium) {vehicle['totalLcPremium'] = 0;vehicle['totalPremium']=0;}
                if(rowData.Endorsements!=null){
                    if(this.coverModificationYN=='Y'){
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] + rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']+rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    else{
                      vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                      vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                    }
                    
                  }
                  else{
                    vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTaxLC;
                    vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.PremiumIncludedTax;
                  }
                
              }
              else if(vehicle?.totalPremium){
                if(rowData.Endorsements!=null){
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTaxLC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.Endorsements[rowData.Endorsements.length-1].PremiumIncludedTax;
                }
                else{
                  vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTaxLC;
                  vehicle['totalPremium'] =  vehicle['totalPremium']-rowData.PremiumIncludedTax;
                }
              
              }
              // vehicle['totalPremium'] = vehicle['totalPremium'] - rowData.PremiumIncludedTax;
              // vehicle['totalLcPremium'] = vehicle['totalLcPremium'] - rowData.PremiumIncludedTaxLC;
              this.getTotalVehiclesCost();
            }

          }
        }

    }
    console.log("Final Covers",this.vehicleDetailsList,this.selectedCoverList)
  }
  setDiscountDetails(rowData){
    this.beforeDiscount = rowData.PremiumBeforeDiscount;
    this.afterDiscount = rowData.PremiumAfterDiscount;
    if(rowData.Discounts) this.discountList = rowData.Discounts;
    if(rowData.Loadings) this.loadingList = rowData.Loadings;
  }
  
  getTotalVehiclesCost(){
    let totalCost = 0,i=0,totalLocalCost=0;

    for(let veh of this.vehicleDetailsList){
      if(veh?.totalPremium) totalCost = totalCost+veh?.totalPremium;
      if(veh?.totalLcPremium) totalLocalCost = totalLocalCost+veh?.totalLcPremium;
      i+=1;
      if(i==this.vehicleDetailsList.length){
        this.localPremiumCost = totalLocalCost;
        this.totalPremium = totalCost;
        if(this.vehicleData[0].EmiYn!=null && this.vehicleData[0].EmiYn!=undefined && this.vehicleData[0].EmiYn!=''){
        this.emiYN = this.vehicleData[0].EmiYn;
        this.emiPeriod = this.vehicleData[0].InstallmentPeriod;
        }
        else{
          this.emiYN = "N";
        }
    }
    console.log("Total Premium",this.vehicleDetailsList)
      console.log('TTTTTTTT',this.totalPremium);
    }
  }
  onEMIChange(){
    if(this.emiPeriod!='N'){
      console.log("Entered Level",this.emiPeriod,this.EmiDetails)
      if(this.EmiDetails==null || this.EmiDetails==undefined || this.EmiDetails.length==0){
      }
    }
  }
  onEmiYNChange(){
    if(this.emiYN == 'Y') this.EmiInstallment();
  }
  EmiInstallment(){
    if(this.localCurrency==undefined) this.localCurrency = 'TZS'
    let ReqObj = {
    "PremiumWithTax":this.localPremiumCost,
     "InsuranceId":this.insuranceId,
     "ProductId":this.productId,
     "Currency": this.localCurrency,
     "PolicyType":"1"
    }
    let urlLink = `${this.CommonApiUrl}api/viewemi`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            let emiList = data.Result;
            let EmiYnShow =data.Result[0].EmiYn;
            if(EmiYnShow=='Y')
            {
              this.gridshow=true;
              if(emiList.length!=0){

                let i=0,yearlyList=[],nineList=[],sixList=[],threeList=[];
                for(let entry of emiList){
                    let emiDetails = entry.EmiPremium;
                    if(emiDetails.length==13){
                      this.yearlySection = true;
                      yearlyList = entry.EmiPremium;
                    }
                    else if(emiDetails.length==10){
                      nineList = entry.EmiPremium;
                      this.nineMonthSection = true;
                    }
                    else if(emiDetails.length==7){
                      sixList = entry.EmiPremium;
                      this.sixMonthSection = true;
                    }
                    else if(emiDetails.length==4){
                      threeList = entry.EmiPremium;
                      this.threeMonthSection = true;
                    }
                    i+=1;
                    if(i==emiList.length){
                        this.setEmiTableValues(yearlyList,nineList,sixList,threeList);
                    }
                }
                console.log('tttt',this.totalPremium);
              }
              else{
                this.emiYN='N';
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
                //   'EMI Option',
                //   'No EMI Plan Available',
                //   config);
               }
            }
            else{
              this.gridshow = false;
            }

            //this.getBorrowerList();
        }
      },
      (err) => { },
    );
  }
  setEmiTableValues(yearlyList,nineList,sixList,threeList){
    if(this.yearlySection){
       let i=0;this.Emilist1=[];
       for(let entry of yearlyList){
            let data = entry;
            if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
            else{data['yearlyAmount']=null}
            if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
            else{data['nineAmount']=null}
            if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
            else{data['sixAmount']=null}
            if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
            else{data['threeAmount']=null}
            this.Emilist1.push(entry);
            i+=1;
            if(i==yearlyList.length){this.emiSection=true}
       }
    }
    else if(this.nineMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of nineList){
           let data = entry;
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           this.Emilist1.push(entry);
           i+=1;
           if(i==nineList.length){this.emiSection=true}
      }
   }
   else if(this.sixMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of sixList){
           let data = entry;
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           this.Emilist1.push(entry);
           i+=1;
           if(i==sixList.length){this.emiSection=true}

      }
   }
   else if(this.threeMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of threeList){
           let data = entry;
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           this.Emilist1.push(entry);
           i+=1;
           if(i==threeList.length){this.emiSection=true}
      }
   }
   console.log("Final Emi List",this.EmiDetails1)
  }
  ongetTaxDetails(rowData){
    console.log("Tax Details",rowData);
    this.MinimumPremium = (rowData.MinimumPremium/rowData.ExchangeRate);
    this.premiumExcluedTax = rowData.PremiumExcluedTax;
    this.premiumIncluedTax = rowData.PremiumIncludedTax
    if(rowData.Taxes) this.taxList = rowData.Taxes;
  }
  onGetEndorsement(rowData){
    console.log("End Details",rowData);
    this.endorsementDetails = rowData.Endorsements[rowData.Endorsements.length-1];
    //this.endorsementFeePercent = this.endorsementDetails.EndorsementFees[0].TaxRate;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue?.trim().toLowerCase();
  }
  onFormSubmit(){
    console.log("Selected Covers",this.selectedCoverList)
    if(this.selectedCoverList.length!=0){
      let coverList:any[]=[];
      this.onProceed(this.selectedCoverList);

    }
  }
  onProceed(coverList:any){
    if(this.statusValue == 'RA' && !this.adminSection){
      if(this.productId!='4'){
        if(this.productId=='3' || this.productId=='19' || this.productId=='32' || this.productId=='14'){
          let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
          if(homeSession){
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
          }
          else{
            if(this.productId=='3') this.getExistingBuildingList();
            else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details']);
          }

        }
        else{
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details'])
        }
        //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);

      }
      else if(this.productId == '4'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/travel-quote-details']);
      }

    }
    else{
      if(!this.statusValue && this.isMannualReferal=='Y'){
          if(this.remarks==null || this.remarks=='' || this.remarks == undefined){
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
            //   'Referral Remarks',
            //   'Please Enter Referral Remarks',
            //   config);
          }
      }
      else{
        this.isMannualReferal = 'N';
      }
      let ReqObj:any ={},createdBy = "";
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
        if(quoteStatus=='AdminRP'){
            createdBy = this.vehicleDetailsList[0].CreatedBy;
        }
        else{
          createdBy = this.loginId;
        }
      //this.finalFormSubmit(ReqObj);
      if(this.endorsementSection && this.enableRemoveVehicle){
        let entry = this.vehicleDetailsList.filter(ele=>ele.Status=='D');
        if(entry){
          console.log("Entry",entry);
          let i=0,orgCoverList:any[]=[];
          for(let cover of coverList){
            let Exist = entry.some(ele=>ele.VehicleId==cover.Id);
            
            if(!Exist) orgCoverList.push(cover);
            i+=1;
            if(i==coverList.length) {
              ReqObj = {
                "RequestReferenceNo": this.quoteRefNo,
                "CreatedBy": createdBy,
                "ProductId": this.productId,
                "ManualReferralYn": this.isMannualReferal,
                "ReferralRemarks": this.remarks,
                "Vehicles" : orgCoverList
              }
              console.log("Final COvers",coverList,orgCoverList,ReqObj)
              this.finalFormSubmit(ReqObj);
            } 
          }
        }
      }
      else{
        ReqObj = {
          "RequestReferenceNo": this.quoteRefNo,
          "CreatedBy": createdBy,
          "ProductId": this.productId,
          "ManualReferralYn": this.isMannualReferal,
          "ReferralRemarks": this.remarks,
          "Vehicles" : coverList
        }
        this.finalFormSubmit(ReqObj);
      }
    }


  }
  finalFormSubmit(ReqObj){
        let urlLink = `${this.CommonApiUrl}quote/buypolicy`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
        if(data.Result){
          if(data?.Result.QuoteNo){
            this.quoteNo = data.Result?.QuoteNo;
            sessionStorage.setItem('quoteNo',data.Result?.QuoteNo);
            sessionStorage.setItem('quoteReferenceNo',data.Result?.RequestReferenceNo);
            this.updateComponent.quoteNo = data.Result?.QuoteNo;
            this.updateComponent.quoteRefNo = data.Result?.RequestReferenceNo;
            let clausesList: any[] = [],
            exclusionList: any[] = [],
            warrantiesList: any[] = [];
          //console.log("Cccccccc", this.CoversList);
          //console.log("VVVVVVVV", this.vehicleDetailsList);
          let vechileId: any;
          let sectionId: any;
          let i = 0;

          if(this.userType=='Broker'|| this.userType=='User'){
            this.onFinalProceed();
          }
          else{
            for (let v of this.vehicleDetailsList) {

              console.log('AAAAAAAAA',this.vehicleDetailsList)
              vechileId = v.VehicleId;
                sectionId = v.SectionId;
                 i++;
                if (v.Common) {
                   this.CommonMethod(v,i);
                }
                else{
                  if(i==this.vehicleDetailsList.length){
                    this.onFinalProceed();
                  }
                }

            }
          }

          // for (let v of this.vehicleDetailsList) {
          //   vechileId = v.VehicleId;
          //   sectionId = v.SectionId;
          //   i++;
          //   if (v.Common) {
          //     this.CommonMethod(v,i);
          //   }

          //   else{
          //     if(i==this.vehicleDetailsList.length) {

          //     }
          //   }

          // }

            /*if(this.productId=='3'){
              let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
              if(homeSession){
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
              }
              else{
                this.getExistingBuildingList();
              }

            }
            else if(this.productId !='3' && this.productId!='4'){
              if(this.emiYN=='Y'){
                this.insertEMIDetails();
              }
              else{
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
              }

            }
            else if(this.productId == '4'){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/travel-quote-details']);
            }*/
          }
          else if(data?.Result?.Status=='RP'){
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
              //   'Referral Quote',
              //   'Quote Moved to Referral Pending',
              //   config);
              this.router.navigate(['Home/referralPending']);
          }
        }
      },
      (err) => {
        this.sharedService.fnToastMoveHover("Quote Moved to Referral Pending");
       },
    );
  }

  CommonMethod(rowdata,i) {
    console.log('GHJK',rowdata,i);
    console.log('TTTTHHHHJ',this.vehicleDetailsList);
    let clauses
    let common
    let index=0
    /*for (let v of rowdata){
      common=v.Common;
      clauses=common.ClausesList
      index++;
    }*/


   clauses=rowdata.Common.ClausesList;
   let exclusion=rowdata.Common.ExclusionList;
   let warranties=rowdata.Common.WarrantyList;
   if(clauses==null || clauses==undefined){
    clauses=[];
   }
   if(exclusion == null || exclusion == undefined){
    exclusion=[];
   }
   if(warranties == null || warranties == undefined){
    warranties=[];
   }

    let newArr = [];

    let subId: any;
    let subDesc: any;
    let sub: any;
    let Desc: any;
    console.log("IIIIIIII", i);
    console.log('CLLLLLLLLLLLL',clauses);
    if (this.userType != "Broker") {
      /*if (clauses.length != 0) {
        clauses.forEach((item) => (item["Id"] = "6"));
        warranties.forEach((item) => (item["Id"] = "4"));
        exclusion.forEach((item) => (item["Id"] = "7"));
        console.log("EEEEEEEE", exclusion);
        console.log("iiii", clauses);
      } else if (warranties.length != 0) {
        warranties.forEach((item) => (item["Id"] = "4"));
        exclusion.forEach((item) => (item["Id"] = "7"));
        console.log("WWWWWWW", warranties);
      } else if (exclusion.length != 0) {
        exclusion.forEach((item) => (item["Id"] = "7"));
        console.log("EEEEEEEE", exclusion);
      }*/
      this.inserts = clauses.concat(warranties, exclusion);

      console.log("insert", this.inserts);

    } else {

       //this.inserts=this.selected
    }


    /*insert.map((item, index) => {
      this.vehicleDetailsList.push(insert[index]);
      this.vehicleDetailsList[index]['Insert'] = insert[index];
    });
    console.log('NNEEE',this.vehicleDetailsList);*/
    //this.vehicleDetailsList.concat(insert);
    let Req = {
      BranchCode: this.branchCode,
      CreatedBy: this.loginId,
      InsuranceId: this.insuranceId,
      ProductId: this.productId,
      QuoteNo: this.quoteNo,
      RiskId: rowdata.VehicleId,
      SectionId: rowdata.SectionId,
      TermsAndConditionReq: this.inserts,
      RequestReferenceNo: this.quoteRefNo
    };

    let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
      if (data.Result) {
        console.log('TOOOOOOOOO',i);
        console.log('VechileLength',this.vehicleDetailsList.length);
        if(i==this.vehicleDetailsList.length) {
          this.onFinalProceed();
        }
      }
    });
  }
  onFinalProceed(){
    if(this.emiYN=='Y' && this.emiPeriod!='N'){
      this.insertEMIDetails();
    }
    else{
      if(this.productId=='3'){
        let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
        if(homeSession){
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
        }
        else{
          this.getExistingBuildingList();
        }

      }

      else if(this.productId == '4'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/travel-quote-details']);
      }
      else if(this.productId=='32' || this.productId=='14' || this.productId=='15' || this.productId=='19'){
        // let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
        // if(homeSession){
           this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
        // }
        // else{
         // this.getExistingEserviceDetails();
        //}
      }
      else{
        
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
      }
    }
  }
  insertEMIDetails(){
      let ReqObj = {
        "QuoteNo":this.quoteNo,
        "InsuranceId": this.insuranceId,
        "ProductId":this.productId,
        "PolicyType":"1",
        "InstallmentPeriod":this.emiPeriod,
        "PremiumWithTax":this.localPremiumCost,
        "PaymentDetails":"Debit Card",
        "Status":"Y",
        "CreatedBy":this.loginId,
        "Remarks":"None"
      }
      let urlLink = `${this.CommonApiUrl}api/insertemitransactiondetails`
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.Result){
            //    if(this.onClauses=true){
            //      let Id:any;

            //      for(let clause of this.insertClause){
            //         Id= clause.Id;

            //      }

            //       let Req= {
            //     "BranchCode":this.branchCode,
            //     "CreatedBy":this.loginId,
            //     "InsuranceId":this.insuranceId,
            //     "ProductId":this.productId,
            //     "QuoteNo": this.quoteNo,
            //     "RiskId": "1",
            //     "SectionId": "2",
            //     "TermsAndConditionReq":this.insertClause

            // }
            // let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`
            // this.sharedService.onPostMethodSync(urlLink, Req).subscribe(
            //   (data: any) => {
            //       if(data.Result){
            //         this.insert=data.Result
            //       }},);
            //    }
              if(this.productId=='3'){
                let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
                if(homeSession){
                  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
                }
                else{
                  this.getExistingBuildingList();
                }

              }

              else if(this.productId == '4'){
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/travel-quote-details']);
              }
              else if(this.productId=='32' || this.productId=='14' || this.productId=='19'){
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
                // let homeSession = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
                // if(homeSession){
                  
                // }
                // else{
                //   this.getExistingEserviceDetails();
                // }
              }
              else{
                
                  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
              }
            }
          },
          (err) => { },
        );
  }
  getExistingEserviceDetails(){
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo,
      "RiskId":"1"
    }
    let urlLink = `${this.motorApiUrl}api/geteservicebyriskid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let customerDatas = data.Result;
        let commonDetails =[{
          "PolicyStartDate": customerDatas.PolicyStartDate,
          "PolicyEndDate":customerDatas.PolicyEndDate,
          "Currency":customerDatas.Currency,
          "SectionId":[customerDatas.SectionId],
          "AcexecutiveId":"",
          "ExchangeRate":customerDatas.ExchangeRate,
          "StateExtent":"",
          "NoOfDays": this.noOfDays,
          "HavePromoCode":customerDatas.Havepromocode,
          "Promocode": customerDatas.Promocode,
        }]
        sessionStorage.setItem('homeCommonDetails',JSON.stringify(commonDetails));
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
      },
      (err) => { },
    );
  }
  getExistingBuildingList(){
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo
    }
    let urlLink = `${this.motorApiUrl}home/getbuildingdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let customerDatas = data.Result[0];
        let commonDetails =[{
          "PolicyStartDate": customerDatas.PolicyStartDate,
          "PolicyEndDate":customerDatas.PolicyEndDate,
          "Currency":customerDatas.Currency,
          "SectionId":customerDatas.SectionId,
          "AcexecutiveId":"",
          "ExchangeRate":customerDatas.ExchangeRate,
          "StateExtent":"",
          "NoOfDays": this.noOfDays,
          "HavePromoCode":customerDatas.Havepromocode,
          "Promocode": customerDatas.Promocode,
        }]
        sessionStorage.setItem('homeCommonDetails',JSON.stringify(commonDetails));
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])
      },
      (err) => { },
    );
  }
  onUpdateFactor(type){
    if((this.statusValue!='' && this.statusValue!=null) || (this.endorsementSection && this.endorseCovers)){
      if(this.statusValue=='RA' || type=='calculate'){
        if(this.selectedCoverList.length!=0){
          let i=0;
          for(let vehicle of this.vehicleDetailsList){
              let entry = this.selectedCoverList.filter(ele=>ele.Id==vehicle.Vehicleid);
              if(entry.length!=0){
                let j=0; let covers = [];
                for(let veh of entry){
                    let k=0;
                    for(let selectedCover of veh.Covers){
                      let coverList = vehicle.CoverList.filter(ele=>ele.CoverId == selectedCover.CoverId)
                      covers = covers.concat(coverList);
                      k+=1;
                      if(k==veh.Covers.length){
                        j+=1;
                        if(j==entry.length){

                            let ReqObj = {
                              "RequestReferenceNo": this.quoteRefNo,
                              "VehicleId": veh.Id,
                              "SectionId": vehicle.SectionId,
                              "ProductId": this.productId,
                              "InsuranceId": this.insuranceId,
                              "Covers":covers
                            }
                            console.log("Final Req",vehicle,veh,ReqObj)
                            let urlLink = `${this.CommonApiUrl}api/updatefactorrate`;
                            this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
                              (data: any) => {
                                  if(data.Result){
                                    i+=1;
                                    if(i==this.vehicleDetailsList.length){
                                      if(type=='calculate'){
                                        //sessionStorage.removeItem('vehicleDetailsList');
                                        window.location.reload();
                                      }
                                      else if(!this.endorsementSection) this.updateReferralStatus();
                                    }
                                  }
                                },
                                (err) => { },
                              );
                        }
                      }
                    }
                    

                }
                    console.log("Entry",entry)
              }
              else{
                i+=1;
                if(i==this.vehicleDetailsList.length){
                  if(type=='calculate'){
                    //sessionStorage.removeItem('vehicleDetailsList');
                    window.location.reload();
                  }
                  if(!this.endorsementSection) this.updateReferralStatus();
                }
              }
          }
          // for(let veh of this.selectedCoverList){
          //  let entry = this.vehicleDetailsList.find(ele=>ele.Vehicleid==veh.Id);
          //  let ReqObj = {
          //   "RequestReferenceNo": this.quoteRefNo,
          //   "VehicleId": veh.Id,
          //   "SectionId": veh.SectionId,
          //   "ProductId": this.productId,
          //   "InsuranceId": this.insuranceId,
          //   "Covers":[]
          //  }
          //  let j=0;
          //  for(let cover of veh.Covers){
          //    let coverEntry = entry.CoverList.find(ele=>ele.CoverId==cover.CoverId);
          //    coverEntry['SubCoverYn'] = cover.IsSubCover;
          //    ReqObj.Covers.push(coverEntry);
          //    j+=1;
          //    if(j==veh.Covers.length){
          //     console.log("Final Vehicle List",ReqObj)
          //     let urlLink = `${this.CommonApiUrl}api/updatefactorrate`;
          //     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          //       (data: any) => {
          //           if(data.Result){
          //             i+=1;
          //             if(i==this.selectedCoverList.length){
          //               if(type=='calculate'){
          //                 //sessionStorage.removeItem('vehicleDetailsList');
          //                 window.location.reload();
          //               }
          //               if(!this.endorsementSection) this.updateReferralStatus();
          //             }
          //           }
          //         },
          //         (err) => { },
          //       );
          //    }
          //  }
          // }
        }
      }
      else{
        this.updateReferralStatus();
      }
    }

  }
  checkEndorseValue(rowData,type,menu){
      let endorse = rowData.Endorsements;
      
      if(endorse.length!=0){
        let entry = endorse[endorse.length-1];
        if(type == 'empty'){
            return (entry.PremiumIncludedTaxLC === 0 || entry.PremiumIncludedTaxLC == null)
        }
        else if(type=='value' && this.coverModificationYN=='N') return  entry.PremiumIncludedTaxLC;
        else if(type=='value'){
          let vehicleData = this.selectedCoverList.filter(ele=>ele.Id==menu.Vehicleid)
          if(vehicleData.length!=0){
            let sectionEntry = vehicleData.find(ele=>ele.SectionId == rowData.SectionId);
            if(sectionEntry!=undefined){
              let covers:any[] = sectionEntry.Covers;
              let findCover = covers.find(ele=>ele.CoverId==rowData.CoverId);
              if(findCover==undefined) return 0;
              else return entry.PremiumIncludedTaxLC
            }
          }
        }
      }
  }
  updateReferralStatus(){
    if(this.remarks == undefined) this.remarks = "";
    if(this.rejectedReason == undefined) this.rejectedReason = "";
      let ReqObj = {
        "RequestReferenceNo": this.quoteRefNo,
        "AdminLoginId": this.loginId,
         "ProductId": this.productId,
         "Status": this.statusValue,
         "AdminRemarks": this.remarks,
         "RejectReason": this.rejectedReason
      }
      let urlLink = `${this.CommonApiUrl}quote/update/referalstatus`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.Result){
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
              //   'Referral Quote Status',
              //   'Referral Status Updated Successfully',
              //   config);
              if(this.statusValue=='RP') this.router.navigate(['Admin/referralPending']);
              if(this.statusValue=='RR') this.router.navigate(['Admin/referralRejected']);
              if(this.statusValue=='RA') this.router.navigate(['Admin/referralApproved']);
              if(this.statusValue=='RE') this.router.navigate(['Admin/referralReQuote']);
            }
          },
          (err) => { },
        );
  }

  proceed()
  {

  }
  viewCondition(index){
    let QuoteNo:any;
    if(this.quoteNo!=undefined && this.quoteNo!="" && this.quoteNo!=null ){
      QuoteNo=this.quoteNo;
    }
    else{
      QuoteNo=null;
    }
    let ReqObj = {
      InsuranceId:this.insuranceId,
      BranchCode:this.branchCode,
      ProductId:this.productId,
      QuoteNo:QuoteNo,
      TermsId:"D",
      SectionId:this.vehicleDetailsList[index].SectionId,
      RequestReferenceNo: this.quoteRefNo

    }
    let urlLink = `${this.CommonApiUrl}api/viewtermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.viewList = data.Result;
          console.log(' view Condition Value',this.viewList);
          this.ClausesData = this.viewList.ClausesList;
          console.log('Clausss',this.ClausesData)
          this.WarrantyData = this.viewList.WarrantyList;
          this.WarrteData = this.viewList.WarrateList;
          this.ExclusionData = this.viewList.ExclusionList;
          if(this.userType=='Broker'){
            /*console.log('bbbbbbbbbbbbb',this.userType)
            this.ClauseColumnHeader;
            this.clause=true;*/

             //const isChecked=false;
             this.clause=true;
             this.ClauseColumnHeader =[
              { key: 'SubId', display: 'Clauses Id' },
              { key: 'SubIdDesc', display: 'Clauses Description' },

            ];
            this.ClausesDataId.map(x=>({
              ...x,
              isChecked:false
            }));

            this.ExclusionsColumnHeader =[


              { key: 'SubId', display: 'Exclusion Id' },
              { key: 'SubIdDesc', display: 'Exclusion Description' },

            ];
            this.ExclusionDataId.map(x=>({
              ...x,
              isChecked:false
            }));
            this.WarrantiesColumnHeader =[
              { key: 'SubId', display: 'Warranty Id' },
              { key: 'SubIdDesc', display: 'Warranty Description' },

            ];
            this.WarrantyDataId.map(x=>({
              ...x,
              isChecked:false
            }));
          }
          else{
            /*this.ClausesColumnHeader;
            this.clause=false;*/
            this.clause=false;
            this.ClausesColumnHeader =[
              {
                 key: 'EntryDate',
                 display: 'Select',
                 config: {
                   isChecked: true,
                   model:'isChecked'
                 },
               },

               { key: 'ClausesId', display: 'Clauses Id' },
               { key: 'ClausesDesc', display: 'Clauses Description',
               config: {
                Edit: true,
                model:'Edit'
              },},
               /*{ key:'Edit', display:'Edit',
               config: {
                Edit: true,
                model:'Edit'
              },}*/

             ];
             this.ClausesDataId.map(x=>({
               ...x,
               isChecked:false
             }));
             this.ExclusionColumnHeader =[
              {
                key: 'EntryDate',
                display: 'Select',
                config: {
                  isChecked: true,
                  model:'isChecked'
                },

              },

              { key: 'ExclusionId', display: 'Exclusion Id' },
              { key: 'ExclusionDesc', display: 'Exclusion Description' },
              { key:'Edit', display:'Edit',
              config: {
               Edit: true,
               model:'Edit'
             },}

            ];
            this.ExclusionDataId.map(x=>({
              ...x,
              isChecked:false
            }));
            this.WarrantyColumnHeader =[
              {
                key: 'EntryDate',
                display: 'Select',
                config: {
                  isChecked: true,
                  model:'isChecked'
                },
              },
              { key: 'WarrantyId', display: 'Warranty Id' },
              { key: 'WarrantyDesc', display: 'Warranty Description' },
              { key:'Edit', display:'Edit',
              config: {
               Edit: true,
               model:'Edit'
             },}

            ];

          }
          if(this.onClauses==true || this.onWarranty==true || this.onExclusion==true){
            let commonObj = {
              "ClausesList": this.ClausesData,
              "WarrantyList": this.WarrantyData,
              "ExclusionList": this.ExclusionData
            }
              this.vehicleDetailsList[index]["Common"] = commonObj;
          }
        }
      },
      (err) => { },
    );
  }

  ViewDropDown(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode":this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/termsandcondition`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data:any) => {
        if(data.Result){
          this.viewDropDown = data.Result;
          console.log('RR SSSS',this.vehicleDetailsList);
          console.log('DDDDDDDDDDDDDDD')
          //let list = data.Result
          let clauses = this.viewDropDown.filter(ele => ele.Code == '6')
          if(clauses) {
            this.onClauses=true;
            this.Id = "6";
            this.jsonList = [
              {
                "TermsId":null,
                 "Id":this.Id,
                "SubId":null,
                 "SubIdDesc":""
              }
            ]
          }
          let warranty = this.viewDropDown.filter(ele => ele.Code == '4')
          if(warranty){
            this.onWarranty=true;
            this.Ids = "4";
            this.json = [
              {
                "TermsId":null,
                 "Id": this.Ids,
                "SubId":null,
                 "SubIdDesc":""
              }
            ]
          }
          let Exclusion = this.viewDropDown.filter(ele => ele.Code == '7')
          if(Exclusion){ this.onExclusion = true;

            this.id = "7";
            this.ExclusionList = [
              {
                "TermsId":null,
                 "Id": this.id,
                "SubId":null,
                 "SubIdDesc":""
              }
            ]
        }

          /*for(let i = 0; i<this.vehicleDetailsList.length; i++) {
            console.log('EEEEEEEEEEEE',this.vehicleDetailsList)
            this.viewCondition(i);
          }*/

          //let i=0;
          //this.viewCondition(i);
          //i++;

          /*let i=0;
          for(let s of this.vehicleDetailsList){
            console.log('RSSSSSS',s)
            this.viewCondition(i);
            i++;
          }*/




        }
      },
      (err) => { },
    )
  }

  ClausesStatus(i,rowData){
    /*this.viewList[i]
    this.ClausesData = this.viewList[i].ClausesList;
    this.CoveList=false;
    this.onClauses = true;
    this.onWarranty=false;
    this.onWars = false;
    this.onExclusion = false;*/
    /*let rowData = this.vehicleDetailsList[i];
    if(rowData){
      this.VehicleSectionId = this.vehicleDetailsList;
      this.viewCondition(rowData);
    }*/

    let common:any;
    console.log('this',this.vehicleDetailsList)
    /*if(this.userType!='Broker'){
      this.viewCondition(i);
      let rowData = this.vehicleDetailsList[i];
      common=rowData.Common;
      this.common1=common.ClausesList;

     console.log('Common',this.common1)
    }*/

        console.log('TTTTTTT',this.vehicleDetailsList);
    this.CoveList=false;
   // this.ClausesSection=true;
    this.onClauses = true;
    this.onWarranty=false;
    this.onWars = false;
    this.onExclusion = false;
    this.clauses = true;
    this.warranty = false;
    this.Exclusion = false;
    if(this.productId!='3'){
      this.tempVehicleId = rowData.VehicleId;
    }
    else this.tempVehicleId = rowData.SectionId;
    

    this.tempData=rowData
  this.viewCondition(i);
  }
  WarrantyStatus(i,rowData){
    /*this.viewList[i]
    this.WarrantyData = this.viewList[i].WarrantyList;
    this.CoveList=false;
    this.onWarranty=true;
    this.onClauses = false;
    this.onWars = false;
    this.onExclusion = false;*/
    /*let rowData = this.vehicleDetailsList[i];
    if(rowData){
      this.VehicleSectionId = this.vehicleDetailsList;
      this.viewCondition(rowData);
    }*/
    this.CoveList=false;
   //this.WarrantySection=true;
    this.onWarranty=true;
    this.onClauses = false;
    this.onWars = false;
    this.onExclusion = false;

    this.warranty = true;
    this.clauses = false;
    this.Exclusion = false;
    let common

   /* if(this.userType!='Broker'){
      this.viewCondition(i);
      let rowData = this.vehicleDetailsList[i];
      common=rowData.Common;
      //this.common3=common.WarrantyList;
    }*/

console.log('Common',this.common3);
if(this.productId!='3'){
  this.tempVehicleId = rowData.VehicleId;
}
else this.tempVehicleId = rowData.SectionId;

this.tempData=rowData
this.viewCondition(i);

  }
  /*WarrateStatus(i){
    this.viewList[i]
    this.WarrteData = this.viewList[i].WarrateList;
    this.CoveList=false;
    this.onWars = true;
    this.onWarranty=false;
    this.onClauses = false;
    this.onExclusion = false;
  }*/
  ExclusioStatus(i,rowData){
    /*this.viewList[i]
    this.ExclusionData = this.viewList[i].ExclusionList;
    this.CoveList=false;
    this.onExclusion = true;
    this.onWarranty=false;
    this.onWars = false;
    this.onClauses = false;*/
    /*let rowData = this.vehicleDetailsList[i];
    if(rowData){
      this.VehicleSectionId = this.vehicleDetailsList;
      this.viewCondition(rowData);
    }*/
    this.CoveList=false;
    this.onExclusion = true;
    this.onWarranty=false;
    this.onWars = false;
    this.onClauses = false;
    this.Exclusion = true;
    this.warranty = false;
    this.clauses = false;

    let common
 /*if(this.userType!='Broker'){
  this.viewCondition(i);
  let rowData = this.vehicleDetailsList[i];
      common=rowData.Common;
      //this.common4=common.ExclusionList;
 }*/
console.log('Common',this.common4);
if(this.productId!='3'){
  this.tempVehicleId = rowData.VehicleId;
}
else this.tempVehicleId = rowData.SectionId;

this.tempData=rowData
this.viewCondition(i);
  }
  OnClose(){
    this.CoveList=true;
    this.onExclusion = false;
    this.onWarranty=false;
    this.onWars = false;
    this.onClauses = false;
    this.warranty = false;
    this.Exclusion = false;
    this.clause = false;
    this.clauses = false;
  }
  onCheckUser(i, event) {

    const checked = event.target.unchecked; // stored checked value true or false
     if (checked) {
      this.common1.push({ SubId: i });

       // push the Id in array if checked
        } else {
          /*let index = this.common1.findIndex(SubId =>SubId == Id);//Find the index of stored id
          this.common1.splice(index,1);*/
          //this.common1.splice(this.common1.findIndex(Id  => Id.SubId == i),1);
         this.common1=this.ClausesData.splice(i,1);

         //this.commonMethod(this.common2)
          console.log('IDDDDDDDDDDDS',i);
          console.log('cccccc',this.common1)
  //this.viewCondition(this.common1[i])
          /*let commonObj = {
            "ClausesList": this.common1,
              }*/

            //this.vehicleDetailsList[i].Common.ClausesList = this.common1;




          //console.log('SDFGH',this.common1.findIndex(Id  => Id.SubId))
          //console.log('INNNND',index)
        // Then remove
      }
   }
   /*commonMethod(common){
    let commons = {
      "ClausesList": this.common2,
      "WarrantyList": this.Wcommon,
      "ExclusionList": this.Ecommon
    }
      this.vehicleDetailsList[i]["Common"] = commons;
   }*/
   onCheck(i,event){
    const checked = event.target.unchecked; // stored checked value true or false
    if (checked) {
     this.common3.push({ SubId: i });

      // push the Id in array if checked
       } else {
         /*let index = this.common1.findIndex(SubId =>SubId == Id);//Find the index of stored id
         this.common1.splice(index,1);*/
         //this.common1.splice(this.common1.findIndex(Id  => Id.SubId == i),1);
        this.WarrantyData.splice(i,1);
        //this.commonMethod(this.Wcommon)

       console.log('YYYYYYYYYY',this.vehicleDetailsList)
         console.log('IDDDDDDDDDDDS',i);
   }
  }
  onUser(i,event){
    const checked = event.target.unchecked; // stored checked value true or false
    if (checked) {
     this.common4.push({ SubId: i });

      // push the Id in array if checked
       } else {
         /*let index = this.common1.findIndex(SubId =>SubId == Id);//Find the index of stored id
         this.common1.splice(index,1);*/
         //this.common1.splice(this.common1.findIndex(Id  => Id.SubId == i),1);
        this.common4= this.ExclusionData.splice(i,1);
        //this.commonMethod(this.Ecommon)


       console.log('YYYYYYYYYY',this.vehicleDetailsList)
         console.log('IDDDDDDDDDDDS',i);
   }
  }
  getSectionName(index){
    let rowData = this.vehicleDetailsList[index];
    return rowData.SectionName;
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


  saveChanges(tempData,jsonList){

    //let insert= this.jsonList.concat(this.json, this.Exclusion);
    let i=0;

    /*if (tempData.length != 0) {
      this.jsonList.forEach((item) => (item["Id"] = "6"));
      this.ExclusionList.forEach((item) => (item["Id"] = "4"));
      this.json.forEach((item) => (item["Id"] = "7"));
      console.log("EEEEEEEE", jsonList);
      console.log("iiii", this.json);
    } else if (this.json.length != 0) {
      this.ExclusionList.forEach((item) => (item["Id"] = "4"));
      this.ExclusionList.forEach((item) => (item["Id"] = "7"));
      console.log("WWWWWWW", this.ExclusionList);
    } else if (this.json.length != 0) {
      this.json.forEach((item) => (item["Id"] = "7"));
      console.log("EEEEEEEE", this.json);
    }*/

    //let insert=this.jsonList.concat(this.ExclusionList, this.json);


      //this.ClausesData.forEach((item) => (item["Id"] = "6"));
      //var funcs = [];
        //this.ClausesData.forEach((i) => funcs.push( () => i  ))
      console.log("EEEEEEEE", this.ClausesData);

   let clauses
     if(this.ClausesData!=null || this.ClausesData !=undefined){
      clauses= this.ClausesData.concat(this.jsonList);
     }
     else{
      clauses= this.jsonList
     }

    console.log('QQQQQ',this.quoteNo)
     let quote
 if(this.quoteNo){
  quote=this.quoteNo;
 }
 else{
   quote="";
 }

    console.log('SSSSSSSSSSSS',this.tempData)
    console.log('aaaaaaaaaaaaaa',this.jsonList)
    let Req = {
      BranchCode: this.branchCode,
      CreatedBy: this.loginId,
      InsuranceId: this.insuranceId,
      ProductId: this.productId,
      QuoteNo:quote,
      //TermsId:null,
      RiskId: this.tempData.VehicleId,
      SectionId:this.tempData.SectionId,
      TermsAndConditionReq:clauses,
      RequestReferenceNo: this.quoteRefNo
    };

    let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
      if (data.Result) {

        /*let vech= this.ClausesData.filter(
          (ele) => ele.SubIdDesc ==""
        );
        if(vech){

          let clauses = this.ClausesData

          clauses.concat(this.jsonList);

          console.log('clauses',clauses)
        }
        else{
          console.log("canot Added");

        }*/

        //this.ddata=data.Result;
        //this.ClausesData=this.ClausesData.concat(this.json);

        console.log('TOOOOOOOOO');
        console.log('VechileLength',this.vehicleDetailsList.length);
        //this.closes=false;
        $('#exampleModal').modal('hide');

        //exampleModel.hide()
        this.jsonList =[
          {
            "TermsId":null,
             "Id":this.Id,
            "SubId":null,
             "SubIdDesc":""
          }
        ];
        //this.jsonList.splice();


        //$('#ExclusionModal').modal('hide');
        //$('#WarrantyModel').modal('hide');

        this.ClausesStatus(i,this.tempData);
        this.onWarranty = false;
        this.onClauses = true;
        this.onWars = false;
        this.onExclusion = false;
        this.clauses=true;
        //window.location.reload();
      }
    });

  }
saveExclusion(tempData,ExclusionList){

  let i=0;

  let clauses
  if(this.ExclusionData!=null || this.ExclusionData !=undefined){
    clauses= this.ExclusionData.concat(this.ExclusionList);
   }
   else{
    clauses= this.ExclusionList
   }
  //= this.ExclusionData.concat(this.ExclusionList);
  console.log('Exclusion',this.tempData)
  console.log('Exclsuion',this.ExclusionList)
  let Req = {
    BranchCode: this.branchCode,
    CreatedBy: this.loginId,
    InsuranceId: this.insuranceId,
    ProductId: this.productId,
    QuoteNo:this.quoteNo,
    //TermsId:null,
    RiskId: this.tempData.VehicleId,
    SectionId:this.tempData.SectionId,
    TermsAndConditionReq:clauses,
  };

  let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
  this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
    if (data.Result) {

      this.ddata=data.Result;
      console.log('TOOOOOOOOO');
      console.log('VechileLength',this.vehicleDetailsList.length);
      //this.closes=false;
      //$('#exampleModal').modal('hide');
      $('#ExclusionModal').modal('hide');
      this.ExclusionList =[
        {
          "TermsId":null,
           "Id":this.id,
          "SubId":null,
           "SubIdDesc":""
        }
      ];
      //$('#WarrantyModel').modal('hide');

      this.ExclusioStatus(i,this.tempData)
      //window.location.reload();
    }
  });
}

saveWarranty(tempData,json){
  let i=0;

  let clauses
  if(this.WarrantyData !=null || this.WarrantyData !=undefined){
    clauses= this.WarrantyData.concat(this.json);
   }
   else{
    clauses= this.json
   }
  //let clauses = this.WarrantyData .concat(this.json);
  console.log('Warranty',this.tempData)
  console.log('Warranty',this.json)
  let Req = {
    BranchCode: this.branchCode,
    CreatedBy: this.loginId,
    InsuranceId: this.insuranceId,
    ProductId: this.productId,
    QuoteNo:"",
    //TermsId:null,
    RiskId: this.tempData.VehicleId,
    SectionId:this.tempData.SectionId,
    TermsAndConditionReq:clauses,
    RequestReferenceNo: this.quoteRefNo
  };

  let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
  this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
    if (data.Result) {

      this.ddata=data.Result;
      console.log('TOOOOOOOOO');
      console.log('VechileLength',this.vehicleDetailsList.length);
      //this.closes=false;
      //$('#exampleModal').modal('hide');
      //$('#ExclusionModal').modal('hide');
      $('#WarrantyModel').modal('hide');
      this.json = [
        {
          "TermsId":null,
           "Id": this.Ids,
          "SubId":null,
           "SubIdDesc":""
        }
      ]

      this.WarrantyStatus(i,this.tempData)
      //window.location.reload();
    }
  });
}

addItem(){
  //this.jsonList.push(row);
  let entry = [{
   "TermsId":null,
   "Id":this.Id,
   "SubId":null,
   "SubIdDesc":""
 }]
 this.jsonList = entry.concat(this.jsonList);
   }
   addwarranty(row){
     let entry = [{
       "TermsId":null,
       "Id":this.Ids,
       "SubId":null,
       "SubIdDesc":""
     }]
     this.json = entry.concat(this.json);
     //this.json.push(row);
   }
   addExclusion(row:any){
     let entry = [{
       "TermsId":null,
       "Id":this.id,
       "SubId":null,
       "SubIdDesc":""
     }]
     this.ExclusionList = entry.concat(this.ExclusionList);
   //this.ExclusionList.push(row);
   }

   delete(row:any)
   {
       const index = this.json.indexOf(row);
       this.json.splice(index, 1);
   }
   deleteClauses(row){
     const index = this.jsonList.indexOf(row);
     this.jsonList.splice(index, 1);
   }
   deleteExclusion(row){
     const index = this.ExclusionList.indexOf(row);
     this.ExclusionList.splice(index, 1);
   }


}
