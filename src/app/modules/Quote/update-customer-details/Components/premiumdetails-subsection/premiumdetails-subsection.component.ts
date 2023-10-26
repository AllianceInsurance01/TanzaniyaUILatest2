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
  constructor(private modalService: NgbModal){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.userDetails.Result.ProductId;
    this.productName =  this.userDetails.Result.ProductName;
  }
  ngOninit(){
    console.log("columnHeader",this.columnHeader);
    console.log("columnHeader",this.columnriskdetails);
    console.log("customerDetails",this.customerDetails);
  }
  openmodel(modal){
    this.open(modal);
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
