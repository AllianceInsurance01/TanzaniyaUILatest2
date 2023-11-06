import { Component, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-premiumdetails-subsection',
  templateUrl: './premiumdetails-subsection.component.html',
  styleUrls: ['./premiumdetails-subsection.component.css']
})
export class PremiumdetailsSubsectionComponent {
  panelOpenState = false;
  @Input('cols') columnHeader: any = [];
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
  constructor(private modalService: NgbModal){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.userDetails.Result.ProductId;
    this.productName =  this.userDetails.Result.ProductName;
  }
  ngOninit(){
    console.log("columnHeader",this.columnHeader);
    console.log("columnHeader",this.columnriskdetails);
    console.log("customerDetails",this.customerDetails);
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
