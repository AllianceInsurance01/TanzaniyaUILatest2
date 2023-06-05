import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { ClientComponent } from '../../client.component';
import { DatePipe } from '@angular/common';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { SharedService } from '../../../../../shared/shared.service';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  titleList:any[]=[];titleValue:any="";
  clientStatus:any="Y";typeList:any[]=[];
  typeValue:any="";policyHolderList:any[]=[];
  policyHolderTypeList:any[]=[];customerDetails:any;
  clientName:any="";holderTypeValue:any="";clientID:any="";
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  userDetails:any;loginId:any;branchCode:any;insuranceId:any;
  editSection:boolean=false;appointmentDate:any;
  value:any="P";taxYN:any="N";taxCode:any;
  dob:any="";preferedNotification:any="Sms";
  minDate:Date;
  currentDate: Date;
  maxiDate: Date;
  maxDate: Date;
  regDate: Date;
  Value:any;
  dateSection:boolean;
  RefSection:boolean;
  constructor(private router:Router,private sharedService: SharedService,
    private clientComponent:ClientComponent,private datePipe:DatePipe) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));

    this.loginId = this.userDetails.Result.LoginId;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.currentDate = new Date();
    var d = new Date();
    let minDate = new Date();
    let regDate = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();

    this.maxiDate = new Date(year - 18 ,month,day);
    this.maxDate = new Date(year ,month, day-1);
    this.minDate = new Date(year - 100,month, day );
    this.regDate = new Date(year - 50,month, day );



    //   this.titleList = [
    //     {
    //         "Code": "1",
    //         "CodeDesc": "Mr"
    //     },
    //     {
    //         "Code": "2",
    //         "CodeDesc": "Ms"
    //     },
    //     {
    //         "Code": "3",
    //         "CodeDesc": "Mrs"
    //     }
    // ]
    this.customerDetails = this.clientComponent.customerDetails;
    console.log("Child Details",this.customerDetails)
    //   this.typeList =  [
    //     {
    //         "Code": "1",
    //         "CodeDesc": "For Individual"
    //     },
    //     {
    //         "Code": "2",
    //         "CodeDesc": "For Cooperate"
    //     }
    // ]
    this.getTitleList();
   }

  ngOnInit(): void {
    let Status=sessionStorage.getItem('customerReferenceNo');
    if(Status){

      this.editSection=false;
    }

    else{
      this.editSection=true;
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
           this.titleList = data.Result;
           this.getPolicyHolderList();
        }
      },
      (err) => { },
    );
  }
  getPolicyHolderList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }

    let urlLink = `${this.CommonApiUrl}dropdown/policyholdertype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.policyHolderList = data.Result;
           this.setClientDetails();
           //this.getPolicyIdTypeList();
        }
      },
      (err) => { },
    );
  }
  getPolicyIdTypeList(type){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "PolicyTypeId": this.typeValue
    }
    let urlLink = `${this.CommonApiUrl}dropdown/policyholderidtype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          //this.holderTypeValue = null;
           this.policyHolderTypeList = data.Result;
           if(type=='change') this.dob="";
        }
      },
      (err) => { },
    );
  }
  setClientDetails(){
    this.titleValue = this.customerDetails?.Title;
    this.clientName = this.customerDetails?.ClientName;
    this.typeValue = this.customerDetails?.PolicyHolderType;
    this.holderTypeValue = this.customerDetails?.PolicyHolderTypeid;
    this.clientID = this.customerDetails?.IdNumber;
    if(this.customerDetails?.IsTaxExempted==null || this.customerDetails?.IsTaxExempted==''){
      this.taxYN = "N";
    }
    else{
      this.taxYN = this.customerDetails?.IsTaxExempted;
    }
    
    this.taxCode = this.customerDetails.TaxExemptedId;
    console.log('tttttttttttt',this.taxCode);

    this.preferedNotification = this.customerDetails?.PreferredNotification;
    if(this.preferedNotification==null) this.preferedNotification = 'Sms';
    if(this.customerDetails?.AppointmentDate != null ){
      var dateParts = this.customerDetails?.AppointmentDate.split("/");
      // month is 0-based, that's why we need dataParts[1] - 1
      this.appointmentDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];


//this.policyStartDate = dateObject.toString()
}
          if(this.customerDetails?.DobOrRegDate != null ){
            var dateParts = this.customerDetails?.DobOrRegDate.split("/");
            // month is 0-based, that's why we need dataParts[1] - 1
            this.dob = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];


      //this.policyStartDate = dateObject.toString()
    }

    if(this.customerDetails?.Clientstatus)
    this.clientStatus = this.customerDetails?.Clientstatus;
    if(this.typeValue!='' && this.typeValue!= null) this.getPolicyIdTypeList('edit');

  }
  onProceed(submitType){
    let dob="",appointmentDate="";


    // let type: NbComponentStatus = 'danger';
    //           const config = {
    //             status: type,
    //             destroyByClick: true,
    //             duration: 4000,
    //             hasIcon: true,
    //             position: NbGlobalPhysicalPosition.TOP_RIGHT,
    //             preventDuplicates: false,
    //           };

              //}

    if(this.titleValue!='' && this.titleValue!=null && this.titleValue!= undefined){
      this.customerDetails['Title'] = this.titleValue;
      if(this.clientName!='' && this.clientName!=null && this.clientName!= undefined){
        this.customerDetails['ClientName'] = this.clientName;
        if(this.typeValue!='' && this.typeValue!=null && this.typeValue!= undefined){
          this.customerDetails['PolicyHolderType'] = this.typeValue;
          if(this.holderTypeValue!='' && this.holderTypeValue!=null && this.holderTypeValue!= undefined){
            this.customerDetails['PolicyHolderTypeid'] = this.holderTypeValue;
            if(this.clientID!='' && this.clientID!=null && this.clientID!= undefined){
              this.customerDetails['IdNumber'] = this.clientID;
              this.customerDetails['Clientstatus'] = this.clientStatus;

             if(this.dob!= undefined && this.dob!=null && this.dob!='')
                {
                  dob = this.datePipe.transform(this.dob, "dd/MM/yyyy");
                  this.customerDetails['DobOrRegDate'] = dob;
                  console.log("DOBBBB",this.dob)
                  if(this.appointmentDate!= undefined && this.appointmentDate!=null && this.appointmentDate!='')
                  {
                    appointmentDate = this.datePipe.transform(this.appointmentDate, "dd/MM/yyyy");
                    this.customerDetails['AppointmentDate'] = appointmentDate;
                    if(this.taxYN=='N' || this.taxYN==null || this.taxYN==undefined){
                      this.taxYN='N'; this.taxCode = null;
                      this.customerDetails['IsTaxExempted'] = this.taxYN;
                      this.customerDetails['TaxExemptedId'] = this.taxCode;
                      console.log('SSSSSSS',this.taxCode);
                      this.customerDetails['PreferredNotification'] = this.preferedNotification;
                        this.clientComponent.customerDetails = this.customerDetails;
                        if(submitType=='save'){
                          this.clientComponent.onUpdateDetails('save');
                        }
                        else{
                          this.router.navigate(['/Home/customer/Client/client-type']);
                        }
                    }
                    else if(this.taxCode!= undefined && this.taxCode!=null && this.taxCode!=''){
                      this.customerDetails['IsTaxExempted'] = this.taxYN;
                      this.customerDetails['TaxExemptedId'] = this.taxCode;
                      console.log('ssd',this.taxCode)
                      this.customerDetails['PreferredNotification'] = this.preferedNotification;
                        this.clientComponent.customerDetails = this.customerDetails;
                        if(submitType=='save'){
                          this.clientComponent.onUpdateDetails('save');
                        }
                        else{
                          this.router.navigate(['/Home/customer/Client/client-type']);
                        }

                    }
                    else{
                      //this.toastrService.show('Tax Code',"Please Enter the Tax Code",config);
                    }
                  }
                  else {
                    //this.toastrService.show('Appointment Date ',"Please Enter the Appointment Date",config);
                  }


            }

            else {
              //this.toastrService.show('Date ',"Please Enter the Date",config);
            }}
            else{
              //this.toastrService.show('Customer ID',"Please Enter Customer ID Number",config);
            }


          }


          else{
            //this.toastrService.show('Policy Holder ID Type',"Please Select Policy Holder ID Type",config);
          }
        }
        else{
          //this.toastrService.show('Policy Type',"Please Select Policy Type",config);
        }
      }
      else{
        //this.toastrService.show('Client Name',"Please Enter Client Name",config);
      }
    }
    else{
      //this.toastrService.show('Title',"Please Select Title",config);
    }
    }


  }

