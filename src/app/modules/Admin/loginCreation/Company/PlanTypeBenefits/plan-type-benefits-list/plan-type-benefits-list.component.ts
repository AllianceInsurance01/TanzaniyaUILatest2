import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../../../app-config.json';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { animate, state, style, transition, trigger } from '@angular/animations';
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
  productId: any=null;
  loginId: any=null;countryList:any[]=[];planTypeList:any[]=[];
  public activeMenu:any='PlanType';planTypeValue:any=null;
  sectionList:any[]=[];sectionValue:any=null;countryValue:any=null;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl:any= this.AppConfig.CommonApiUrl;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  benefitsList: any[]=[];
  columnHeader: any[]=[];
  innerColumnHeader: any[]=[];
  dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;
  @ViewChild(MatPaginator) private paginator2!: MatPaginator;
  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';
  filterValue: any = '';filterValue2: any = '';
  public selectedData:any;
  expandedSymbol: string = null;
  selectedIndex: any=null;
  minus: boolean;
  closeResult: string;
  dataSource2: any;
  constructor(private router:Router,private sharedService: SharedService,private modalService: NgbModal,) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
   
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
      {
        key: 'edit',
        display: 'SubCovers',
        sticky: false,
        config: {
          isCollapse: true,
          isCollapseName:''
        },
      },
      { key: 'CoverDesc', display: 'Cover Name' },
      {
        key: 'Status',
        display: 'Status',
        
      },
      {
        key: 'add',
        display: 'Action',
        config: {
          isDelete: true
        }
      },
    ];

    this.innerColumnHeader =  [
      { key: 'SubCoverDesc', display: 'SubCover Name' },
      { key: 'Currency', display: 'Currency' },
      { key: 'SumInsured', display: 'Limits' },
      { key: 'Excess', display: 'Excess' },
      {
        key: 'Status',
        display: 'Status',
        
      },
      {
        key: 'add',
        display: 'Action',
        config: {
          isDelete: true
        }
      },

    ];
    this.benefitsList =  [
          {
              "CoverId": "1",
              "CoverDesc": "PERSONAL ASSISTANCE",
              "Status":"Y",
              "SubCoverDetails": [
                  {
                      "SubCoverId": "1",
                      "SubCoverDesc": "RELAY OF URGENT MESSAGES",
                      "Currency": "US $",
                      "SumInsured": "Included Service Only",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "2",
                      "SubCoverDesc": "DISPATCH OF MEDICATION",
                      "Currency": "US $",
                      "SumInsured": "Included Service Only",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "3",
                      "SubCoverDesc": "GENERAL INFORMATION",
                      "Currency": "US $",
                      "SumInsured": "Included Service Only",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "4",
                      "SubCoverDesc": "HIJACK",
                      "Currency": "US $",
                      "SumInsured": "$ 60 Hour Max $ 3.000",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  }
              ]
          },
          {
              "CoverId": "2",
              "CoverDesc": "MEDICAL TRASPORTATION AND\r\nREPATRIATION",
              "Status":"Y",
              "SubCoverDetails": [
                  {
                      "SubCoverId": "1",
                      "SubCoverDesc": "MEDICAL TRANSPORTATION OR  REPATRIATION",
                      "Currency": "US $",
                      "SumInsured": "$ 15.000",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "2",
                      "SubCoverDesc": "TRANSPORT OF A PERSON DUE TO THE\r\nHOSPITALISATION OF THE INSURED",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "3",
                      "SubCoverDesc": "STAY OF A PERSON DUE TO THE\r\nHOSPITALISATION OF THE INSURED",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "4",
                      "SubCoverDesc": "TRANSPORTATION OR REPATRIATION\r\nOF THE ACCOMPANYING INSUREDS",
                      "Currency": "US $",
                      "SumInsured": "$ 2.000",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  }
              ]
          },
          {
              "CoverId": "3",
              "CoverDesc": "MEDICAL EXPENSES",
              "Status":"Y",
              "SubCoverDetails": [
                  {
                      "SubCoverId": "1",
                      "SubCoverDesc": "MEDICAL EXPENSES ABROAD – Including\r\nCovid-19",
                      "Currency": "US $",
                      "SumInsured": "$ 30.000",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "2",
                      "SubCoverDesc": "COMPULSORY QUARANTINE in case of\r\ninfection with Covid-19",
                      "Currency": "US $",
                      "SumInsured": "$ 80 Per day max 14 days",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "3",
                      "SubCoverDesc": "FIRST MEDICAL ASSISTANCE ABROAD",
                      "Currency": "US $",
                      "SumInsured": "Included in General Limit",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "4",
                      "SubCoverDesc": "DENTAL EXPENSES",
                      "Currency": "US $",
                      "SumInsured": "$ 450",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "5",
                      "SubCoverDesc": "PHARMACEUTICAL EXPENSES",
                      "Currency": "US $",
                      "SumInsured": "Included in General Limit",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "6",
                      "SubCoverDesc": "PASSIVE WAR AND TERRORISM - Only Medical Expenses",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  }
              ]
          },
          {
              "CoverId": "4",
              "CoverDesc": "REPATRIATION OF MORTAL REMAINS",
              "Status":"Y",
              "SubCoverDetails": [
                  {
                      "SubCoverId": "1",
                      "SubCoverDesc": "TRANSPORT OR REPATRIATION OF THE DECEASED INSURED",
                      "Currency": "US $",
                      "SumInsured": "$ 30.000",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  }
              ]
          },
          {
              "CoverId": "5",
              "CoverDesc": "LUGGAGE",
              "Status":"Y",
              "SubCoverDetails": [
                  {
                      "SubCoverId": "1",
                      "SubCoverDesc": "INDEMNITY DUE TO PROBLEMS WITH\r\nTHE CHECKED - IN LUGGAGE\r\n(ACCIDENTAL DAMAGE, LOSS,\r\nROBBERY)",
                      "Currency": "US $",
                      "SumInsured": "$ 1.500",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "2",
                      "SubCoverDesc": "COMPENSATION FOR BAGGAGE DELAY",
                      "Currency": "US $",
                      "SumInsured": "$ 250",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  }
              ]
          },
          {
              "CoverId": "6",
              "CoverDesc": "CANCELLATION",
              "Status":"Y",
              "SubCoverDetails": [
                  {
                      "SubCoverId": "1",
                      "SubCoverDesc": "REIMBURSEMENT OF THE\r\nCANCELLATION EXPENSES OF THE TRIP",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  }
              ]
          },
          {
              "CoverId": "7",
              "CoverDesc": "DELAYS",
              "Status":"Y",
              "SubCoverDetails": [
                  {
                      "SubCoverId": "1",
                      "SubCoverDesc": "INDEMNITY DUE TO THE TRANSPORT\r\nDEPARTURE DELAY",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "2",
                      "SubCoverDesc": "MISSED CONNECTIONS",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "3",
                      "SubCoverDesc": "MISSED DEPARTURE",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  }
              ]
          },
          {
              "CoverId": "8",
              "CoverDesc": "CURTAILMENT",
              "Status":"Y",
              "SubCoverDetails": [
                  {
                      "SubCoverId": "1",
                      "SubCoverDesc": "CURTAILMENT EXPENSES",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "2",
                      "SubCoverDesc": "EARLY RETURN DUE TO SERIOUS FAMILY MATTER",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  }
              ]
          },
          {
              "CoverId": "9",
              "CoverDesc": "PERSONAL ACCIDENTS",
              "Status":"Y",
              "SubCoverDetails": [
                  {
                      "SubCoverId": "1",
                      "SubCoverDesc": "ACCIDENTAL DEATH MEANS OF\r\nTRANPORT",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "2",
                      "SubCoverDesc": "PERMANENT ACCIDENTAL DISABILITY\r\n(MEANS OF TRANSPORT)",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  }
              ]
          },
          {
              "CoverId": "10",
              "CoverDesc": "PERSONAL LIABILITY",
              "Status":"Y",
              "SubCoverDetails": [
                  {
                      "SubCoverId": "1",
                      "SubCoverDesc": "PERSONAL LIABILITY DUE TO PHYSICAL\r\nDAMAGES TO THIRD-PARTIES",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "2",
                      "SubCoverDesc": "LEGAL DEFENCE (NOT TRAFFIC)",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "3",
                      "SubCoverDesc": "DEPOSIT FOR LEGAL COSTS AND\r\nEXPENSES",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  },
                  {
                      "SubCoverId": "4",
                      "SubCoverDesc": "PERSONAL LIABILITY DUE TO MATERIAL\r\nDAMAGES TO THIRD-PARTIES",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  }
              ]
          },
          {
              "CoverId": "11",
              "CoverDesc": "COMPLEMENTARY MEDICAL COVERS",
              "Status":"Y",
              "SubCoverDetails": [
                  {
                      "SubCoverId": "1",
                      "SubCoverDesc": "HOSPITAL COMPENSATION",
                      "Currency": "US $",
                      "SumInsured": "NIL",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  }
              ]
          },
          {
              "CoverId": "12",
              "CoverDesc": "COMPLEMENTARY CARD COVERS",
              "Status":"Y",
              "SubCoverDetails": [
                  {
                      "SubCoverId": "1",
                      "SubCoverDesc": "REPLACEMENT OF THE PASSPORT AND\r\nTHE DRIVING LICENCE BY EMERGENCY\r\nDOCUMENTS",
                      "Currency": "US $",
                      "SumInsured": "$ 500",
                      "Excess": null,
                      "EntryDate": "15/12/2022",
                      "Status": "Y",
                      "Remarks": null
                  }
              ]
          }
      ]
      this.dataSource = new MatTableDataSource(this.benefitsList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }
  onDeleteCoverRow(index){
    this.benefitsList.splice(index,1);
    this.dataSource = new MatTableDataSource(this.benefitsList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }
  getPlanTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let obj = [{ Code: "", CodeDesc: "--SELECT--" }];
        this.sectionList = obj.concat(data?.Result);
        //this.typeList = data.Result;
      },
      (err) => { },
    );
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
        this.planTypeList = obj.concat(data?.Result);
        if(this.planTypeValue!=null){
          //this.getBenefitsList();
        }
        //this.typeList = data.Result;
      },
      (err) => { },
    );
  }
  getBenefitsList(){
      let ReqObj = {
        "PlanTypeId": this.planTypeValue,
        "PolicyTypeId": this.sectionValue
      }
      let urlLink = `${this.motorApiUrl}api/gettravelpolicytype`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          this.benefitsList = data?.Result.CoverDetails;
          
        },
        (err) => { },
      );
  }
  onAddCoverRow(){
    let entry = [
      {
        "CoverId": null,
        "CoverDesc": "",
        "Status":"Y",
        "SubCoverDetails": [
           
        ]
      }
    ]
    this.benefitsList = entry.concat(this.benefitsList);
    this.dataSource = new MatTableDataSource(this.benefitsList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    if(value=='PlanType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/planTypeBenefits'])
  }
  toggleExpandableSymbol(symbol: null): void {
    this.expandedSymbol = this.expandedSymbol === symbol
      ? null
      : symbol;
  }
}
