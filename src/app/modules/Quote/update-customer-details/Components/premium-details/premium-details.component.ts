// import { ViewDocumnetDetailsComponent } from './../../../../../shared/view-documnet-details/view-documnet-details.component';
import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';
import { SharedService } from '../../../../../shared/shared.service';
import { NewViewDetailsComponent } from '../new-view-details/new-view-details.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ViewDocumnetDetailsComponent } from 'src/app/shared/view-documnet-details/view-documnet-details.component';

@Component({
  selector: 'app-premium-details',
  templateUrl: './premium-details.component.html',
  styleUrls: ['./premium-details.component.css']
})
export class PremiumDetailsComponent implements OnInit {
  isMannualReferal:any="N";
  customerDetails: any;
  driverDetailsList: any[] = [];
  quoteRefNo: string;
  vehicleId: string;
  title: any;
  clientName: any;
  dateOfBirth: any;
  emailId: any;
  mobileNo: any;
  idNumber: any;uploadDocList:any[]=[];
  totalPremium: any;EmiYn:any="N";
  vehicleDetails: any;emiPeriod:any;emiMonth:any=null;
  motorDetails: any;uploadedDocList:any[]=[];
  imageUrl: any;commonDocTypeList:any[]=[];
  viewFileName: any;docListSection:boolean=false;
  veiwSelectedDocUrl: any;config = { multi: false };
  quoteNo: any;vehicleList:any[]=[];branchCode:any;branchList:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;productId:any;docTypeList:any[]=[];
  userDetails:any;loginId:any;userType:any;agencyCode:any;insuranceId:any;
  customerType: any;
  subuserType: string;dueAmount: any;
  localPremiumCost: any;currencyCode: any;
  LicenseList:any[]=[];
  RiskId: any;EffectiveDate: any;
  LicenseNo: any;endorsementId:any;endorsePolicyNo:any;
  minDate: Date;endorsementSection:boolean = false;
  enableFieldList: any;enableFieldsList: any;
  endorsementName: any;endorseCategory: any;
  orgPolicyNo: string;genderList:any[]=[];
  endtPremium: any;titleList:any[]=[];notificationList:any[]=[];
  enableCustomerDetails: boolean=false;occupationList: any[]=[];
  mobileCodeList: any[]=[];titleCode: any;
  mobileCode: any;gender: any;occupation: any;
  vrTinNo: any;notification: any;
  enableDocumentDetails: any;
  referenceNo: string;  Riskdetails: any[] = [];
  quoteDetails: any;
  enableDriverDetails: boolean = false;
  appointmentDate: string;
  currentDate: Date;
  uploadListDoc: any[]=[];
  listDocTypes: any[];
  uploadedIndividualList: any[]=[];
  CoverList: any[]=[];
  address1: any;
  address2: any;
  preferredNotification: any;
  individualDocumentList: any;
  PinCode: any;
  endorsementType: any;
  constructor(private sharedService: SharedService,
    private router:Router,public dialogService: MatDialog,
    private updateComponent:UpdateCustomerDetailsComponent,private datePipe:DatePipe) {
    //this.vehicleId = sessionStorage.getItem('editVehicleId');
    //this.quoteNo = sessionStorage.getItem('quoteNo');
    //this.updateComponent.quoteNo = this.quoteNo;
    this.subuserType = sessionStorage.getItem('typeValue');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.notificationList = [
      { CodeDesc: 'SMS', Code: 'Sms' },
      { CodeDesc: 'Mail', Code: 'Mail' },
      { CodeDesc: 'Whatsapp', Code: 'Whatsapp' }
    ];
      sessionStorage.removeItem('quotePaymentId');
      
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.endorsementSection = true;
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        this.endorsementId = endorseObj.EndtTypeId;
        if(endorseObj.QuoteNo) this.quoteNo = endorseObj.QuoteNo;
        this.updateComponent.quoteNo = endorseObj.QuoteNo;
        if(this.endorsementId!=42 && this.endorsementId!=842){
          this.enableCustomerDetails = this.enableFieldsList.some(ele=>ele=='customerName');
          this.enableDocumentDetails = this.enableFieldsList.some(ele=>ele=='documentId');
          this.enableDriverDetails = this.enableFieldsList.some(ele=>ele=='driverName' || ele=='DriverName');
          
        }
      }
      else{
        this.endorsementSection = false;
      }
     this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
     this.quoteNo = sessionStorage.getItem('quoteNo');
     this.updateComponent.quoteNo = this.quoteNo;
     var d= new Date();
     var year = d.getFullYear();
     var month = d.getMonth();
     var day = d.getDate();
      this.currentDate = new Date();
     this.minDate = new Date(year - 18,month, day );
     let referenceNo =  sessionStorage.getItem('customerReferenceNo');
    if(referenceNo){
      this.getCustomerDetails(referenceNo);
      this.referenceNo = referenceNo;
    }
    
