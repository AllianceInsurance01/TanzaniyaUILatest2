import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../shared/shared.service';
import { DatePipe } from '@angular/common';
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-travel-passenger-details',
  templateUrl: './travel-passenger-details.component.html',
  styleUrls: ['./travel-passenger-details.component.scss']
})
export class TravelPassengerDetailsComponent implements OnInit {
  quoteDetails: any;
  quoteNo: any;
  Riskdetails: any[] = [];
  CoverList: any[]=[];
  endorsementSection: boolean;

  drivenBy:any="D";gpsYn:any="Y";windYN:any="Y";minDate:Date;
  productList:any[]=[];productValue:any="";motorYN:any="Y";
  claimsYN:any="Y";playerType:any="R";collateralYN:any="N";
  title: any;Address1:any;Address2:any;
  borrowerList:any[]=[];borrowerValue:any;fleetYN:any="N";
  collateralValue:boolean = false;fleetValue:boolean=false;customerData2:any[]=[];
  searchList:any[]=[];searchBy:any;addSection:boolean = false;
  customerData:any[]=[];customerHeader:any[]=[];customerHeader2:any[]=[];
  PassengerHeader:any[]=[];
  relationship:any []=[];city:any []=[];
  finalSection: boolean;currentIndex:number;
  requestReferenceNo:any=null;titleValue:any;
  vehicleDetailsList: any[]=[];passengerSection:boolean=true;
  vehicleDetails: any;titleList:any[]=[];
  travelId: any;maxDate:Date;
  PassengerDetails:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public UploadUrl: any = this.AppConfig.ExcelUrl;
  totalCount: number;Age:any;userDetails:any;
  customerDetails: any;loginId:any;userType:any;
  FirstName:any;LastName:any;GenderId:any;dob:any;MobileNo:any;PassportNo:any;relationshipId:any;
  CivilId: any;agencyCode:any;branchCode:any;productId:any;insuranceId:any;
  passengerId: any;countryList:any[]=[];kidTrashSection:boolean=false;
  country: any;groupId:any;adultTrashSection:boolean=false;seniorTrashSection:boolean=false;
  postBoxNo: any;superSeniorTrashSection:boolean=false;grandSeniorTrashSection:boolean=false;
  validRecordsList: any;
  p: Number = 1;
  passengerCountList: any[]=[];
  historyRecordsList: any[]=[];
  PassengerFirstName: any=null;
  PassengerLastName: any=null;
  RelationId: any=null;
  Dob: any=null;
  Nationality: any=null;
  editSection: boolean=false;
  relationShipList: any;
  firstNameError: boolean;
  lastNameError: boolean;
  relationShipError: boolean;
  genderError: boolean;
  DobError: boolean;
  passportError: boolean;
  NationalityError: boolean;
  relationshipDesc: any=null;
  PassengerId: any=null;GroupId:any=null;
  GroupIdError: boolean;
  editIndex: any=null;
  enableEmployeeUploadSection: boolean=false;
  showEmpRecordsSection: boolean;
  uploadDocList: any[]=[];
  employeeUploadRecords: any[]=[];
  uploadStatus: any;
  showgrid: boolean=false;
  imageUrl: any=null;
  enableEmployeeEditSection: boolean=false;
  errorRecords: any[]=[];
  employeeList:any[]=[];
  originalEmployeeList: any[]=[];
  loginType: any;

  constructor(private router:Router,private updateComponent:UpdateCustomerDetailsComponent,
    private datePipe:DatePipe,private sharedService: SharedService,) {
      this.quoteNo = sessionStorage.getItem('quoteNo');
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      this.minDate = new Date(year, month-3, day-1);
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if(this.userDetails.Result.LoginType) this.loginType = this.userDetails.Result.LoginType;
    let quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    if(quoteRefNo) this.requestReferenceNo = quoteRefNo;
    
    this.searchList = [
      { "Code":"01","CodeDesc":"Chassis Number"},
      { "Code":"02","CodeDesc":"Register Number"},
    ];
    this.customerHeader =  [
      { key: 'PassengerFirstName', display: 'PassengerName' },
      { key: 'MobileNo', display: 'MobileNo' },
     { key: 'PassportNo', display: 'Passport no' },
      { key: 'RelationShip', display: 'RelationShip' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
          isRemove: true,
        },
      }
    ];

