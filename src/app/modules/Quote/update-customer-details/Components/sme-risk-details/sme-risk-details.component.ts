import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
//declare var $:any;




@Component({
  selector: 'app-sme-risk-details',
  templateUrl: './sme-risk-details.component.html',
  styleUrls: ['./sme-risk-details.component.scss']
})
export class SMERiskDetailsComponent implements OnInit {
  ngOnInit(): void {

  }
}