    this.vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetails'));
    this.getTitleList();
   }

  ngOnInit(): void {
    this.getCommonDocTypeList();
    this.getUploadedDocList(null,-1);
    if(this.quoteRefNo){
      this.getEditQuoteDetails();
      this.getLocationWiseList();
    }
    
    // let chassisNo = sessionStorage.getItem('vehChassisNo');
    // console.log("Chassis No ",chassisNo)
    // if(chassisNo) this.getVehicleDetails(chassisNo);
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
          if(this.customerDetails){
            this.titleCode = this.customerDetails?.Title;
            this.mobileCode = this.customerDetails?.MobileCode1;
            this.gender = this.customerDetails?.Gender;
            this.address1 = this.customerDetails?.Address1;
            this.address2 = this.customerDetails?.Address2;
            this.occupation = this.customerDetails?.Occupation;
            this.vrTinNo = this.customerDetails?.VrTinNo;
            this.notification = this.customerDetails?.PreferredNotification;
            this.title = this.customerDetails?.TitleDesc;
            this.clientName = this.customerDetails?.ClientName;
            this.dateOfBirth = this.customerDetails?.DobOrRegDate;
            this.emailId = this.customerDetails?.Email1;
            this.preferredNotification = this.customerDetails?.PreferredNotification;
            this.PinCode = this.customerDetails?.PinCode;
            this.mobileNo = this.customerDetails?.MobileNo1;
            this.idNumber = this.customerDetails?.IdNumber;
            if(this.customerDetails.AppointmentDate!='' && this.customerDetails.AppointmentDate!=null){
              let date = this.customerDetails.AppointmentDate.split('/');
              this.appointmentDate = date[2] + '-' + date[1] + '-' + date[0];
            }
            if(this.customerDetails.PolicyHolderType=='1'){
              this.customerType="Individual";
            }
            else if(this.customerDetails.PolicyHolderType=='2'){
              this.customerType="Corporate";
            }
          }
        }
      },
      (err) => { },
    );
  }
  omit_special_char(event){   
		var k;  
		k = event.charCode;  //         k = event.keyCode;  (Both can be used)
		return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
	}
  changevalue(rowData,value){
    return rowData.DriverType == value;
  }
  getTotalVehiclesCost(){
    let totalCost=0,i=0;
    for(let veh of this.vehicleList){
      if(veh?.OverallPremiumFc) totalCost = totalCost+Number(veh?.OverallPremiumFc);
      //this.onsave();

      i+=1;
      if(i==this.vehicleList.length) this.totalPremium = totalCost;
      console.log('tttttt',);
    }
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
				let obj = [{"Code":null,"CodeDesc":"-Select-"}]
			   this.titleList = obj.concat(data.Result);
			   this.getGenderList();
			}
		  },
		  (err) => { },
		);
	}
  getGenderList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode,
  }
  let urlLink = `${this.CommonApiUrl}dropdown/policyholdergender`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
    if(data.Result){
        this.genderList = data.Result;
        this.getOccupationList();
    }
    },
    (err) => { },
  );
  }
  getOccupationList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
      console.log(data);
      if(data.Result){
        this.occupationList = data.Result; 
        this.getMobileCodeList();
      }
      },
      (err) => { },
    );
  }
  getMobileCodeList(){
    let ReqObj = { "InsuranceId": this.insuranceId}
    let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
          console.log(data);
            if(data.Result){
              let obj = [{"Code":null,"CodeDesc":"-Select-"}]
              this.mobileCodeList= obj.concat(data.Result);
              if(this.productId=='5'){
                this.getDriverDetails();
              }
            }
          },
          (err) => { },
        );
      }
  AddNew() {
    //this.driverDetailsList.push();

    let entry = [{
      "DriverName": "",
      "LicenseNo": "",
      "DriverDob": "",
      "DriverType":"1",
      "RiskId":""

    }]
    this.driverDetailsList = this.driverDetailsList.concat(entry);
  }

  delete(row: any,i) {

    const index = this.driverDetailsList.indexOf(row);
    this.driverDetailsList.splice(index, 1);

  }

  getDriverDetails(){
    let ReqObj = {
      "QuoteNo": this.quoteNo
    }
    let urlLink = `${this.motorApiUrl}api/getmotordrivers`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
           this.driverDetailsList= data.Result;
           console.log("License List ",this.LicenseList)
           for(let driver of this.driverDetailsList){
                let entry = this.LicenseList.some(ele=>ele.Code==driver.RiskId)
                //if(!entry) driver.RiskId = null;
                if(driver.DriverDob!=null && driver.DriverDob!=''){
                 
                  if(driver.DriverDob.split('/').length>1){
                    let date = driver.DriverDob.split('/');
                    driver.DriverDob = date[2] + '-' + date[1] + '-' + date[0];
                  };
                }
           }
             //this.EffectiveDate = data.Result.DriverDob
             /*if(this.EffectiveDate){
              this.onDateFormatInEdit(this.EffectiveDate);
             }*/
        }
      },
      (err) => { },
    );

  }
  getCommonDocTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId":this.productId,
      "SectionId":"99999"
    }
    let urlLink = `${this.CommonApiUrl}document/dropdown/doctypes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
           this.commonDocTypeList = data.Result;
          //  this.commonDocTypeList = [
          //    {"Code":"1","CodeDesc":"License"},
          //    {"Code":"2","CodeDesc":"Aadhar Card"}
          //  ];
           
        }
      },
      (err) => { },
    );

  }
  getVehicleDetails(chassisNo){
    let ReqObj = {
      "ReqChassisNumber": chassisNo,
      "ReqRegNumber": null
    }
    let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
      this.motorDetails = data.Result;

      }
      },
      (err) => { },
    );
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

            this.Riskdetails = data?.Result?.RiskDetails
          for (let cover of this.Riskdetails) {
            let j = 0;
            if(cover?.SectionDetails){
              for (let section of cover?.SectionDetails) {
                let CoverData = section.Covers;
                for (let subsectioncover of section?.Covers) {
                  console.log("subsectioncover", subsectioncover);
                  if (cover?.totalPremium) {
                    cover['totalLcPremium'] = cover['totalLcPremium'] + subsectioncover?.PremiumIncludedTaxLC;
                    cover['totalPremium'] = cover['totalPremium'] + subsectioncover?.PremiumIncludedTax;
                  }
                  else {
                    cover['totalLcPremium'] = subsectioncover?.PremiumIncludedTaxLC;
                    cover['totalPremium'] = subsectioncover?.PremiumIncludedTax;
  
                  }
                  let baseCovers = [], otherCovers = [];
                  baseCovers = CoverData.filter(ele => ele.CoverageType == 'B');
                  otherCovers = CoverData.filter(ele => ele.CoverageType != 'B');
                  section.Covers = baseCovers.concat(otherCovers);
                  console.log("otherCovers", CoverData);
                  this.CoverList.push(cover);
                  console.log("CoverList", this.CoverList);
                  if (j == cover?.SectionDetails) {
                    this.CoverList.push(cover);
                    console.log("vehicleList", this.CoverList);
                  }
                  else j += 1;
                }
  
              
              }
            }
            
          }
            let quoteDetails = data?.Result?.QuoteDetails;
            if(quoteDetails){
              if(quoteDetails.Endorsementeffdate!=null){
                this.orgPolicyNo = quoteDetails?.OriginalPolicyNo;
                this.endorsePolicyNo = quoteDetails?.policyNo;
                 this.endorsementType = quoteDetails.Endtcategdesc;
                if(!JSON.parse(sessionStorage.getItem('endorseTypeId'))){
                  let obj = {
                    "EndtTypeId": quoteDetails?.EndtTypeId,
                    "FieldsAllowed":quoteDetails.Endtdependantfields.split(','),
                    "EffectiveDate":quoteDetails.Endorsementeffdate,
                    "Remarks":quoteDetails.Endorsementeffdate,
                    "Category": quoteDetails.Endtcategdesc,
                    "EndtName": quoteDetails.EndtTypeDesc,
                    "PolicyNo": quoteDetails?.policyNo
                  }
                  sessionStorage.setItem('endorseTypeId',JSON.stringify(obj));
                  this.endorsementSection = true;
                }
              }
            }
            this.quoteDetails = data?.Result?.QuoteDetails;
            this.listDocTypes = data.Result?.DocumentDetails;
            this.currencyCode = quoteDetails?.Currency;
            if(quoteDetails?.TotalEndtPremium!=null){
              this.endtPremium = quoteDetails?.TotalEndtPremium;
              if(this.endorsementSection){
                this.totalPremium = quoteDetails?.TotalEndtPremium;
              }
              else this.totalPremium = quoteDetails?.OverallPremiumFc;
            }
            else{
              if(this.endorsementSection){
                this.endtPremium = null;this.totalPremium =null;
              }
              else this.endtPremium = null;this.totalPremium = quoteDetails?.OverallPremiumFc;
            }
           
            
            this.localPremiumCost = quoteDetails?.OverallPremiumLc;
            if(quoteDetails.EmiYn!=null){
              this.EmiYn = quoteDetails.EmiYn;
              this.emiPeriod = quoteDetails.InstallmentPeriod;
              this.emiMonth = quoteDetails.InstallmentMonth;
              this.dueAmount = quoteDetails.DueAmount;
            }
            else{
              this.EmiYn = "N";
              this.emiPeriod = null;
              this.emiMonth = null;
            }
            let vehicles:any[] = data?.Result?.RiskDetails;
            if(vehicles.length!=0){
              let i=0;this.vehicleList=[];
              for(let vehicle of vehicles){
                let entry:any;
                // if(this.productId=='5')  entry=vehicle.VehicleDetails;
                // else if(this.productId=='4')  entry=vehicle.TravelPassengerDetails;
                // else if(this.productId=='3')  entry=vehicle.BuildingDetails;
                // else entry = vehicle.CommonDetails;
                entry = vehicle;
                //entry['CoverList'] = vehicle.Covers;
                this.vehicleList.push(entry);
                let obj={
                  "Code":entry.RiskId,
                  "CodeDesc":entry.Chassisnumber,
                  "RiskId": entry.RiskId

                }
                this.LicenseList.push(obj);
                 this.RiskId=entry.RiskId;
                i+=1;
                if(i==vehicles.length){
                  console.log("Final License List",this.LicenseList)
                  //this.setVehicleList();
                 
                }

              }
            }
            if(this.vehicleList.length!=0){

              // if(this.productId=='3'){

              // }
              // else{
              //   this.setVehicleList();
              // }



              // let entry = this.vehicleList.find(ele=>String(ele.Vehicleid)==String(this.vehicleId));
              // if(entry){
              //   let index= this.vehicleList.findIndex(ele=>String(ele.Vehicleid)==entry.VehicleDetails.Vehicleid)
              //   let coverList:any[] = entry.Covers;
              //   if(coverList.length!=0 && this.coverList.length!=0){
              //     let i=0;
              //     for(let event of coverList){
              //       let cover = this.coverList.find(ele=>ele.CoverId == event.CoverId);
              //       if(cover){
              //         cover['selected']= true;
              //         this.onSelectCover(cover,true,this.vehicleId,'vehList');
              //       }
              //       i+=1;
              //       if(i==coverList.length){
              //         this.dataSource = new MatTableDataSource(this.coverList);
              //         this.dataSource.sort = this.sort;
              //         this.dataSource.paginator = this.paginator;
              //         this.applyFilter(this.filterValue);
              //       }
              //     }
              //   }
              //   else{
              //     this.dataSource = new MatTableDataSource(this.coverList);
              //     this.dataSource.sort = this.sort;
              //     this.dataSource.paginator = this.paginator;
              //     this.applyFilter(this.filterValue);
              //   }
              // }
              // else{
              //   this.dataSource = new MatTableDataSource(this.vehicleDetailsList);
              //   this.dataSource.sort = this.sort;
              //   this.dataSource.paginator = this.paginator;
              //   this.applyFilter(this.filterValue);
              // }
            }
            else{

            }
          }
          console.log("Final Total Premium",this.totalPremium);
      },
      (err) => { },
    );

  }
  getLocationWiseList(){
      let ReqObj = {
          "QuoteNo": this.quoteNo,
          "InsuranceId": this.insuranceId
      }
      let urlLink = `${this.CommonApiUrl}document/getlocationwisesrisk`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data?.Result){
                    this.individualDocumentList = data?.Result?.InduvidualDocuments;
            }
          },
          (err) => { },
        );
  }
  onLicenseChange(rowData){
    console.log("Driver Details",rowData)
    let value = rowData.RiskId;
      if(value){
        let entry = this.LicenseList.find(ele=>ele.Code==value);
        rowData.RiskId = entry.RiskId;
      }
  }
  setVehicleList(){
    let i =0
    for(let vehicle of this.vehicleList){
      console.log("V List",vehicle)
      vehicle['docList'] = [];
      vehicle['uploadedList']=[];
      this.getDocTypeList(vehicle,i);
      this.getUploadedDocList(vehicle,null);
      i+=1;
      if(i==this.vehicleList.length){
        console.log("Final Doc List",this.vehicleList);
        this.docListSection = true;
        //this.getTotalVehiclesCost();
      }


    }
  }
  onChangeLocationType(rowData,index){
    let entry = this.individualDocumentList.find(ele=>ele.LocationId==rowData.locationId);
    if(entry){
      rowData['sectionList'] = entry.SectionList;
    }
  }
  onChangeSectionType(rowData,index){
    let entry = this.individualDocumentList.find(ele=>ele.LocationId==rowData.locationId);
    if(entry){
      let section = entry.SectionList.find(ele=>ele.SectionId==rowData.sectionId);
      if(section){
        rowData.Id = "";
        rowData['typeList'] = section.IdList;
        if(section.docTypeList==undefined){
          let ReqObj = {
            "InsuranceId":this.insuranceId,
            "ProductId": this.productId,
            "SectionId": rowData.sectionId
          }
          let urlLink = `${this.CommonApiUrl}document/dropdown/doctypes`;
          this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
              console.log(data);
              if(data.Result){
                console.log("Upload Data",this.uploadListDoc[index])
                    this.uploadListDoc[index].docTypeList = data.Result;
                    section['docTypeList'] = data.Result;
              }
            },
            (err) => { },
          );
        }
        else rowData['docTypeList'] = section.docTypeList;
      }
    }
  }
  onChangeIdType(rowData){
    
  }
  getDocTypeList(rowData,index){
    console.log("Row Data",rowData)
    let ReqObj = {
      "ProductId": this.productId,
      "SectionId": rowData.SectionId,
      "DocumentType": "2",
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/coverdocument`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.vehicleList[index]['docTypeList'] = data.Result;
        }
      },
      (err) => { },
    );
  }
  getUploadedDocList(vehicleData:any,index:any){
    let ReqObj = {
      "QuoteNo":  this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}document/getdoclist`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
            this.uploadedDocList = data?.Result?.CommmonDocument;
            this.uploadedIndividualList = data?.Result?.InduvidualDocument;
          }
        },
        (err) => { },
      );
  }
onDeleteListDocument(vehIndex,rowData){
  let entry = this.vehicleList[vehIndex];
  let ReqObj = {
      "Id": rowData.Id,
      "QuoteNo": this.quoteNo,
      "UniqueId": rowData.UniqueId
  }
  let urlLink = `${this.CommonApiUrl}document/delete`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data.ErrorMessage.length!=0){
            for(let entry of data.ErrorMessage){
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
          }
          else if(data?.Result){
            // let type: NbComponentStatus = 'success';
            //   const config = {
            //     status: type,
            //     destroyByClick: true,
            //     duration: 4000,
            //     hasIcon: true,
            //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
            //     preventDuplicates: false,
            //   };
            // this.toastrService.show(
            //   "Delete",
            //   "Document Deleted Successfully",
            //   config);
              this.getUploadedDocList(null,null);
          }
        },
        (err) => { },
      );
}
toggle(index: number) {
  let entry = this.vehicleList[index];
  if (!this.config.multi) {
    this.vehicleList.filter(
      (menu, i) => i == index
    ).forEach(menu => menu.Collapse = !menu.Collapse);
    this.vehicleList.filter(
      (menu, i) => i != index
    ).forEach(menu => menu.Collapse = false);
  }
}
  onUploadDocuments(target:any,fileType:any,type:any){
    console.log("Event ",target);
    let event:any = target.target.files;

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
  onUploadListDocuments(target:any,fileType:any,type:any,i:any){
    console.log("Event ",target);
    let event:any = target.target.files;

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
          let entry = { 'url': element,'DocTypeId':'','Id':'','typeList':[],'sectionList':[],'sectionId':'','locationId':'','locationList':this.individualDocumentList,'docTypeList':[],'filename':element.name, 'JsonString': {} }
          if(this.individualDocumentList.length==1){
            entry.locationId = this.individualDocumentList[0].LocationId;
            entry.sectionList = this.individualDocumentList[0].SectionList;
          }
          this.uploadListDoc.push(entry)
            //this.vehicleList[i].docList.push({ 'url': element,'DocTypeId':'','filename':element.name, 'JsonString': {} });
          
        }
    }

  }
  onFileUploadCommonList(){

    let docList = this.uploadDocList;
    if(docList.length!=0){
      let i=0;
      for(let doc of docList){
        let ReqObj={
          "QuoteNo":this.quoteNo,
          "Id":"99999",
          "IdType":"Common" ,
          "SectionId":"99999" ,
          "InsuranceId": this.insuranceId,
          "DocumentId":doc.DocTypeId,
          "RiskId":"99999",
          "LocationId":"99999",
          "LocationName":"Common" ,
          "ProductId":this.productId,
          "FileName":doc.filename,
          "OriginalFileName":doc.filename,
          "UploadedBy":this.loginId
        }
        if(this.endorsementSection && this.enableDocumentDetails){
          ReqObj['EndtStatus'] = this.quoteDetails?.EndtStatus;
          ReqObj['EndorsementTypeDesc'] = this.quoteDetails?.EndtTypeDesc;
          ReqObj['EndorsementType'] = this.quoteDetails?.EndtTypeId;
          ReqObj['EndtCategoryDesc'] = this.quoteDetails?.Endtcategdesc;
          ReqObj['EndtCount'] = this.quoteDetails?.Endtcount;
          ReqObj['EndtPrevPolicyNo'] = this.quoteDetails?.Endtprevpolicyno;
          ReqObj['EndtPrevQuoteNo'] = this.quoteDetails?.Endtprevquoteno;
        }
        let urlLink = `${this.CommonApiUrl}document/upload`;
        this.sharedService.onPostDocumentMethodSync(urlLink, ReqObj,doc.url).subscribe(
          (data: any) => {
            if(data.ErrorMessage){
              for(let entry of data.ErrorMessage){
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
            }
            else if(data?.Result){
                i+=1;
                if(i==docList.length){
                  this.uploadDocList = [];
                  this.getUploadedDocList(null,-1);
                }
              }
            },
            (err) => { },
          );
      }
    }
  }
  onFileUploadVehicleList(index){
      //let vehicleDetails = this.vehicleList[index];
      let docList = this.uploadListDoc;
      if(docList.length!=0){
        let i=0;
        for(let doc of docList){
          console.log("Document",doc)
          let IdType=null,locationName=null,RiskId=null;
          let locations = doc.locationList.find(ele=>ele.LocationId==doc.locationId);
          if(locations) locationName = locations.LocationName;
          let entry = doc.typeList.find(ele=>ele.Id==doc.Id);
          if(entry){IdType = entry.IdType;RiskId=entry.RiskId}
          let ReqObj = {
            "QuoteNo":this.quoteNo,
            "Id":doc.Id,
            "IdType":IdType,
            "SectionId":doc.sectionId,
            "InsuranceId":this.insuranceId,
            "DocumentId":doc.DocTypeId,
            "RiskId":RiskId,
            "LocationId": doc.locationId,
            "LocationName": locationName,
            "ProductId": this.productId,
            "FileName": doc.filename,
            "OriginalFileName":doc.filename,
            "UploadedBy": this.loginId
            
          }
          // let ReqObj={
          //   "RequestReferenceNo": this.quoteRefNo,
          //   "InsuranceId": this.insuranceId,
          //   "DocumentId": doc.DocTypeId,
          //   "ProductId": this.productId,
          //   "SectionId": doc?.SectionId,
          //   "DocumentReferenceNo":"",
          //   "FileName": doc.filename,
          //   "OriginalFileName": doc.filename,
          //   "CreatedBy":this.loginId,
          //   "QuoteNo":this.quoteNo,
          //   "Id": doc.Id
          // }
          if(this.endorsementSection && this.enableDocumentDetails){
            ReqObj['EndtStatus'] = this.quoteDetails?.EndtStatus;
            ReqObj['EndorsementTypeDesc'] = this.quoteDetails?.EndtTypeDesc;
            ReqObj['EndorsementType'] = this.quoteDetails?.EndtTypeId;
            ReqObj['EndtCategoryDesc'] = this.quoteDetails?.Endtcategdesc;
            ReqObj['EndtCount'] = this.quoteDetails?.Endtcount;
            ReqObj['EndtPrevPolicyNo'] = this.quoteDetails?.Endtprevpolicyno;
            ReqObj['EndtPrevQuoteNo'] = this.quoteDetails?.Endtprevquoteno;
          }
          let urlLink = `${this.CommonApiUrl}document/upload`;
          this.sharedService.onPostDocumentMethodSync(urlLink, ReqObj,doc.url).subscribe(
            (data: any) => {
              if(data.ErrorMessage){
                for(let entry of data.ErrorMessage){
                 
                }
              }
              else if(data?.Result){
                  i+=1;
                  if(i==docList.length){
                    this.uploadListDoc = [];
                    console.log("FInal List",this.vehicleList)
                    this.getUploadedDocList(null,null);
                  }
                }
              },
              (err) => { },
            );
        }
      }
  }

  onViewCommonDocument(index)
  {
    let entry = this.uploadedDocList[index];
    let ReqObj = {
      "Id": entry.Id,
      "QuoteNo": this.quoteNo,
      "UniqueId": entry.UniqueId
  }
  let urlLink = `${this.CommonApiUrl}document/getcompressedimage`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data:any) => {
      console.log(data);
      const dialogRef = this.dialogService.open(ViewDocumnetDetailsComponent,{
        data: {
          title: data.Result.OrginalFileName,
               imageUrl: data.Result.ImgUrl
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    },
    (err) => { },
  );

  }
  getBack(){
    console.log("Category",this.endorseCategory)
    if(this.endorseCategory=='Financial'){
      if(this.productId=='3'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details']);
      }
      else{
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
      }
     
    }
    else if(this.productId=='3'){
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details']);
    }
    else if(this.productId!='4' && this.productId!='3'){
      this.router.navigate(['/Home/policies/Endorsements/endorsementTypes'])
    }

  }
  onViewListDocument(index,doc)
  {
    let ReqObj = {
      "Id": doc.Id,
      "QuoteNo": this.quoteNo,
      "UniqueId": doc.UniqueId
    }
  let urlLink = `${this.CommonApiUrl}document/getcompressedimage`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data:any) => {
      console.log(data);
      const dialogRef = this.dialogService.open(ViewDocumnetDetailsComponent,{
        data: {
          title: data.Result.OrginalFileName,
               imageUrl: data.Result.ImgUrl
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

    },
    (err) => { },
  );

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
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }
    }
  }



  onsave(){
        let i=0,entryList:any=[];
       for(let driver of this.driverDetailsList){
        let date=null;
        if(driver.DriverDob!='' && driver.DriverDob!=null){
          console.log("Dob",driver)
          if(String(driver.DriverDob).split('-').length>1){
            let entry = driver.DriverDob.split('-')
            date= entry[2]+'/'+entry[1]+'/'+entry[0]
          }
           else{
            date= this.datePipe.transform(driver.DriverDob, "dd/MM/yyyy");
           }
        }
        
        
        console.log("Before Date2",date)
        let entry = {
            "CreatedBy": this.loginId,
            "DriverDob":date,
            "DriverName": driver.DriverName,
            "DriverType": driver.DriverType,
            "LicenseNo": driver.LicenseNo,
            "QuoteNo": this.quoteNo,
            "RiskId": driver.RiskId
          }
          if(this.endorsementSection && this.enableDriverDetails){
            entry['EndtStatus'] = this.quoteDetails?.EndtStatus;
            entry['EndorsementTypeDesc'] = this.quoteDetails?.EndtTypeDesc;
            entry['EndorsementType'] = this.quoteDetails?.EndtTypeId;
            entry['EndtCategoryDesc'] = this.quoteDetails?.Endtcategdesc;
            entry['EndtCount'] = this.quoteDetails?.Endtcount;
            entry['EndtPrevPolicyNo'] = this.quoteDetails?.Endtprevpolicyno;
            entry['EndtPrevQuoteNo'] = this.quoteDetails?.Endtprevquoteno;
          }
          entryList.push(entry);
          i++;
          if(i==this.driverDetailsList.length){
            console.log("Final List Driver",entryList)
            this.saveDriverDetails(entryList);}
       }

     }
     saveDriverDetails(entryList){
      console.log("DriverDetails",entryList)
      let urlLink = `${this.motorApiUrl}api/savemotordrivers`;
      this.sharedService.onPostMethodSync(urlLink,entryList).subscribe(
        (data: any) => {
          console.log("Save motor Res",data)
          if(data.Result){
            if(this.endorsementSection && this.enableCustomerDetails){
                  this.saveCustomerDetails();
            }
            else{
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
            }
            
          }
          
        }
      )
     }
  onProceed(){
    if(this.endorsementSection){
        if(this.endtPremium!=null && this.endtPremium!='' && this.endtPremium!=0 && this.endtPremium!=undefined){
              this.onMakePayment();
        }
        else{
          sessionStorage.removeItem('quotePaymentId');
          if(this.productId=='5' && this.enableDriverDetails){
            this.onsave();
          }
          else if(this.enableCustomerDetails){
              this.saveCustomerDetails();
          }
          else {
            
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
          }
        }
    }
    else{
      this.onMakePayment();
    }
  }
  saveCustomerDetails(){
    let appointmentDate = "";
    let cityName = null,stateName = null;
    if(this.appointmentDate!='' && this.appointmentDate!=null && this.appointmentDate!=undefined){
      if(String(this.appointmentDate).split('-').length>1){
        let entry = this.appointmentDate.split('-')
        appointmentDate= entry[2]+'/'+entry[1]+'/'+entry[0]
      }
      else{
        appointmentDate = this.datePipe.transform(this.appointmentDate,'dd/MM/yyyy');
      }
    }
    let ReqObj = {
          "BrokerBranchCode": this.quoteDetails.BrokerBranchCode,
          "CustomerReferenceNo": this.customerDetails.CustomerReferenceNo,
          "InsuranceId": this.insuranceId,
          "BranchCode": this.branchCode,
          "ProductId":this.productId,
          "AppointmentDate": appointmentDate,
          "Address1": this.address1,
          "Address2": this.address2,
          "BusinessType": this.customerDetails?.BusinessType,
          "CityName":this.customerDetails?.CityName,
          "CityCode": this.customerDetails?.CityCode,
          "ClientName": this.clientName,
          "Clientstatus": this.customerDetails?.Clientstatus,
          "CreatedBy": this.loginId,
          "DobOrRegDate": this.customerDetails?.DobOrRegDate,
          "Email1": this.emailId,
          "Email2":null,
          "Email3": null,
          "Fax": null,
          "Gender": this.gender,
          "IdNumber": this.customerDetails?.IdNumber,
          "IdType": this.customerDetails.IdType,
          "IsTaxExempted": this.customerDetails.IsTaxExempted,
          "Language": "1",
          "MobileNo1":  this.mobileNo,
          "MobileNo2":  null,
          "MobileNo3":  null,
          "Nationality": this.customerDetails.Nationality,
          "Occupation": this.customerDetails?.Occupation,
          "Placeofbirth": "Chennai",
          "PolicyHolderType": this.customerDetails.PolicyHolderType,
          "PolicyHolderTypeid": this.customerDetails?.PolicyHolderTypeid,
          "PreferredNotification": this.preferredNotification,
          "QuoteNo": this.quoteNo,
          "RequestReferenceNo": this.quoteRefNo,
          "RegionCode": "01",
          "MobileCode1": this.mobileCode,
          "WhatsappCode": this.mobileCode,
          "MobileCodeDesc1":"1",
          "WhatsappDesc":"1",
          "WhatsappNo": this.mobileNo,
          "PinCode":  this.PinCode,
          "StateCode":  this.customerDetails?.StateCode,
          "StateName":  this.customerDetails?.StateName,
          "Status": this.customerDetails?.Clientstatus,
          "Street": this.customerDetails?.Street,
          "TaxExemptedId": this.customerDetails?.TaxExemptedId,
          "TelephoneNo1": this.customerDetails?.TelephoneNo1,
          "TelephoneNo2": null,
          "TelephoneNo3": null,
          "Title": this.titleCode,
          "VrTinNo": this.customerDetails.VrTinNo,
          "SaveOrSubmit": 'Submit'
        }
        if(this.endorsementSection && this.enableCustomerDetails){
          ReqObj['EndtStatus'] = this.quoteDetails?.EndtStatus;
          ReqObj['EndorsementTypeDesc'] = this.quoteDetails?.EndtTypeDesc;
          ReqObj['EndorsementType'] = this.quoteDetails?.EndtTypeId;
          ReqObj['EndtCategoryDesc'] = this.quoteDetails?.Endtcategdesc;
          ReqObj['EndtCount'] = this.quoteDetails?.Endtcount;
          ReqObj['EndtPrevPolicyNo'] = this.quoteDetails?.Endtprevpolicyno;
          ReqObj['EndtPrevQuoteNo'] = this.quoteDetails?.Endtprevquoteno;
        }
      let urlLink = `${this.CommonApiUrl}api/savecustomerdetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res:any = data;
        console.log(data);
        if(data.ErrorMessage.length!=0){
        if(res.ErrorMessage){
          for(let entry of res.ErrorMessage){

            //     this.toastr.error(
            //       entry.Field,
            //       entry.Message);
          }
        }
        }
        else{;
          // this.toastr.success(
          // 	  'Customer Details',
          // 	  'Customer Details Inserted/Updated Successfully',);
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
        }
      },
  
      (err: any) => { console.log(err); },
    );
  }
  onMakePayment(){
    let amount = null;
    if(this.EmiYn=='Y'){
      amount = this.dueAmount;
    }
    else{
      amount = this.localPremiumCost;
    }
    let ReqObj = {
      "CreatedBy": this.loginId,
      "EmiYn": this.EmiYn,
      "InstallmentMonth":this.emiMonth,
      "InstallmentPeriod":this.emiPeriod,
      "InsuranceId": this.loginId,
      "Premium": amount,
      "QuoteNo": this.quoteNo,
      "Remarks": "None",
      "SubUserType": this.subuserType,
      "UserType": this.userType
    }
    let urlLink = `${this.CommonApiUrl}payment/makepayment`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          if(this.productId=='5' && this.driverDetailsList.length!=0 && (!this.endorsementSection || (this.endorsementSection && this.enableDriverDetails))){
            sessionStorage.setItem('quotePaymentId',data.Result.PaymentId);
            this.onsave();
          }
          else if(data.Result.PaymentId){
            sessionStorage.setItem('quotePaymentId',data.Result.PaymentId);
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
          }
        }
      },
      (err) => { },
    );
  }
  onCommonDocumentDownload(index){
    let entry = this.uploadedDocList[index];
    let ReqObj = {
      "Id": entry.Id,
      "QuoteNo": this.quoteNo,
      "UniqueId": entry.UniqueId
    }
    let urlLink = `${this.CommonApiUrl}document/getoriginalimage`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result?.ImgUrl);
        link.setAttribute('download', data?.Result?.OriginalFileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }
  onListDocumentDownload(vehicleIndex,doc){
    let ReqObj = {
      "Id": doc.Id,
      "QuoteNo": this.quoteNo,
      "UniqueId": doc.UniqueId
    }
    let urlLink = `${this.CommonApiUrl}document/getoriginalimage`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result?.ImgUrl);
        link.setAttribute('download', data?.Result?.OriginalFileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }
  onDragDocument(target:any,fileType:any,type:any){
    let fileList = target;
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];

      var reader:any = new FileReader();
      reader.readAsDataURL(element);
        var filename = element.name;

        let imageUrl: any;
        reader.onload = (res: { target: { result: any; }; }) => {
          imageUrl = res.target.result;
          this.imageUrl = imageUrl;
          this.uploadDocList.push({ 'url': this.imageUrl,'DocTypeId':'','filename':element.name, 'JsonString': {} });

        }
      }
  }
  onViewDocument(index:any) {
    console.log("Recieved View",this.uploadDocList[index]);
    this.viewFileName = this.uploadDocList[index].filename;
    this.veiwSelectedDocUrl = this.uploadDocList[index].url;
    //this.modalService.open(this.content, { size: 'md', backdrop: 'static' });
  }
  onDeleteCommonDocument(index){
    let ReqObj = {
      "Id": this.uploadedDocList[index].Id,
      "QuoteNo": this.quoteNo,
      "UniqueId": this.uploadedDocList[index].UniqueId
    }
    let urlLink = `${this.CommonApiUrl}document/delete`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.ErrorMessage.length!=0){
              for(let entry of data.ErrorMessage){
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
            }
            else if(data?.Result){
              // let type: NbComponentStatus = 'success';
              //   const config = {
              //     status: type,
              //     destroyByClick: true,
              //     duration: 4000,
              //     hasIcon: true,
              //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
              //     preventDuplicates: false,
              //   };
              // this.toastrService.show(
              //   "Delete",
              //   "Document Deleted Successfully",
              //   config);
                this.getUploadedDocList(null,-1);
            }
          },
          (err) => { },
        );
  }
  onDeleteDocument(index:any) {
          this.uploadDocList.splice(index,1);
  }
  onDeleteSelectedListDocument(rowData,docIndex){
       this.uploadListDoc.splice(docIndex,1);

  }
}