    this.PassengerHeader =  [
      { key: 'PassengerFirstName', display: 'First Name' },
      { key: 'PassengerLastName', display: 'Last Name' },
     { key: 'RelationDesc', display: 'Relation' },
     {key:'Dob', display:'Date Of Birth'},
     {key:'PassportNo',display:'PassportNo'},
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
          isRemove: true,
        },
      }
    ];
    this.customerHeader2 =  [
      {
        key: 'actions',
        display: 'Select',
        config: {
          select: true,
        },
      },
      { key: 'Name', display: 'Name' },
      { key: 'MobileNo', display: 'MobileNo' },
      { key: 'PassportNo', display: 'PassportNo' },
      { key: 'RelationShip', display: 'RelationShip' },


    ];
    this.customerData = [
      {
       "Name": "Praveen Kumar",
       "MobileNo": "758421547",
       "PassportNo": "CN867547466",
       "RelationShip": "Self"
      },
      {
        "Name": "Srinidhi",
        "MobileNo": "758421568",
        "PassportNo": "CN867547577",
        "RelationShip": "Wife"
       },
    ];
    this.customerData2 = [
      {
        "ReqRegNumber": "T354DGH",
        "ReqChassisNumber": "BAVFE85CGFSY02452",
        "ReqRequestId": "EWAY270920220056",
        "ReqCompanyCode": "ICC105",
        "ReqSystemCode": "LSYS_EWAYINSURANCE_001",
        "ReqMotorCategory": "1",
        "ReqMsgSignature": "Qxe5mX1UGuysBsI6jXHRHRc2uVSVNG+++lSR+LXoBlGyoq1NLIR8Un0MoIZaNRNtIpNBSVrXqAMMwdhWdjPKUN0oB9wu1DIV/ox6dfaRYG3TNxi5Yj4sSs2MVFQicITyy1PHF0gO1Gdpz0IbYQPWxoOJsn9wrUo3NEz9Gku6LraKbXOpklxvY/Img5Sn5BnGZ+r5csGaakEaC5jPc/6Hx77uE1aCEZISmPciMBuR/ACSXQA86Th6knpxl9GHaXdTAroTwfFAeXXJmh3zbs8EAa8ucsMgQsZm7eSEx+9fzd764zRccOC8MD29uNuIrkudRdzO2HnGBLyaWJbmwyaw8Q==",
        "EntryDate": "06/10/2022",
        "Status": "Y",
        "CreatedBy": null,
        "ResResponseId": "202210061752030155293",
        "ResRequestId": "EWAY270920220056",
        "ResStatusCode": "TIRA001",
        "ResStatusDesc": "Successful",
        "MotorCategory": "1",
        "Registrationnumber": "T354DGH",
        "Chassisnumber": "BAVFE85CGFSY02452",
        "Vehiclemake": "Mitsubishi",
        "Vehcilemodel": "MITSUBISHI",
        "VehicleType": "Mobile equipment",
        "Color": "White",
        "EngineNumber": "4D33P27300",
        "ResEngineCapacity": "4214",
        "FuelType": "Diesel",
        "NumberOfAxels": "2",
        "AxelDistance": "0.0",
        "SeatingCapacity": "5",
        "ManufactureYear": "2015",
        "Tareweight": "7000.0",
        "Grossweight": "7200.0",
        "Motorusage": "Private Car",
        "ResOwnerName": "CRDB BANK PUBLIC LIMITED COMPANY  ",
        "OwnerCategory": "Company",
        "ResMsgSignature": "qPNQqMCL5tOTq3V/B7lNPi87f7A/bGIwDVDgn2d2QSoytEI35v6l1tkAuI+NtV2NnOTLHm8tgB8WgNLblmvysse9NGAJD0+1sRa3eCvld4V9jxETseOK+OTrZwDv0ETIakJ3EvziqNSa6EvXfUtWkvTBj1EU2F9KQqM2d+n5Gf2m+Ltg6bYag1KDwbjEygYux8sPgz3Ig1nOnoR6dFPhaDQ9rDHRn52ZlWofvu6AV7FI8jrq7UW7UdZVekrFYs03rMRrKgdVNN37JO/gH4Dquy2E8PbbdtkejB3hHscFiWQcgmtDAcfnjzbFfVgrKa2MChk8G6K7bnqLmrSo69aCkQ=="
    }
    ]
    this.borrowerList = [
      {"Code":"01","CodeDesc":"Bank"},
      {"Code":"02","CodeDesc":"Individual"},
    ];
    
    // this.relationship=[
    //   {"Code":"1","CodeDesc":"Self"},
    //   {"Code":"2","CodeDesc":"Wife"},

    // ]
    this.city=[
      {"Code":"1","CodeDesc":"Madurai"},
      {"Code":"2","CodeDesc":"Chennai"},

    ]
    this.getCountryList();
    //this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    //let coverListObj = JSON.parse(sessionStorage.getItem('travelCoverListObj'));
    //if(coverListObj){
      //this.getCoverList(coverListObj);
    //}
    this.vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetails'));

   }

  ngOnInit(): void {
    // let TravelObj = JSON.parse(sessionStorage.getItem('travelCoverListObj'));
    // if(TravelObj){
    //   this.travelId = TravelObj?.TravelId;
    this.getPassengerCountList();
      this.getpassengerDetails(0);
      this.getEditQuoteDetails();
    
  }
  checkActiveVehicles(){
    if(this.PassengerDetails.length==0) return false;
    else if(this.PassengerDetails.length==1) return true;
    else {
      var exist=this.PassengerDetails.some(ele=>ele.PassengerFirstName==null);
      return !exist;
    }

  }

  getEditQuoteDetails(){
    let ReqObj = {
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
    // let ReqObj = {
    //   "ProductId": this.productId,
    //   "RequestReferenceNo": this.quoteRefNo
    // }
    // let urlLink = `${this.CommonApiUrl}api/view/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
          console.log("Data**",data?.Result);
          this.quoteDetails = data?.Result?.QuoteDetails;
          // this.Riskdetails = data?.Result?.RiskDetails;
           this.customerDetails=data?.Result?.CustomerDetails;
          // for (let cover of this.Riskdetails) {
          //   let j = 0;
          //   for (let section of cover?.SectionDetails) {
          //     let CoverData = section.Covers;
          //     for (let subsectioncover of section?.Covers) {
          //       console.log("subsectioncover", subsectioncover);
          //       if (cover?.totalPremium) {
          //         cover['totalLcPremium'] = cover['totalLcPremium'] + subsectioncover?.PremiumIncludedTaxLC;
          //         cover['totalPremium'] = cover['totalPremium'] + subsectioncover?.PremiumIncludedTax;
          //       }
          //       else {
          //         cover['totalLcPremium'] = subsectioncover?.PremiumIncludedTaxLC;
          //         cover['totalPremium'] = subsectioncover?.PremiumIncludedTax;

          //       }
          //       let baseCovers = [], otherCovers = [];
          //       baseCovers = CoverData.filter(ele => ele.CoverageType == 'B');
          //       otherCovers = CoverData.filter(ele => ele.CoverageType != 'B');
          //       section.Covers = baseCovers.concat(otherCovers);
          //       console.log("otherCovers", CoverData);
          //       this.CoverList.push(cover);
          //       console.log("CoverList", this.CoverList);
          //       if (j == cover?.SectionDetails) {
          //         this.CoverList.push(cover);
          //         console.log("vehicleList", this.CoverList);
          //       }
          //       else j += 1;
          //     }
          //   }
          // }
        }
      },
      (err) => { },
    );
  }

  getCountryList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/nationality`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.countryList = data.Result;
            this.getTitleList();
        }
      },
      (err) => { },
    );
  }
  getTitleList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/title`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
           this.titleList = data.Result;
        }
      },
      (err) => { },
    );
  }
  getRelationshipList(type){
    if(type=='change'){
      this.RelationId = '';
    }
    let ReqObj ={
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode,
      "Gender":this.GenderId
    }
    let urlLink = `${this.CommonApiUrl}dropdown/relationtype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = [{'Code':null,"CodeDesc":"- - Select - -"}]
          this.relationShipList = defaultObj.concat(data.Result);
          if(this.historyRecordsList.length==0 && type=='change'){
            if(this.GenderId == 'M'){
              this.RelationId = '9';
            }
            else if(this.GenderId == 'F'){
              this.RelationId = '10';
            }
          } 
          
          // this.PassengerDetails[index]['relationship'] = data.Result;
          // if(index==0 &&  this.PassengerDetails[index].RelationId == null) this.PassengerDetails[index].RelationId = "9";
        }
      },
      (err) => { },
    );
  }
  onCollateralChange(){
    console.log("final collateral",this.collateralYN);
    if(this.collateralValue) this.collateralYN = "Y";
    else this.collateralYN = "N";
  }
  onFleetChange(){
    if(this.fleetValue) this.fleetYN = "Y";
    else this.fleetYN = "N";
  }
  onGetBack(){
    let value = sessionStorage.getItem('vehicleType');
      if(value=='edit'){

        this.router.navigate(['/Travel/customerDetails/excess-discount']);
      }
      if(value=='new'){
        this.router.navigate(['/Travel/customerDetails/excess-discount']);
      }
  }
  onAddVehicle(value){
    sessionStorage.setItem('vehicleType',value);
    this.updateComponent.resetVehicleTab();
      if(value=='edit'){

        this.router.navigate(['/Travel/customerDetails/vehicle-details']);
      }
      if(value=='new'){
        this.router.navigate(['/Travel/newQuoteDetails/motor-details']);
      }

  }
  onEditCovers(value){
    sessionStorage.setItem('vehicleType','edit');
    this.updateComponent.resetVehicleTab();
    this.router.navigate(['/Travel/customerDetails/vehicle-details']);

  }

  onNextVehicle(type){
    let quoteNo=sessionStorage.getItem('quoteNo');
    let i=0;let passengerList:any[] = [];
    for(let passenger of this.PassengerDetails){
      let entry = {
        "Age": passenger.Age,
        "City": null,
        "CivilId": null,
        "Dob": passenger.Dob,
        "GenderId": passenger.GenderId,
        "GroupId": passenger.GroupId,
        "CreatedBy": this.loginId,
        "Natinality": passenger.Nationality,
        "PassengerId": passenger.PassengerId,
        "PassengerLastName": passenger.PassengerLastName,
        "PassengerFirstName": passenger.PassengerFirstName,
        "PassportNo": passenger.PassportNo,
        "QuoteNo": quoteNo,
        "RelationId": passenger.RelationId,
        "StateCode": null
      }
      if(entry.Dob!='' && entry.Dob!=null && entry.Dob!=undefined){
        entry['Dob'] = this.datePipe.transform(entry.Dob, "dd/MM/yyyy");
      }
      passengerList.push(entry);
      i+=1;
      if(i==this.PassengerDetails.length){
          // let ReqObj = {
            
          // }
          let urlLink = `${this.motorApiUrl}api/updatepassdetails`;
          this.sharedService.onPostMethodSync(urlLink, passengerList).subscribe(
            (data: any) => {
              if(data.Result){
                  console.log("Received Type ",type)
                  this.checkValidPassengers();
              }
            },
            (err) => { },
          );
      }
    }
    
        
  }
  onSavePassengerRow(){
    let i=0;
    this.firstNameError=false;this.lastNameError=false;this.DobError=false;this.NationalityError=false;
    this.genderError = false;this.relationShipError =false;this.passportError = false;this.GroupIdError=false;
    if(this.PassengerFirstName==null){i+=1;this.firstNameError=true;}
    if(this.PassengerLastName==null){i+=1;this.lastNameError = true;}
    if(this.GenderId==null){i+=1;this.genderError = true;}
    if(this.RelationId==null){i+=1;this.relationShipError = true;}
    if(this.RelationId!=null){this.relationshipDesc = this.relationShipList.find(ele=>ele.Code==this.RelationId)?.CodeDesc;}
    if(this.Dob==null){i+=1;this.DobError = true;}
    if(this.PassportNo==null){i+=1;this.passportError = true;}
    if(this.Nationality==null){i+=1;this.NationalityError = true;}
    if(i==0){
      let entry = {
        "Dob": this.datePipe.transform(this.Dob,'dd/MM/yyyy'),
        "GenderId": this.GenderId,
        "GroupId": this.GroupId,
        "Nationality": this.Nationality,
        "PassengerFirstName": this.PassengerFirstName,
        "PassengerId": this.PassengerId,
        "RelationDesc": this.relationshipDesc,
        "PassengerLastName": this.PassengerLastName,
        "PassportNo": this.PassportNo,
        "RelationId": this.RelationId
      }
      if(this.editIndex==null) this.historyRecordsList.push(entry);
      else this.historyRecordsList[this.editIndex] = entry;
      this.editSection = false;
    }
  }
  onDobChange(index){
    let Dob = this.PassengerDetails[index].Dob;
    let timeDiff = Math.abs(Date.now() - Dob.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    this.PassengerDetails[index].Age = age;
  }
  onPreviousVehicle(){
     this.addSection=false;
     //this.currentIndex = 1;
     this.currentIndex=this.currentIndex-1;
     /*if(this.PassengerDetails[this.currentIndex-1]?.Active==true){
      this.travelId = String(this.PassengerDetails[this.currentIndex-1].Travelid);
      //this.getpassengerDetails()
    }
    else{

      //this.motorDetails = this.vehicleDetailsList[this.currentIndex-1];
      this.totalCount = this.PassengerDetails.length;
      this.PassengerDetails = this.PassengerDetails[this.currentIndex-1];
      //console.log("Motor Details",this.motorDetails);
      //this.setTravelValues();
    }*/

      $('#slider_0').removeClass('active w3-animate-right');
      $('#slider_0').addClass('active w3-animate-left');


    //this.router.navigate(['/Travel/customerDetails/customer-details']);

  }
  /*vehicleId(vehicleId: any, arg1: string) {
    throw new Error('Method not implemented.');
  }*/
  getEditTravelDetails(type)
  {

  }
  getPassengerCountList(){
    let quoteNo=sessionStorage.getItem('quoteNo');
    let ReqObj =  {
      "QuoteNo": quoteNo,
    }
    //let urlLink = `${this.motorApiUrl}api/getmotordetails`;
    let urlLink = `${this.CommonApiUrl}quote/groupsuminsureddetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
              this.passengerCountList = data?.Result;
        }
      },
      (err) => { },
    );
  }
  getpassengerDetails(index){
  let quoteNo=sessionStorage.getItem('quoteNo');
  let ReqObj =  {
    "QuoteNo": quoteNo,
  }
   //let urlLink = `${this.motorApiUrl}api/getmotordetails`;
   let urlLink = `${this.motorApiUrl}api/getactiverpassengers`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        this.historyRecordsList = data.Result;
        this.enableEmployeeUploadSection = false;
        this.uploadStatus = null;this.showgrid=false;
        this.enableEmployeeEditSection = false;this.editSection=false;
        // this.validRecordsList = data.Result;
        // this.getHistoryRecords(data.Result);
        // this.PassengerDetails = data.Result;
        // this.passengerSection = true;
        // this.setTravelValues();
      }
    },
    (err) => { },
  );
}
AddPassenger(){
    this.PassengerFirstName = null;this.PassengerLastName=null;this.GenderId=null;
    this.RelationId = null;this.Dob = null;this.Nationality=null;this.PassportNo=null;
    this.editSection = true;this.PassengerId=null;this.GroupId=null;
    this.editIndex = null;
}
onUploadDocuments(target:any,fileType:any,type:any,uploadType){
  console.log("Event ",target);
  this.imageUrl = null;this.uploadDocList=[];
  let event:any = null;
  if(uploadType=='drag') event = target
  else event = target.target.files;

  let fileList = event;
  for (let index = 0; index < fileList.length; index++) {
    const element = fileList[index];
    var reader:any = new FileReader();
    reader.readAsDataURL(element);
      var filename = element.name;

      let imageUrl: any;
      reader.onload = (res: { target: { result: any; }; }) => {
        imageUrl = res.target.result;
        this.imageUrl = imageUrl;
        this.uploadDocList.push({ 'url': element,'DocTypeId':'','filename':element.name, 'JsonString': {} });

      }

  }
  console.log("Final File List",this.uploadDocList)
}
onUploadEmployeeDetails(){
    if(this.uploadDocList.length!=0 && this.historyRecordsList.length!=0){
      Swal.fire({
        title: '<strong>Merge / Replace Records</strong>',
        icon: 'info',
        html:
          `<ul class="list-group errorlist">
           <li>Some Employee Details You Already Stored</li>
           <li>Do You Want to Clear Old Records?</li>
       </ul>`,
        showCloseButton: false,
        //focusConfirm: false,
        showCancelButton:true,

       //confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Merge With Old Records',
       cancelButtonText: 'Clear Old Records',
      }).then((result) => {
        if (result.isConfirmed) {
              this.onProceedUpload('Merge')
        }
        else{
          this.onProceedUpload('Add')
        }
      })
    }
    else{
      this.onProceedUpload('Add')
    }
}
onProceedUpload(type){
  let typeId=null;
  // if(this.productId=='32') typeId = '104';
  // else if(this.productId=='14') typeId='102';
  // else if(this.productId=='15') typeId='103';
  let SectionId = null;
  if(this.productId=='4') SectionId = '24'; typeId='105';
  let ReqObj={
    "CompanyId":this.insuranceId,
    "ProductId":this.productId,
    "QuoteNo":this.quoteNo,
    "RiskId":"1",
    "RequestReferenceNo":this.requestReferenceNo,
    "TypeId":typeId,
    "LoginId":this.loginId,
    "SectionId":SectionId,
    "UploadType": type,
  }
  let urlLink = `${this.UploadUrl}eway/vehicle/batch/upload`;
      this.sharedService.onPostExcelDocumentMethodSync(urlLink, ReqObj,this.uploadDocList[0].url).subscribe(
        (data: any) => {
            if(data){
              let res = data;
              if(res?.ProgressStatus=='P'){
                this.checkUploadStatus();
              }
            }
        },  
        (err) => { },
      );
}
checkUploadStatus(){
  let ReqObj={
    "CompanyId":this.insuranceId,
    "ProductId":this.productId,
    "RequestRefNo":this.requestReferenceNo
  }
  let urlLink = `${this.UploadUrl}eway/vehicle/get/transaction/status`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data){
              let res = data?.Result;
              if(res.Status=='S'){
                    this.getValidRecordDetails();
              }
              else if(res.Status=='E'){
                this.uploadStatus = 'Upload Failed..Please Try Again...'
                setTimeout(() => 
                {
                  this.uploadDocList = [];
                  if(this.productId!='32'){
                    this.enableEmployeeUploadSection = true;
                    this.uploadStatus = null;
                    this.enableEmployeeEditSection = false;
                  }
                
                
              }, (4*1000));
              }
              else{
                this.uploadStatus = res?.StatusDesc;
                setTimeout(() => this.checkUploadStatus(), (2*1000));
              }
            }
          },  
          (err) => { },
        );
}
updateEmployeeRecordsTable(){
  let ReqObj = {
    "CompanyId":this.insuranceId,
    "ProductId":this.productId,
    "RequestRefNo":this.requestReferenceNo,
    "QuoteNo": this.quoteNo,
    "RiskId": "1",
    "Status": "Y"
  }
  let urlLink = `${this.UploadUrl}eway/vehicle/insert/records`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data){
              let res = data?.Result;
              if(res){
                  this.enableEmployeeUploadSection = false;
                  this.enableEmployeeEditSection = false;
                this.errorRecords = [];this.uploadStatus=null;
                this.getpassengerDetails(0);
              }
            }
        },  
        (err) => { },
      );
}
getEmployeeDetails(){
  let SectionId = null;
  if(this.productId=='4') SectionId = '24';
  let ReqObj = {
    "QuoteNo": this.quoteNo,
     "RiskId": "1",
     "SectionId": SectionId
  }
  let urlLink = `${this.motorApiUrl}api/getallproductemployees`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data?.Result){
       
          this.employeeList = data?.Result;
          console.log('OOOOO',this.employeeList);
       
          this.originalEmployeeList = new Array().concat(data?.Result);
          if(this.employeeList.length!=0 && this.productId!=='32'){
            //this.getTotalSICost('Employee');
          }
      }
    });
}
getValidRecordDetails(){
  let ReqObj={
    "CompanyId":this.insuranceId,
    "ProductId":this.productId,
    "RequestRefNo":this.requestReferenceNo
  }
  let urlLink = `${this.UploadUrl}eway/vehicle/getUploadTransaction`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data){
              let res = data?.Result;
              if(res){
                if(this.productId!=32){
                  this.employeeUploadRecords = [res];
                  this.showEmpRecordsSection = true;
                }
             
                if(res?.ErrorRecords!=null && res?.ErrorRecords!='0') this.getErrorRecords();
                else this.errorRecords = [];
              }
            }
          },  
          (err) => { },
        );
}
getErrorRecords(){
  let ReqObj={
    "CompanyId":this.insuranceId,
    "ProductId":this.productId,
    "RequestRefNo":this.requestReferenceNo,
    "QuoteNo":this.quoteNo,
    "RiskId":"1",
    "Status": 'E'
  }
  let urlLink = `${this.UploadUrl}eway/vehicle/get/recordsByStatus`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data){
              let res = data?.Result;
              if(res){
                  this.errorRecords = data.Result;
                  console.log('OOOOOOOO',this.errorRecords);
              }
            }
        },
        (err) => { },
        ); 
}
UploadTravel(){
  this.showgrid=true;
  this.enableEmployeeUploadSection=true;
  this.showEmpRecordsSection = false;
  this.uploadDocList=[];
  this.employeeUploadRecords = [];
  this.uploadStatus = null;
}
getHistoryRecords(passengerList){
  let quoteNo=sessionStorage.getItem('quoteNo');
  let ReqObj =  {
    "QuoteNo": quoteNo,
  }
   //let urlLink = `${this.motorApiUrl}api/getmotordetails`;
   //let urlLink = `${this.motorApiUrl}api/getallpasshistorydetails`;
   let urlLink = `${this.motorApiUrl}api/getactiverpassengers`
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
       let historyRecords = data.Result;
       this.historyRecordsList = data.Result
       if(historyRecords.length!=0){
        let adultList = historyRecords.filter(ele=>ele.GroupId=='2');
        let kidList = historyRecords.filter(ele=>ele.GroupId=='1');
        let seniorList = historyRecords.filter(ele=>ele.GroupId=='3');
        let superSeniorList = historyRecords.filter(ele=>ele.GroupId=='4');
        let grandSeniorList = historyRecords.filter(ele=>ele.GroupId=='5');
        let adultPassList = passengerList.filter(ele=>ele.GroupId=='2');
        let kidPassList = passengerList.filter(ele=>ele.GroupId=='1');
        let seniorPassList = passengerList.filter(ele=>ele.GroupId=='3');
        let superSeniorPassList = passengerList.filter(ele=>ele.GroupId=='4');
        let grandSeniorPassList = passengerList.filter(ele=>ele.GroupId=='5');
        this.PassengerDetails =[];
        let adultSection=false,kidSection=false,seniorSection=false,superSeniorSection=false,grandSeniorSection=false;
        if(adultList.length!=0){
            if(adultPassList.length!=0){
                if(adultList.length>=adultPassList.length){
                  if(adultList.length==adultPassList.length){this.adultTrashSection = false;} 
                  else{this.adultTrashSection = true}
                  this.PassengerDetails = this.PassengerDetails.concat(adultList);
                  adultSection = true;
                  this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
                }
                else{
                  this.adultTrashSection = false;
                  if(adultPassList.length>adultList.length){
                    let i=0;
                    for(let pass of adultPassList){
                      let entry = adultList.filter(ele=>ele.PassengerId==pass.PassengerId)
                      if(entry.length!=0) adultPassList[i] = entry[0];
                      i+=1;
                      if(i==adultPassList.length){
                        this.PassengerDetails = this.PassengerDetails.concat(adultPassList)
                        adultSection = true;
                        this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
                      }
                    }
                  }
                }
            }
            else{
              this.adultTrashSection = true;
              this.PassengerDetails = this.PassengerDetails.concat(adultList);
              adultSection = true;
              this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
            }
        }
        else if(adultPassList.length!=0){
          this.adultTrashSection = false;
          this.PassengerDetails = this.PassengerDetails.concat(adultPassList)
          adultSection = true;
          this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
        }
        else{adultSection = true; this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);}
        if(kidList.length!=0){
          if(kidPassList.length!=0){
              if(kidList.length>=kidPassList.length){
                if(kidList.length==kidPassList.length){this.kidTrashSection = false;} 
                else{this.kidTrashSection = true}
                this.PassengerDetails = this.PassengerDetails.concat(kidList)
                kidSection = true;
                this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
              }
              else{
                this.kidTrashSection = false;
                if(kidPassList.length>kidList.length){
                  let i=0;
                  for(let pass of kidPassList){
                    let entry = kidList.filter(ele=>ele.PassengerId==pass.PassengerId)
                    if(entry.length!=0) kidPassList[i] = entry[0];
                    i+=1;
                    if(i==kidPassList.length){
                      this.PassengerDetails = this.PassengerDetails.concat(kidPassList)
                      kidSection = true;
                      this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
                    }
                  }
                }
              }
          }
          else{
            this.kidTrashSection = true;
            this.PassengerDetails = this.PassengerDetails.concat(kidList);
            kidSection = true;
            this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
          }
        }
        else if(kidPassList.length!=0){
          this.kidTrashSection = false;
          this.PassengerDetails = this.PassengerDetails.concat(kidPassList)
          kidSection = true;
          this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
        }
        else{
          kidSection = true;
          this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
        }
        if(seniorList.length!=0){
          if(seniorPassList.length!=0){
              if(seniorList.length>=seniorPassList.length){
                if(seniorList.length==seniorPassList.length){this.seniorTrashSection = false;} 
                else{this.seniorTrashSection = true}
                this.PassengerDetails = this.PassengerDetails.concat(seniorList)
                seniorSection = true;
                this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
              }
              else{
                this.seniorTrashSection = false;
                if(seniorPassList.length>seniorList.length){
                  let i=0;
                  for(let pass of seniorPassList){
                    let entry = seniorList.filter(ele=>ele.PassengerId==pass.PassengerId)
                    if(entry.length!=0) seniorPassList[i] = entry[0];
                    i+=1;
                    if(i==seniorPassList.length){
                      this.PassengerDetails = this.PassengerDetails.concat(seniorPassList)
                      seniorSection = true;
                      this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
                    }
                  }
                }
              }
          }
          else{
            this.seniorTrashSection = true;
            this.PassengerDetails = this.PassengerDetails.concat(seniorList);
            seniorSection = true;
            this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
          }
        }
        else if(seniorPassList.length!=0){
          this.seniorTrashSection = false;
          this.PassengerDetails = this.PassengerDetails.concat(seniorPassList)
          seniorSection = true;
          this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
        }
        else{
          seniorSection = true;
          this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
        }
        if(superSeniorList.length!=0){
          if(superSeniorPassList.length!=0){
              if(superSeniorList.length>=superSeniorPassList.length){
                if(superSeniorList.length==superSeniorPassList.length){this.superSeniorTrashSection = false;} 
                else{this.superSeniorTrashSection = true}
                this.PassengerDetails = this.PassengerDetails.concat(superSeniorList)
                superSeniorSection = true;
                this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
              }
              else{
                this.superSeniorTrashSection = false;
                if(superSeniorPassList.length>superSeniorList.length){
                  let i=0;
                  for(let pass of superSeniorPassList){
                    let entry = superSeniorList.filter(ele=>ele.PassengerId==pass.PassengerId)
                    if(entry.length!=0) superSeniorPassList[i] = entry[0];
                    i+=1;
                    if(i==superSeniorPassList.length){
                      this.PassengerDetails = this.PassengerDetails.concat(superSeniorPassList)
                      seniorSection = true;
                      this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
                    }
                  }
                }
              }
          }
          else{
            this.superSeniorTrashSection = true;
            this.PassengerDetails = this.PassengerDetails.concat(superSeniorList);
            superSeniorSection = true;
            this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
          }
        }
        else if(superSeniorPassList.length!=0){
          this.superSeniorTrashSection = false;
          this.PassengerDetails = this.PassengerDetails.concat(superSeniorPassList)
          superSeniorSection = true;
          this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
        }
        else{
          superSeniorSection = true;
          this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
        }
        if(grandSeniorList.length!=0){
          if(grandSeniorPassList.length!=0){
              if(grandSeniorList.length>=grandSeniorPassList.length){
                if(grandSeniorList.length==grandSeniorPassList.length){this.grandSeniorTrashSection = false;} 
                else{this.grandSeniorTrashSection = true}
                this.PassengerDetails = this.PassengerDetails.concat(grandSeniorList)
                grandSeniorSection = true;
                this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
              }
              else{
                this.grandSeniorTrashSection = false;
                if(grandSeniorPassList.length>grandSeniorList.length){
                  let i=0;
                  for(let pass of grandSeniorPassList){
                    let entry = grandSeniorList.filter(ele=>ele.PassengerId==pass.PassengerId)
                    if(entry.length!=0) grandSeniorPassList[i] = entry[0];
                    i+=1;
                    if(i==grandSeniorPassList.length){
                      this.PassengerDetails = this.PassengerDetails.concat(grandSeniorPassList)
                      grandSeniorSection = true;
                      this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
                    }
                  }
                }
              }
          }
          else{
            this.grandSeniorTrashSection = true;
            this.PassengerDetails = this.PassengerDetails.concat(grandSeniorList);
            grandSeniorSection = true;
            this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
          }
        }
        else if(grandSeniorPassList.length!=0){
          this.grandSeniorTrashSection = false;
          this.PassengerDetails = this.PassengerDetails.concat(grandSeniorPassList)
          grandSeniorSection = true;
          this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
        }
        else{
          grandSeniorSection = true;
          this.checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection);
        }
       }
       
       else{
         this.PassengerDetails = passengerList;
        this.passengerSection = true;
        this.setTravelValues();
       }
      }
    },
    (err) => { },
  );
}
onEditPassenger(rowData){
  this.editIndex = this.historyRecordsList.findIndex(ele=>ele.PassportNo == rowData.PassportNo && ele.Dob==rowData.Dob);
  console.log("Edit Index",this.editIndex);
  this.PassengerId = rowData.PassengerId;
  this.PassengerFirstName = rowData.PassengerFirstName;
  this.PassengerLastName = rowData.PassengerLastName;
  if(rowData.Dob!=null){
      var dateParts = rowData.Dob.split("/");
      this.Dob = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
  }
  this.Nationality = rowData.Nationality;
  this.PassportNo = rowData.PassportNo;
  this.GenderId = rowData.GenderId;
  this.GroupId = rowData.GroupId;
  this.RelationId = String(rowData.RelationId);
  this.getRelationshipList('direct');
  console.log("Final Relation On Edit",this.RelationId,rowData)
  this.editSection = true;
}
onDeletePassengerList(rowData){
  console.log("Index Received",rowData);
  let urlLink=`${this.motorApiUrl}api/deletepassenger`
  if(rowData.PassengerId!=null){
     let ReqObj={
             "QuoteNo":this.quoteNo,
             "PassengerId":rowData.PassengerId
          }
          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              if(data.Result){
               console.log('llll',data.Result);
               this.getpassengerDetails('1');
              }
            },
            (err) => { },
          );
  }
  else{
    this.historyRecordsList = this.historyRecordsList.filter(ele=>(ele.PassportNo!=rowData.PassportNo) && (ele.Dob!=rowData.Dob))
  }
     
}
onDeletePassenger(rowData){
  let index =  this.PassengerDetails.findIndex(ele=>(ele.PassengerId==rowData.PassengerId && ele.GroupId==rowData.GroupId));
  this.PassengerDetails.splice(index,1);
  let adultList = this.PassengerDetails.filter(ele=>ele.GroupId=='2');
  let kidList = this.PassengerDetails.filter(ele=>ele.GroupId=='1');
  let seniorList = this.PassengerDetails.filter(ele=>ele.GroupId=='3');
  let superSeniorList = this.PassengerDetails.filter(ele=>ele.GroupId=='4');
  let grandSeniorList = this.PassengerDetails.filter(ele=>ele.GroupId=='5');
  let adultPassList = this.validRecordsList.filter(ele=>ele.GroupId=='2');
  let kidPassList = this.validRecordsList.filter(ele=>ele.GroupId=='1');
  let seniorPassList = this.validRecordsList.filter(ele=>ele.GroupId=='3');
  let superSeniorPassList = this.validRecordsList.filter(ele=>ele.GroupId=='4');
  let grandSeniorPassList = this.validRecordsList.filter(ele=>ele.GroupId=='5');
  if(adultList.length!=0){
    if(adultPassList.length!=0){
      if(adultList.length!=adultPassList.length) this.adultTrashSection = true;
      else this.adultTrashSection = false;
    }
    else this.adultTrashSection = true;
  }
  else this.adultTrashSection = false;
  if(kidList.length!=0){
    if(kidPassList.length!=0){
      if(kidPassList.length!=kidList.length) this.kidTrashSection = true;
      else this.kidTrashSection = false;
    }
    else this.kidTrashSection = true;
  }
  else this.kidTrashSection = false;
  if(seniorList.length!=0){
    if(seniorPassList.length!=0){
      if(seniorPassList.length!=seniorList.length) this.seniorTrashSection = true;
      else this.seniorTrashSection = false;
    }
    else this.seniorTrashSection = true;
  }
  else this.seniorTrashSection = false;
  if(superSeniorList.length!=0){
    if(superSeniorPassList.length!=0){
      if(superSeniorPassList.length!=superSeniorList.length) this.superSeniorTrashSection = true;
      else this.superSeniorTrashSection = false;
    }
    else this.superSeniorTrashSection = true;
  }
  else this.superSeniorTrashSection = false;
  if(grandSeniorList.length!=0){
    if(grandSeniorPassList.length!=0){
      if(grandSeniorPassList.length!=grandSeniorList.length) this.grandSeniorTrashSection = true;
      else this.grandSeniorTrashSection = false;
    }
    else this.grandSeniorTrashSection = true;
  }
  else this.grandSeniorTrashSection = false;
}
checkRendering(adultSection,kidSection,seniorSection,superSeniorSection,grandSeniorSection){
    this.passengerSection = adultSection && kidSection && seniorSection && superSeniorSection && grandSeniorSection;
    if(this.passengerSection){
      this.setTravelValues();
    }
}
setTravelValues(){
  let i=0;
  if(this.PassengerDetails.length!=0){
    for(let passenger of this.PassengerDetails){
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      if(passenger.Nationality==null) passenger.Nationality = "TZA";
       if(passenger.Dob != null ){
        var dateParts = passenger.Dob.split("/");
        passenger.Dob = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
      }
      if(passenger.RelationId!=null)  passenger.RelationId = String(passenger.RelationId);
      let groupId = passenger.GroupId;
      if(groupId == '1'){
        passenger['minDate'] = new Date(year-18,month,day-1);
        passenger['maxDate'] = new Date(year, month-3, day-1);
       }
       else if(groupId == '2'){
       
        passenger['minDate'] = new Date(year-65,month,day-1);
        passenger['maxDate'] = new Date(year-19, month, day-1);
       }
       else if(groupId == '3'){
        passenger['minDate'] = new Date(year-75,month,day-1);
        passenger['maxDate'] = new Date(year-66, month, day-1);
       }
       else if(groupId == '4'){
        passenger['minDate'] = new Date(year-80,month,day-1);
        passenger['maxDate'] = new Date(year-76, month, day-1);
       }
       else if(groupId == '5'){
        passenger['minDate'] = new Date(year-110,month,day-1);
        passenger['maxDate'] = new Date(year-81, month, day-1);
       }
      if(passenger.GenderId!=null && passenger.GenderId!=''){
          //this.getRelationshipList(i);
      }
      else{
        this.GenderId = '';
        this.relationship = [];
        
      }
      i+=1;
    }
  }
  let entry = this.PassengerDetails[0];
//  if(entry.Dob != null ){
//   var dateParts = entry.Dob.split("/");
//   this.dob = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
// }
// else{
//   this.dob = null;
// }
 
}
Proceed()
{
  
  // let ReqObj={
  //   "Address1": this.PassengerDetails.Address1,
  //   "Address2": this.PassengerDetails.Address2,
  //   "Age": this.PassengerDetails.Age,
  //   "City": this.PassengerDetails.City,
  //   "CivilId": this.PassengerDetails.CivilId,
  //   "Dob": this.PassengerDetails.Dob,
  //   "GenderId": this.PassengerDetails.GenderId,
  //   "CreatedBy": this.PassengerDetails.CreatedBy,
  //   "NameTitleId": this.PassengerDetails.NameTitleId,
  //   "Natinality": this.PassengerDetails.Nationality,
  //   "PassengerId": this.PassengerDetails.PassengerId,
  //   "PassengerLastName": this.PassengerDetails.PassengerLastName,
  //   "PassengerFirstName": this.PassengerDetails.PassengerFirstName,
  //   "PassportNo": this.PassengerDetails.PassportNo,
  //   "PoBox": this.PassengerDetails.PoBox,
  //   "QuoteNo": this.PassengerDetails.QuoteNo,
  //   "RelationId": this.PassengerDetails.RelationalId,
  //   "StateCode": this.PassengerDetails.StateCode

  // }
}

  setVehicleValues(type)
    {
      console.log("Passenger Detailsssssssss",this.PassengerDetails);
      /*let quoteNo=sessionStorage.getItem('quoteNo');
      let ReqObj =  {
        "Address1": "Add21",
        "Address2": "Add2",
        "Age": "8",
        "City": "Chennai",
        "CivilId": "56754646",
        "Dob": "12/12/2004",
        "GenderId": "M",
        "CreatedBy": "Issuer6",
        "NameTitleId": "1",
        "Natinality": "TZS",
        "PassengerId": "1",
        "PassengerLastName": "S",
        "PassengerFirstName": "Samilla",
        "PassportNo": "567567657",
        "PoBox": "678678",
        "QuoteNo": "Q22121607294667410",
        "RelationId": "1",
        "StateCode": "12000"
       }
       //let urlLink = `${this.motorApiUrl}api/getmotordetails`;
       let urlLink = `${this.motorApiUrl}api/updatepassdetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            this.PassengerDetails = data.Result;
            //let index = this.PassengerDetails.findIndex(ele=>ele.TravelId);
            if(quoteNo)
            this.currentIndex = 1;
            console.log('IIIIIIIIIIIIIIIIIIIIIII',this.currentIndex);
            this.totalCount = this.PassengerDetails.length;
            console.log('TTTTTTTTTTTTTTTT',this.totalCount);
            //this.updateComponent.vehicleDetails = this.vehicleDetails;
            /*if(type!='save'){
              this.setVehicleValues('edit');
            }
            else{
              this.onFormSubmit('save');
            }
          }
        },
        (err) => { },
      );*/
      /*let quoteNo=sessionStorage.getItem('quoteNo');
        let ReqObj = {
          "QuoteNo": quoteNo
        }
        let urlLink = `${this.motorApiUrl}api/getallpassdetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
          this.PassengerDetails = data.Result;
          }
          },
          (err) => { },
        );*/
    }
    /*setVehicleValues(type){
      console.log("Travel Details",this.vehicleDetails);
      this.vehicleId = String(this.vehicleDetails?.Vehicleid);
      console.log("Vehicle Id Setted",this.vehicleId);
      this.typeValue = this.vehicleDetails?.Insurancetype;
      this.classValue = this.vehicleDetails?.InsuranceClass;
      if(type=='edit'){
        this.getMotorTypeList('direct',this.vehicleDetails?.VehicleType,this.vehicleDetails?.Motorusage)
        this.bodyTypeValue = this.vehicleDetails?.VehicleType;
        this.motorUsageValue = this.vehicleDetails?.Motorusage;
        this.collateralYN = this.vehicleDetails?.CollateralYn;
        if(this.collateralYN=='Y'){
          this.collateralValue = true;
          this.collateralName = this.vehicleDetails?.CollateralName;
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
      //this.cityValue = this.vehicleDetails?.CityLimit;
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
        this.getTravelDetails(this.vehicleDetails?.Chassisnumber);
      }
    }*/
  /*onProceed(){
    if(this.vehicleDetailsList.length!=0){
      if(this.vehicleDetailsList.length==1){
        this.onFormSubmit('proceedSave');
      }
      else{
        this.onFinalProceed();
      }
    }

  }*/

  employeedownload(){
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "ProductId": this.productId,
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/sample/download`
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result.Base64);
        link.setAttribute('download', data?.Result.FileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }
  onFormSubmit(){ 
      if(this.kidTrashSection){
        Swal.fire({
          title: '<strong>Passenger Error</strong>',
          icon: 'info',
          html:
            `<ul class="list-group errorlist">
            <li class="list-group-login-field">
              <div style="color: darkgreen;">Type<span class="mx-2">:</span>Kid Count MisMatch</div>
              <div style="color: red;">Message<span class="mx-2">:</span>Please Remove Extra Passenger From Kid Section</div>
           </li>
          </ul>`,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-down"></i> Errors!',
          confirmButtonAriaLabel: 'Thumbs down, Errors!',
        })
      }
      else  if(this.adultTrashSection){
        Swal.fire({
          title: '<strong>Passenger Error</strong>',
          icon: 'info',
          html:
            `<ul class="list-group errorlist">
            <li class="list-group-login-field">
              <div style="color: darkgreen;">Type<span class="mx-2">:</span>Adult Count MisMatch</div>
              <div style="color: red;">Message<span class="mx-2">:</span>Please Remove Extra Passenger From Adult Section</div>
           </li>
          </ul>`,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-down"></i> Errors!',
          confirmButtonAriaLabel: 'Thumbs down, Errors!',
        })
      }
      else  if(this.seniorTrashSection){
        Swal.fire({
          title: '<strong>Passenger Error</strong>',
          icon: 'info',
          html:
            `<ul class="list-group errorlist">
            <li class="list-group-login-field">
              <div style="color: darkgreen;">Type<span class="mx-2">:</span>Senior Count MisMatch</div>
              <div style="color: red;">Message<span class="mx-2">:</span>Please Remove Extra Passenger From Senior Section</div>
           </li>
          </ul>`,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-down"></i> Errors!',
          confirmButtonAriaLabel: 'Thumbs down, Errors!',
        })
      }
      else  if(this.superSeniorTrashSection){
        Swal.fire({
          title: '<strong>Passenger Error</strong>',
          icon: 'info',
          html:
            `<ul class="list-group errorlist">
            <li class="list-group-login-field">
              <div style="color: darkgreen;">Type<span class="mx-2">:</span>Super Senior Count MisMatch</div>
              <div style="color: red;">Message<span class="mx-2">:</span>Please Remove Extra Passenger From Super Senior Section</div>
           </li>
          </ul>`,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-down"></i> Errors!',
          confirmButtonAriaLabel: 'Thumbs down, Errors!',
        })
      }
      else  if(this.grandSeniorTrashSection){
        Swal.fire({
          title: '<strong>Passenger Error</strong>',
          icon: 'info',
          html:
            `<ul class="list-group errorlist">
            <li class="list-group-login-field">
              <div style="color: darkgreen;">Type<span class="mx-2">:</span>Grand Senior Count MisMatch</div>
              <div style="color: red;">Message<span class="mx-2">:</span>Please Remove Extra Passenger From Grand Senior Section</div>
           </li>
          </ul>`,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-down"></i> Errors!',
          confirmButtonAriaLabel: 'Thumbs down, Errors!',
        })
      }
      else{
        this.onNextVehicle('finalSave');
      } 
  }
  onFinalSavePassemgers(type){
      let urlLink = null;
      if(type=='save') urlLink = `${this.motorApiUrl}api/savepassengers`;
      else urlLink = `${this.motorApiUrl}api/proceedpassengers`;
      let ReqObj = {
        "CreatedBy": "kalibroker2",
        "PassengerList": this.historyRecordsList,
        "QuoteNo": this.quoteNo
      }
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
          }
        },
        (err) => { },
      );
  }
  checkValidPassengers(){
    let quoteNo=sessionStorage.getItem('quoteNo');
    let ReqObj = {
      "QuoteNo": quoteNo
    }
    let urlLink = `${this.motorApiUrl}api/validatepassdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
        }
      },
      (err) => { },
    );
   
  }
  onFinalProceed(){}

}
