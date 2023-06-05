import { Component, OnInit, Input } from '@angular/core';
//import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-new-company-details',
  templateUrl: './new-company-details.component.html',
  styleUrls: ['./new-company-details.component.scss']
})
export class NewCompanyDetailsComponent implements OnInit {

  @Input() title: any;
  statusValue:any= "YES";cityList:any[]=[];
  constructor(/*protected ref: NbDialogRef<NewCompanyDetailsComponent>*/) { }

  ngOnInit(): void {
  }
  dismiss() {
    //this.ref.close();
  }


}
