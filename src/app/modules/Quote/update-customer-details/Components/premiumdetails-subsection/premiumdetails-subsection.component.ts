import { Component, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';
import moment from 'moment';
@Component({
  selector: 'app-premiumdetails-subsection',
  templateUrl: './premiumdetails-subsection.component.html',
  styleUrls: ['./premiumdetails-subsection.component.css']
})
export class PremiumdetailsSubsectionComponent {
  panelOpenState = false;
  @Input('cols') columnHeader: any;
  @Input('cols1') columnriskdetails: any = [];
  @Input('cols2') customerDetails: any = [];
  @Input('endrose') endrosement: boolean ;
  display = "none";
  customerTypeIndividual: any="Individual";
  customerTypeCorporate: any="Corporate";
  Popup:boolean=false;
  closeResult: string;
  userDetails:any;
  productId:any;
  productName: any;
  coverModificationYN: string;
  enableFieldsList: any[]=[];
  endorsementId: any;
  enableDateSection: boolean;
  policyStartDate: any=null;
  policyEndDate: any=null;
  minDate: Date;
  maxDate: Date;
  endMinDate: Date;
  endMaxDate: Date;
  noOfDays: any=null;
  travelStartDate: any=null;
  travelEndDate: any=null;
  constructor(private modalService: NgbModal, private updateComponent:UpdateCustomerDetailsComponent){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.userDetails.Result.ProductId;
    this.productName =  this.userDetails.Result.ProductName;
    this.minDate = new Date();
    if(this.productId=='5' || this.productId=='4' || this.productId=='46' || this.productId=='29'){
      this.minDate = new Date();
      var d = this.minDate;
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      this.maxDate = new Date(year, month, day+90);
    }
  }
  ngOnInit(): void{
    let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.endorsementId = endorseObj.EndtTypeId;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        let entry = this.enableFieldsList.some(ele=>ele=='Covers' || ele=='RemoveSection'  || ele=='AddOnCovers' || ele=='AddCovers' || ele=='removeVehicle');
        if(entry || this.endorsementId == 846) this.coverModificationYN = 'Y';
        else this.coverModificationYN = 'N';
        
      }
      else{
      }
      
  }
  ngAfterViewInit() {
    console.log("columnHeader",this.columnHeader);
    console.log("customerDetails",this.customerDetails);
    let endDate = this.columnHeader?.ExpiryDate;
    var dateParts = this.columnHeader?.InceptionDate.split("/");
    var dateParts2 = this.columnHeader?.ExpiryDate.split('/');
    var startDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
    console.log(startDate,(new Date(startDate)).setHours(0,0,0,0),(new Date()).setHours(0,0,0,0))
    if((new Date(startDate)).setHours(0,0,0,0) >= (new Date()).setHours(0,0,0,0) ){
        this.enableDateSection = false;
    }
    else{
      this.enableDateSection = true;
      if(this.productId!='4'){
          // month is 0-based, that's why we need dataParts[1] - 1
        this.policyStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        this.policyEndDate = dateParts2[2]+'-'+dateParts2[1]+'-'+dateParts2[0];
        this.updateComponent.policyStartDate = this.policyStartDate;
        this.updateComponent.policyEndDate = this.policyEndDate;
      }
      else{
        // month is 0-based, that's why we need dataParts[1] - 1
        this.travelStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        this.travelEndDate = dateParts2[2]+'-'+dateParts2[1]+'-'+dateParts2[0];
        this.updateComponent.travelStartDate = this.travelStartDate;
        this.updateComponent.travelEndDate = this.travelEndDate;
        this.onChangeEndDate('direct');
      }
      this.updateComponent.modifiedYN='Y';
      
    }
  }
  onStartDateChange(type){
    if(this.productId!='4'){
      if((this.productId=='5' || this.productId=='46' || this.productId=='29') && type=='change'){this.updateComponent.modifiedYN = 'Y'}
      var d = this.policyStartDate;
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      if(this.productId=='46'){
        this.endMinDate = new Date(this.policyStartDate);
        this.policyEndDate = new Date(year, month, day+29);
        this.endMaxDate = new Date(year, month, day+30);
        this.updateComponent.policyStartDate = this.policyStartDate;
        //this.updateComponent.policyEndDate = this.policyEndDate;
        this.onChangeEndDate(type);
      }
      else {
        this.endMinDate = new Date(this.policyStartDate);
        this.policyEndDate = new Date(year + 1, month, day-1);
        this.endMaxDate = new Date(year + 2, month, day-1);
        this.updateComponent.policyStartDate = this.policyStartDate;
        //this.updateComponent.policyEndDate = this.policyEndDate;
        this.onChangeEndDate(type);
      }
    }
    else{
      var d = this.travelStartDate;
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      this.endMinDate = new Date(this.travelStartDate);
      this.endMaxDate = new Date(year + 1, month, day-1);
       this.updateComponent.travelStartDate = this.travelStartDate;
      if(this.noOfDays!='' && this.noOfDays!=undefined && this.noOfDays!=null){
        this.travelEndDate = new Date(year, month, day+Number(this.noOfDays-1));
        //this.endMaxDate = new Date(year + 1, month, day-1);
        this.updateComponent.travelStartDate = this.travelStartDate;
        this.updateComponent.travelEndDate = this.travelEndDate;
      }
    }
  }
  onChangeEndDate(type){
    if(this.productId!='4'){
      if((this.productId=='5' || this.productId=='46' || this.productId=='29') && type=='change'){this.updateComponent.modifiedYN = 'Y'}
    const oneday = 24 * 60 * 60 * 1000;
    const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    const formattedDatecurrent = new Date(this.policyStartDate);
    console.log(formattedDate);
    this.updateComponent.policyStartDate = this.policyStartDate;
    this.updateComponent.policyEndDate = this.policyEndDate;
    this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
    this.updateComponent.noOfDays = this.noOfDays;
    }
    else{
    const oneday = 24 * 60 * 60 * 1000;
    const momentDate = new Date(this.travelEndDate); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    const formattedDatecurrent = new Date(this.travelStartDate);
    console.log(formattedDate);
    this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
    this.updateComponent.travelStartDate = this.travelStartDate;
    this.updateComponent.travelEndDate = this.travelEndDate;
    this.updateComponent.noOfDays = this.noOfDays;
    }
  }
  openmodel(modal){
    this.open(modal);
  }
  checkEndorseValue(rowData,type,menu){
    let endorse = rowData.Endorsements;
    
    if(endorse.length!=0){
      let entry = endorse[endorse.length-1];
      if(type == 'empty'){
          return (entry.PremiumIncludedTax === 0 || entry.PremiumIncludedTax == null)
      }
      else if(type=='value' && this.coverModificationYN=='N') return  entry.PremiumIncludedTax;
      else if(type=='value'){
          let sectionEntry = this.columnriskdetails.find(ele=>ele.SectionId == rowData.SectionId);
          if(sectionEntry!=undefined){
            let covers:any[] = sectionEntry.Covers;
            let findCover = covers.find(ele=>ele.CoverId==rowData.CoverId);
            if(findCover==undefined) return 0;
            else return entry.PremiumIncludedTax
          }
      }
    }
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
}
