import { Component, OnInit, Input } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';
//import {NbDialogService } from '@nebular/theme';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ViewDocumnetDetailsComponent } from '../../../shared/view-documnet-details/view-documnet-details.component';

@Component({
  selector: 'app-viewquote-details',
  templateUrl: './viewquote-details.component.html',
  styleUrls: ['./viewquote-details.component.css'],
})
export class VieQuoteDetailsComponent implements OnInit {
  productId: any;
  userDetails: any;
  policyNo: string;
  @Input() policy: any;
  policye: any;
  no: boolean;
  referenceNo: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  selectedCoverList: any[] = [];
  vehicleDetailsList: any[] = [];
  customerData: any[] = [];
  coverDetails: any[] = [];
  coverDetailss: any[] = [];
  MotorDetails: any[] = [];
  MOT: any[] = [];
  commonDocTypeList: any[] = [];
  upload: any[] = [];
  titleValue: any;
  clientName: any;
  clientStatus: any;
  idTypeDesc: any;
  idNumber: any;
  MobileNo1: any;
  policyDesc: any;
  quoteRefNo: any;
  policyStartDate: string;
  policyEndDate: string;
  currencyCode: any;
  exchangeRate: any;
  executiveValue: any;
  InsuranceType: any;
  HavePromoCode: any;
  PromoCode: any;
  InsuranceClass: any;
  BodyType: any;
  WindScreenSumInsured: any;
  AcccessoriesSumInsured: any;
  motorDetails: any;
  Motorusage: any;
  PolicyStartDate: any;
  PolicyEndDate: any;
  NcdYn: any;
  SumInsured: any;
  TppdIncreaeLimit: any;
  Currency: any;
  insuranceId: any;
  loginId: any;
  branchCode: any;
  agencyCode: any;
  remarks: any;
  rejectedReason: any;
  adminSection: boolean = false;
  uploadedDocList: any[] = [];
  //uploadedList:any[]=[];
  quoteNo: any;
  vehicleList: any[] = [];
  orginalFileName: any;
  doctype: string;
  DocumentType: any;
  EmiYn: any;
  emiPeriod: any;
  emiMonth: any;
  dueAmount: any;
  totalPremium: number;
  CoverName: any;
  sum: any;
  Rate: any;
  max: any;
  min: any;
  reference: any;
  from: any;
  config = { multi: false };

  constructor(
    private router: Router,
    private sharedService: SharedService,
    /*private dialogService: NbDialogService*/ public dialog: MatDialog
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginId = this.userDetails.Result.LoginId;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.agencyCode = this.userDetails.Result.OaCode;
    //this.policyNo =sessionStorage.getItem('FromDetails');

    //this.policye= sessionStorage.getItem('policys')
    if (this.policyNo) {
      this.no = true;
    } else {
      this.no = false;
    }
    console.log('pppp', this.policye);
    //sessionStorage.getItem('quoteNo');

    //console.log('QQQQQQQQQQ',this.quoteNo);
    //this.getDocTypeList();
    //this.getUploadedDocList(1,'direct');
    let doc = JSON.parse(sessionStorage.getItem('DocuDetails'));
    console.log('DOOOOOOc', doc);
  }
  ngOnInit(): void {
    //let v=sessionStorage.getItem('PolicyNo');
    //console.log('QuoteNO',v);
    //let policyNo=JSON.parse(sessionStorage.getItem('FromDetails'));
    let policyObj = JSON.parse(sessionStorage.getItem('FromDetails'));
    this.referenceNo = policyObj?.CustomerReferenceNo;
    this.from = policyObj?.PolicyNo;
    this.from = policyObj?.PolicyNo;
    this.quoteNo = policyObj?.QuoteNo;
    this.quoteRefNo = policyObj?.RequestReferenceNo;
    console.log('RRRRRRRRRRRRR', this.referenceNo);
    console.log('QUOTENO', this.quoteRefNo);
    console.log('QQQQQQQQQ', this.quoteNo);

    if (this.referenceNo) {
      this.getCustomerDetails(this.referenceNo);
    }

    /*let reference =  sessionStorage.getItem('quoteReferenceNo');
     if(reference){
       this.quoteRefNo = reference;
     }*/
    //let referenceNo =  sessionStorage.getItem('customerReferenceNo');
    //console.log('rrrrr',referenceNo);

    /*if(referenceNo){
      this.getCustomerDetails(referenceNo);
      this.referenceNo = referenceNo;
      console.log('rrrrr',referenceNo);
    }*/
    this.getExistingVehiclesList();
    this.getCommonDocTypeList();
    //this.getEditVehicleDetails('direct');
    this.getEditQuoteDetails();
    //this.getTotalVehiclesCost();

    if (this.productId == '4') {
      this.getUploadedDocList(null, 1);
    }

    //this.getEditQuoteDetails();
    //this.getCoverList('direct')
    //this.checkSelectedCovers();
  }

