import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent implements OnInit {


  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      
    }

  ngOnInit(): void {
    console.log("Modal Data",this.data);
  }

}
