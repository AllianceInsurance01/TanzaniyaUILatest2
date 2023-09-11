import { Component, OnInit,Input, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cover-details',
  templateUrl: './cover-details.component.html',
  styleUrls: ['./cover-details.component.scss']
})
export class CoverDetailsComponent implements OnInit {
  titles:any; @Input()benefitList:any[]=[];
  PolicyHeader:any[]=[];
  innerColumnHeader:any[]=[];innerTableData:any[]=[];
  PolicyTypeDesc:any;pageCount:any=10;
  PlanTypeDesc:any;startIndex:any=1;
  Remarks:any;endIndex:any=10;
  constructor(public dialogRef: MatDialogRef<CoverDetailsComponent>,public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.PolicyHeader =  [
      { key: 'CoverId', display: 'Cover Id' },
      { key: 'CoverDesc', display: 'Cover Name' },
      {
        key: 'edit',
        display: 'SubCover Details',
        sticky: false,
        config: {
          isCollapse: true,
          isCollapseName:'SubCovers'
        },
      },
    ];

    this.innerColumnHeader =  [
      { key: 'SubCoverDesc', display: 'SubCover Name' },
      { key: 'SumInsured', display: 'Sum Insured' },
      { key: 'Excess', display: 'Excess' },

    ];
   }

  ngOnInit(): void {
 console.log('BBBBBB',this.data);
    this.benefitList = this.data.benefitList;
  }
  onInnerData(rowData){
    rowData['MotorList'] = rowData.SubCoverDetails;
  }
  onClose(){
      this.dialogRef.close();
  }
  getTotalCount(benefit){
    return benefit.CoverDetails.length;
  }
  onNextData(element){
  }
  onPreviousData(element){
  }
}