  viewdetail() {
    //let policyNo=JSON.parse(sessionStorage.getItem('FromDetails'));
    //let policye=JSON.parse(sessionStorage.getItem('ToDetails'));
    //this.from = policyNo?.PolicyNo;
    if (this.from) {
      this.router.navigate(['/Home/policies']);
    } else {
      this.router.navigate(['/Home/existingQuotes']);
    }
  }
  getCommonDocTypeList() {
    let ReqObj = {
      ProductId: this.productId,
      SectionId: '99999',
      DocumentType: '1',
      InsuranceId: this.insuranceId,
    };
    let urlLink = `${this.ApiUrl1}master/dropdown/coverdocument`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.commonDocTypeList = data.Result;
          //  this.commonDocTypeList = [
          //    {"Code":"1","CodeDesc":"License"},
          //    {"Code":"2","CodeDesc":"Aadhar Card"}
          //  ];
          this.getUploadedDocList(null, -1);
        }
      },
      (err) => {}
    );
  }
  /*getMotorUsageList(vehicleValue){
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
            // if(this.motorDetails){
            //   let value = this.motorTypeList.find(ele=>ele.CodeDesc == this.motorDetails?.Motorusage);
            //   if(value){ this.motorUsageValue = value.Code}
            // }

            //this.getMotorUsageList();
        }

      },
      (err) => { },
    );
  }*/

  getCustomerDetails(referenceNo) {
    let ReqObj = {
      CustomerReferenceNo: referenceNo,
    };
    let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let customerDetails: any = data.Result;
          customerDetails = customerDetails;
          if (customerDetails) {
            console.log('Cust Details', customerDetails);
            sessionStorage.setItem(
              'customerDetails',
              JSON.stringify(customerDetails)
            );
            //this.router.navigate(['Home/existingQuotes/customerSelection/customerDetails/customer-details']);
          }
          this.titleValue = customerDetails.TitleDesc;
          this.clientName = customerDetails?.ClientName;
          this.clientStatus = customerDetails?.ClientStatusDesc;
          this.idTypeDesc = customerDetails?.IdTypeDesc;
          this.idNumber = customerDetails?.IdNumber;
          this.MobileNo1 = customerDetails?.MobileNo1;
          this.policyDesc = customerDetails.PolicyHolderTypeDesc;
        }
      },
      (err) => {}
    );
  }

  getEditVehicleDetails(i: any) {
    let ReqObj = {
      RequestReferenceNo: this.quoteRefNo,
      Idnumber: this.idNumber,
      Vehicleid: i,
    };
    let urlLink = `${this.motorApiUrl}api/getmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.motorDetails = data.Result;
          console.log('MMM', this.motorDetails);

          //this.myPopover=true;
          //$('#edit').customTemplatess({backdrop:'static', keyboard:false});
          //this.setVehicleValues('direct')

          //this.updateComponent.vehicleDetails = this.vehicleDetails;
          //if(type=='edit'){
          //this.setVehicleValues(type);
          //}
          /*else{
            this.onFormSubmit('save');
          }*/
        }
      },
      (err) => {}
    );
    //this.getInsuranceTypeList();
  }

  getExistingVehiclesList() {
    let ReqObj = {
      RequestReferenceNo: this.quoteRefNo,
    };
    let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.customerData = data.Result;
          console.log('CCCCCCUUUUUUUUUUU', this.customerData);
          this.InsuranceType = data.Result[0].InsuranceTypeDesc;
          this.InsuranceClass = data.Result[0].InsuranceClass;
          this.BodyType = data.Result[0].VehicleTypeDesc;
          this.WindScreenSumInsured = data.Result[0].WindScreenSumInsured;
          this.AcccessoriesSumInsured = data.Result[0].AcccessoriesSumInsured;

          if (this.customerData.length != 0) {
            let entry = this.customerData[0];

            //this.commonSection = true;
            //this.setCommonValues(entry);
          }
        }
      },
      (err) => {}
    );
  }

  getExistingBuildingList() {
    let ReqObj = {
      RequestReferenceNo: this.quoteRefNo,
    };
    let urlLink = `${this.motorApiUrl}home/getbuildingdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.customerData = data.Result;
          if (this.customerData.length != 0) {
            let entry = this.customerData[0];
            if (entry?.PolicyStartDate != null) {
              var dateParts = entry?.PolicyStartDate.split('/');
              // month is 0-based, that's why we need dataParts[1] - 1
              this.policyStartDate =
                dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
              //this.policyStartDate = dateObject.toString()
            }
            if (entry?.PolicyEndDate != null) {
              var dateParts = entry?.PolicyEndDate.split('/');
              // month is 0-based, that's why we need dataParts[1] - 1
              this.policyEndDate =
                dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
              //this.onChangeEndDate();
            }
            //this.executiveValue = entry?.AcExecutiveId;
            this.currencyCode = entry?.Currency;
            this.exchangeRate = entry?.ExchangeRate;
            //this.onCurrencyChange();
            this.executiveValue = entry?.AcExecutiveId;
            this.InsuranceType = entry?.SectionId;
            this.HavePromoCode = entry?.Havepromocode;
            this.PromoCode = entry?.Promocode;
          }
        }
      },
      (err) => {}
    );
  }
  /*getExistingTravelDetails(){
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo,
      "TravelId": "1"
      }
    let urlLink = `${this.motorApiUrl}api/gettraveldetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
            let customerDatas = data.Result;
            this.travelDetails = customerDatas;
            this.executiveValue = customerDatas?.AcExecutiveId;
            this.commissionValue = customerDatas?.CommissionType;
            if(customerDatas?.TravelStartDate != null ){
              var dateParts = customerDatas?.TravelStartDate.split("/");
              // month is 0-based, that's why we need dataParts[1] - 1
              this.travelStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
              this.updateComponent.travelStartDate = this.travelStartDate;
              //this.policyStartDate = dateObject.toString()
            }
            if(customerDatas?.TravelEndDate != null ){
              var dateParts = customerDatas?.TravelEndDate.split("/");
              // month is 0-based, that's why we need dataParts[1] - 1
              this.travelEndDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
              this.updateComponent.travelEndDate = this.travelEndDate;
              this.onChangeEndDate();
            }
          //  this.TravelForm.controls['travelStartDate'].setValue(customerDatas.TravelStartDate);
          //  this.TravelForm.controls['travelEndDate'].setValue(customerDatas.TravelEndDate);
           this.currencyCode = customerDatas.Currency;
           this.onCurrencyChange();
           //this.exchangeRate = customerDatas.ExchangeRate;
           this.commonSection = true;
      },
      (err) => { },
    );
  }*/

  getCoverList(coverListObj) {
    this.currencyCode = coverListObj?.Currency;
    //console.log('HCCCCCCCCCCC',this.currencyCode)
    let createdBy = this.loginId;
    let groupList = coverListObj?.GroupDetails;
    let vehicleList = [];
    if (groupList.length != 0) {
      let i = 0;
      for (let group of groupList) {
        let ReqObj = {
          InsuranceId: this.insuranceId,
          BranchCode: this.branchCode,
          AgencyCode: this.agencyCode,
          SectionId: coverListObj?.SectionId,
          ProductId: this.productId,
          MSRefNo: coverListObj?.MSRefNo,
          VehicleId: group.TravelId,
          CdRefNo: coverListObj?.CdRefNo,
          VdRefNo: coverListObj?.VdRefNo,
          CreatedBy: createdBy,
          productId: this.productId,
          Passengers: group.GroupMembers,
          RequestReferenceNo: coverListObj?.RequestReferenceNo,
        };
        let urlLink = `${this.CommonApiUrl}calculator/calc`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            let entry = data;

            entry['DestinationCountry'] = coverListObj.DestinationCountry;
            entry['TravelStartDate'] = coverListObj.TravelStartDate;
            entry['TravelEndDate'] = coverListObj.TravelEndDate;
            let groupEntry = groupList.filter(
              (ele) => ele.GroupId == data?.VehicleId
            );
            if (groupEntry) {
              entry['Passengers'] = groupEntry[0].GroupMembers;
              entry['TravelId'] = entry.VehicleId;
            }
            vehicleList.push(entry);
            i += 1;
            if (i == groupList.length) {
              this.vehicleDetailsList = vehicleList;
              this.checkSelectedCovers();
            }
          },
          (err) => {}
        );
      }
    }
  }

  checkSelectedCovers() {
    if (this.vehicleDetailsList.length != 0) {
      console.log('VVVVVVVVV', this.vehicleDetailsList);
      //this.currencyCode== this.vehicleDetailsList[0].CoverList[0].Currency;
      //console.log('HHHHHAAAAA',this.vehicleDetailsList[0].CoverList[0]);
      if (this.vehicleDetailsList[0].CoverList.length != 0) {
        this.currencyCode == this.vehicleDetailsList[0].CoverList[0].Currency;
      }
      let j = 0;
      for (let veh of this.vehicleDetailsList) {
        let i = 0;
        let coverList: any[] = veh.CoverList;
        for (let cover of coverList) {
          if (
            cover.isSelected == 'D' ||
            cover.isSelected == 'O' ||
            cover?.UserOpt == 'Y'
          ) {
            cover['selected'] = true;
            console.log('Selected 1', cover);
            this.onSelectCover(
              cover,
              true,
              veh.Vehicleid,
              veh,
              'coverList',
              'direct'
            );
          } else {
            console.log('Not Selected 1', cover);
            cover['selected'] = false;
          }
          i += 1;
          if (i == coverList.length) {
            let defaultList = coverList.filter(
              (ele) => ele.isSelected == 'D' || ele.UserOpt == 'Y'
            );
            let otherList = coverList.filter(
              (ele) => ele.isSelected != 'D' && ele.UserOpt != 'Y'
            );
            veh.CoverList = defaultList.concat(otherList);
            if (this.adminSection)
              veh.CoverList = coverList.filter(
                (ele) => ele.isSelected == 'D' || ele?.UserOpt == 'Y'
              );
          }
        }
        j += 1;
        if (j == this.vehicleDetailsList.length) {
          /*if(this.quoteNo!="null" && this.quoteNo!=null){
            this.updateComponent.quoteNo = this.quoteNo;
            //this.getEditQuoteDetails();
          }*/
          if (this.quoteRefNo != 'null' && this.quoteRefNo != null) {
            //this.updateComponent.quoteNo = this.quoteNo;
            this.getEditQuotDetails();
          } else {
            //this.dataSource = new MatTableDataSource(this.coverList);
            //this.dataSource.sort = this.sort;
            //this.dataSource.paginator = this.paginator;
            //this.applyFilter(this.filterValue);
          }
          //this.onGetCoverListById();
        }
      }
    }
  }

  getEditQuotDetails() {
    let i = 0;
    for (let veh of this.vehicleDetailsList) {
      if (veh.VehicleId) veh['Vehicleid'] = veh.VehicleId;
      if (i == 0) {
        this.remarks = veh.AdminRemarks;
        this.rejectedReason = veh.RejectReason;
      }
      let covers = veh.CoverList;
      let j = 0;
      for (let cover of covers) {
        let entry = this.vehicleDetailsList.find(
          (ele) => String(ele.Vehicleid) == String(veh.VehicleId)
        );
        if (entry) {
          let coverList = entry.CoverList;
          if (cover.UserOpt == 'Y') {
            let coverEntry = coverList.find(
              (ele) => ele.CoverId == cover.CoverId
            );
            if (coverEntry) {
              coverEntry['selected'] = true;
              this.onSelectCover(
                coverEntry,
                true,
                veh.VehicleId,
                veh,
                'coverList',
                'direct'
              );
              console.log('Selected 2', cover);
            }
          }
        }
        j += 1;
        if (j == covers.length) i += 1;
      }

      if (i == this.vehicleDetailsList.length) {
        //this.showSection = true;
        //this.coverSection = true;
        //this.EmiInstallment();
        console.log(
          'Final Vehicle Listaaaa',
          this.vehicleDetailsList,
          this.selectedCoverList
        );
        // this.dataSource = new MatTableDataSource(this.vehicleDetailsList);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
        // this.applyFilter(this.filterValue);
      }
    }
  }

  onSelectCover(rowData, event, vehicleId, vehicleData, type, directType) {
    if (type == 'coverList') {
      let vehicle = this.vehicleDetailsList.find(
        (ele) => ele.Vehicleid == vehicleId
      );
      let coverList = vehicle?.CoverList;
      if (event) {
        if (this.selectedCoverList.length != 0) {
          let entry = this.selectedCoverList.filter(
            (ele) => ele.Id == vehicleId
          );
          if (entry.length == 0) {
            let element = {
              Covers: [
                {
                  CoverId: rowData.CoverId,
                  SubCoverId: null,
                  SubCoverYn: 'N',
                  isReferal: rowData.isReferal,
                },
              ],
              Id: vehicleId,
              SectionId: rowData.SectionId,
            };
            this.selectedCoverList.push(element);

            vehicle['totalPremium'] = rowData.PremiumIncludedTax;
            console.log('Total Premium', rowData, vehicle);
            //this.getTotalVehiclesCost();
            //this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
          } else {
            let sectionEntry = entry.find(
              (ele) => ele.SectionId == rowData.SectionId
            );
            if (sectionEntry == undefined) {
              let element = {
                Covers: [
                  {
                    CoverId: rowData.CoverId,
                    SubCoverId: null,
                    SubCoverYn: 'N',
                    isReferal: rowData.isReferal,
                  },
                ],
                Id: vehicleId,
                SectionId: rowData.SectionId,
              };
              this.selectedCoverList.push(element);
              if (vehicle?.totalPremium) {
                vehicle['totalPremium'] =
                  vehicle['totalPremium'] + rowData.PremiumIncludedTax;
              } else {
                vehicle['totalPremium'] = rowData.PremiumIncludedTax;
              }
              //this.getTotalVehiclesCost();
            } else {
              let covers: any[] = sectionEntry.Covers;
              let findCover = covers.find(
                (ele) => ele.CoverId == rowData.CoverId
              );
              if (findCover == undefined) {
                let newEntry = {
                  CoverId: rowData.CoverId,
                  SubCoverId: null,
                  SubCoverYn: 'N',
                  isReferal: rowData.isReferal,
                };
                sectionEntry.Covers.push(newEntry);
                if (vehicle?.totalPremium) {
                  vehicle['totalPremium'] =
                    vehicle['totalPremium'] + rowData.PremiumIncludedTax;
                } else {
                  vehicle['totalPremium'] = rowData.PremiumIncludedTax;
                }
                //this.getTotalVehiclesCost();
              }
            }
          }
        } else {
          let element = {
            Covers: [
              {
                CoverId: rowData.CoverId,
                SubCoverId: null,
                SubCoverYn: 'N',
                isReferal: rowData.isReferal,
              },
            ],
            Id: vehicleId,
            SectionId: rowData.SectionId,
          };
          this.selectedCoverList.push(element);
          vehicle['totalPremium'] = rowData.PremiumIncludedTax;
          //this.getTotalVehiclesCost();
          // this.selectedCoverList.push(rowData);
          // this.totalPremium = this.totalPremium+rowData.PremiumIncludedTax
        }
      } else {
        let entry = this.selectedCoverList.filter((ele) => ele.Id == vehicleId);
        if (entry) {
          let sectionEntry = entry.find(
            (ele) => ele.SectionId == rowData.SectionId
          );
          if (sectionEntry != undefined) {
            let covers: any[] = sectionEntry.Covers;
            let CoverIndex = covers.findIndex(
              (ele) => ele.CoverId == rowData.CoverId
            );
            covers.splice(CoverIndex, 1);
            vehicle['totalPremium'] =
              vehicle['totalPremium'] - rowData.PremiumIncludedTax;
            //this.getTotalVehiclesCost();
          }
        }
      }
    }
  }

  getDocTypeList(rowData, index) {
    console.log('Row Data', rowData);
    let ReqObj = {
      ProductId: this.productId,
      SectionId: rowData.SectionId,
      DocumentType: '2',
      InsuranceId: this.insuranceId,
    };
    let urlLink = `${this.ApiUrl1}master/dropdown/coverdocument`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log('ddddddddddd', data);
        if (data.Result) {
          this.vehicleList[index]['docTypeList'] = data.Result;
        }
      },
      (err) => {}
    );
  }

  toggle(index: number) {
    let entry = this.vehicleList[index];
    if (!this.config.multi) {
      this.vehicleList
        .filter((menu, i) => i == index)
        .forEach((menu) => (menu.Collapse = !menu.Collapse));
      this.vehicleList
        .filter((menu, i) => i != index)
        .forEach((menu) => (menu.Collapse = false));
    }
  }

  getUploadedDocList(rowdata, index: any) {
    let docType = '',
      i = 0;
    if (index >= 0) {
      docType = '2';
    } else {
      docType = '1';
    }

    let ReqObj = {
      DocumentType: docType,
      Id: String(index + 1),
      InsCompanyId: this.insuranceId,
      QuoteNo: this.quoteNo,
    };
    let urlLink = `${this.CommonApiUrl}document/getdoclist`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          if (index < 0) {
            this.uploadedDocList = data.Result;
            console.log('uuuuuuuuuu', this.uploadedDocList);
          } else this.coverDetails[index].uploadedList = data.Result;
          this.upload = this.coverDetails[index].uploadedList;
        }
      },
      (err) => {}
    );
  }

  onViewCommonDocument(index) {
    let entry = this.uploadedDocList[index];
    let ReqObj = {
      DocumentId: entry.DocumentId,
      DocumentReferenceNo: entry.DocumentReferenceNo,
      Id: '0',
      QuoteNo: this.quoteNo,
    };
    let urlLink = `${this.ApiUrl1}document/getcompressedimage`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        /*this.dialogService.open(ViewDocumnetDetailsComponent, {
           context: {
             title: data.Result.OrginalFileName,
             imageUrl: data.Result.ImgUrl
           },
         });*/

        console.log('data', data);
        const dialogRef = this.dialog.open(ViewDocumnetDetailsComponent, {
          data: {
            title: data.Result.OrginalFileName,
            imageUrl: data.Result.ImgUrl,
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
          //this.animal = result;
        });
      },
      (err) => {}
    );
  }

  onCommonDocumentDownload(index) {
    let entry = this.uploadedDocList[index];
    let ReqObj = {
      DocumentId: entry.DocumentId,
      DocumentReferenceNo: entry.DocumentReferenceNo,
      Id: '0',
      QuoteNo: this.quoteNo,
    };
    let urlLink = `${this.ApiUrl1}document/getoriginalimage`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result?.ImgUrl);
        link.setAttribute('download', data?.Result?.OrginalFileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      },
      (err) => {}
    );
  }
  onViewListDocument(index, doc) {
    let ReqObj = {
      DocumentId: doc.DocumentId,
      DocumentReferenceNo: doc.DocumentReferenceNo,
      Id: String(index + 1),
      QuoteNo: this.quoteNo,
    };
    let urlLink = `${this.ApiUrl1}document/getcompressedimage`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        const dialogRef = this.dialog.open(ViewDocumnetDetailsComponent, {
          data: {
            title: data.Result.OrginalFileName,
            imageUrl: data.Result.ImgUrl,
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
          //this.animal = result;
        });
        /*this.dialogService.open(ViewDocumnetDetailsComponent, {
           context: {
             title: data.Result.OrginalFileName,
             imageUrl: data.Result.ImgUrl
           },
         });*/
      },
      (err) => {}
    );
  }

  getEditQuoteDetails() {
    let ReqObj = {
      QuoteNo: this.quoteNo,
    };
    let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
    // let ReqObj = {
    //   "ProductId": this.productId,
    //   "RequestReferenceNo": this.quoteRefNo
    // }
    // let urlLink = `${this.CommonApiUrl}api/view/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          let quoteDetails = data?.Result?.QuoteDetails;
          //this.coverDetails=data?.Result?.ProductDetails[0].Cover

          //this.MotorDetails= data?.Result?.ProductDetails[0].VehicleDetails;
          //this.InsuranceType=data?.Result?.ProductDetails[0].VehicleDetails.InsuranceTypeDesc;
          //this.InsuranceClass =data.Result.InsuranceClass;
          //this.BodyType=data.Result.VehicleTypeDesc;
          /*this.WindScreenSumInsured=data.Result.WindScreenSumInsured
              this.AcccessoriesSumInsured=data.Result.AcccessoriesSumInsured
              this.Motorusage=data.Result.Motorusage
              this.PolicyStartDate=data.Result.PolicyStartDate
              this.PolicyEndDate=data.Result.PolicyEndDate
              this.NcdYn=data.Result.NcdYn;
              this.SumInsured=data.Result.SumInsured
              this.TppdIncreaeLimit=data.Result.TppdIncreaeLimit
              this.Currency=data.Result.Currency*/

          /*this.CoverName= data?.Result?.ProductDetails[0].Covers[0].CoverName;
            this.sum= data?.Result?.ProductDetails[0].Covers[0].SumInsured;
            this.Rate= data?.Result?.ProductDetails[0].Covers[0].Rate;
            this.max= data?.Result?.ProductDetails[0].Covers[0].PremiumIncludedTax;
            this.min=data?.Result?.ProductDetails[0].Covers[0].PremiumAfterDiscount*/

          console.log('COVERNAME', this.CoverName);

          console.log('CCOOVVER', this.coverDetails);
          if (quoteDetails.EmiYn != null) {
            this.EmiYn = quoteDetails.EmiYn;
            this.emiPeriod = quoteDetails.InstallmentPeriod;
            this.emiMonth = quoteDetails.InstallmentMonth;
            this.dueAmount = quoteDetails.DueAmount;
          } else {
            this.EmiYn = 'N';
            this.emiPeriod = null;
            this.emiMonth = null;
          }
          this.coverDetails = data?.Result?.ProductDetails;
          console.log('MOTORDEtails', this.coverDetails);
          let vehicles = data?.Result?.ProductDetails;
          if (vehicles.length != 0) {
            let i = 0;
            this.vehicleList = [];


              for (let vehicle of vehicles) {
                let entry
                if (this.productId == '5'){
                  entry = vehicle.VehicleDetails;
                }
                if (this.productId == '4'){
                  entry = vehicle.TravelPassengerDetails;

                }

                if (this.productId == '3'){
                  entry = vehicle.BuildingDetails;
                }
                if(this.productId=='14' || this.productId=='13' || this.productId=='15' ){
                  entry = vehicle.CommonDetails;
                }



                console.log('Entry', entry);
                //this.MOT=vehicle.VehicleDetails;
                this.coverDetailss = vehicle.Covers;
                /*this.InsuranceType=entry.InsuranceTypeDesc;
                  this.InsuranceClass =entry.InsuranceClass;
                  this.BodyType=entry.VehicleTypeDesc;
                  this.WindScreenSumInsured=entry.WindScreenSumInsured
                  this.AcccessoriesSumInsured=entry.AcccessoriesSumInsured
                  this.Motorusage=entry.Motorusage
                  this.PolicyStartDate=entry.PolicyStartDate
                  this.PolicyEndDate=entry.PolicyEndDate
                  this.NcdYn=entry.NcdYn;
                  this.SumInsured=entry.SumInsured;
                  this.TppdIncreaeLimit=entry.TppdIncreaeLimit;
                  this.Currency=entry.Currency*/
                entry['CoverList'] = vehicle.Covers;
                this.vehicleList.push(entry);
                i += 1;
                if (i == vehicles.length){
                  console.log("Final Vehicles",this.vehicleList)
                  this.setVehicleList();
                }
              }





          }
          if (this.vehicleList.length != 0) {
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
          } else {
          }
        }
      },
      (err) => {}
    );
  }
  setVehicleList() {
    let i = 0;
    for (let vehicle of this.vehicleList) {
      vehicle['docList'] = [];
      vehicle['uploadedList'] = [];
      this.getDocTypeList(vehicle, i);
      this.getUploadedDocList(vehicle, i);
      i += 1;
      if (i == this.vehicleList.length)
        //this.docListSection = true;
        this.getTotalVehiclesCost();
      this.getEditVehicleDetails(i);
    }
  }

  getTotalVehiclesCost() {
    let totalCost = 0,
      i = 0;
    console.log('VECGJKKK', this.vehicleList);

    this.upload = this.vehicleList[0].uploadedList;

    for (let veh of this.vehicleList) {
      if (veh?.OverallPremiumFc)
        totalCost = totalCost + Number(veh?.OverallPremiumFc);

      i += 1;
      if (i == this.vehicleList.length) this.totalPremium = totalCost;
      console.log('tttttt');
    }
  }

  onListDocumentDownload(vehicleIndex, doc) {
    let ReqObj = {
      DocumentId: doc.DocumentId,
      DocumentReferenceNo: doc.DocumentReferenceNo,
      Id: String(vehicleIndex + 1),
      QuoteNo: this.quoteNo,
    };
    let urlLink = `${this.ApiUrl1}document/getoriginalimage`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result?.ImgUrl);
        link.setAttribute('download', data?.Result?.OrginalFileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      },
      (err) => {}
    );
  }

  /*getCustomerDetails(referenceNo){
    let ReqObj = {
      "CustomerReferenceNo": referenceNo
    }
    let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let customerDetails:any = data.Result;
          this.customerDetails = customerDetails;
          if(this.customerDetails){
            console.log("Cust Details",this.customerDetails)
            sessionStorage.setItem('customerDetails',JSON.stringify(this.customerDetails));
            //this.router.navigate(['Home/existingQuotes/customerSelection/customerDetails/customer-details']);
          }
              this.titleValue = customerDetails.TitleDesc;
              this.clientName = customerDetails?.ClientName;
              this.clientStatus = customerDetails?.ClientStatusDesc;
              this.idTypeDesc = customerDetails?.IdTypeDesc;
              this.idNumber = customerDetails?.IdNumber;
        }
      },
      (err) => { },
    );
  }*/
}
