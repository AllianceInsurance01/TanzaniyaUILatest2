import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
@Component({
  selector: 'app-insured-details',
  templateUrl: './insured-details.component.html',
  styleUrls: ['./insured-details.component.css']
})
export class InsuredDetailsComponent implements OnInit {
  customerDetails: any;
  quoteRefNo: string;
  vehicleId: string;
  title: any;
  clientName: any;
  dateOfBirth: any;
  emailId: any;
  mobileNo: any;
  idNumber: any;
  vehicleDetails: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  motorDetails: any;
  constructor(private sharedService: SharedService) {
    this.vehicleId = sessionStorage.getItem('editVehicleId');
    this.quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    if(this.customerDetails){
      this.title = this.customerDetails?.TitleDesc;
      this.clientName = this.customerDetails?.ClientName;
      this.dateOfBirth = this.customerDetails?.DobOrRegDate;
      this.emailId = this.customerDetails?.Email1;
      this.mobileNo = this.customerDetails?.MobileNo1;
      this.idNumber = this.customerDetails?.IdNumber;
    }
    this.vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetails'));
    
   }

  ngOnInit(): void {
    let chassisNo = sessionStorage.getItem('vehChassisNo');
    console.log("Chassis No ",chassisNo)
    if(chassisNo) this.getVehicleDetails(chassisNo);
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
}
