import { Component, Input, OnInit, ViewChild, OnChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../app-config.json';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.scss'],
})
export class GridTableComponent implements OnInit, OnChanges, AfterViewInit {

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;

  @Input('data') tableData: any[] = [];
  @Input('dataValue') dataValue: any;
  @Input('cols') columnHeader: any[] = [];
  @Input('filterValue') filterValue: any = '';
  @Input('Currency') Currency:any='';
  @Input('ReferenceNo') ReferenceNo:any='';
  @Output('onCoverRatingEdit') onCoverRatingEdit = new EventEmitter();
   @Output('onSubCoverRatingEdit') onSubCoverRatingEdit = new EventEmitter();
  // tslint:disable-next-line: no-output-rename
  @Output('onSelectCustomer') onSelectCustomer = new EventEmitter();
  @Output('onEdit') onEdit = new EventEmitter();
  @Output('onConfigure') onConfigure = new EventEmitter();
  @Output('onDelete') onDelete = new EventEmitter();
  // tslint:disable-next-line: no-output-rename
  @Output('onOpenCoverAction') onOpenCoverAction = new EventEmitter();
  @Output('onViews') onViews = new EventEmitter();
  @Output('onGetSchedule') onGetSchedule = new EventEmitter();
  @Output('onGetSchedules') onGetSchedules = new EventEmitter();
  @Output('onView') onView = new EventEmitter();
  @Output('onRequestdown') onRequestdown = new EventEmitter();
  @Output('onResponsedown') onResponsedown = new EventEmitter();
  @Output('onSchedule') onSchedule = new EventEmitter();
  @Output('onAddNew') onAddNew = new EventEmitter();
  @Output('onDeleteNew') onDeleteNew = new EventEmitter();
  @Output('onInfo') onInfo = new EventEmitter();
  @Output('onCredit') onCredit = new EventEmitter();
  @Output('onDebit') onDebit = new EventEmitter();
  @Output('countBasedPolicy') countBasedPolicy = new EventEmitter();
  public dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';
  endorsementSection: boolean=false;
  enableAddVehicle: boolean=false;
  enableFieldsList: any[]=[];
  endorsementId: any;
  dataValues: any;


  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
  ) {

  }

  ngOnChanges() {
    console.log(this.tableData);
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataValues=this.dataValue;
    this.dataSource.paginator = this.paginator;
    this.applyFilter(this.filterValue);
    console.log(this.filterValue);
  }


  ngOnInit() {
    console.log('Data in Grid', this.tableData);
    this.dataSource = new MatTableDataSource(this.tableData);
    console.log(this.dataSource);
    this.dataSource.sort = this.sort;
    if(this.ReferenceNo!='' && this.ReferenceNo!=null && this.ReferenceNo!=undefined){

    }
    if(sessionStorage.getItem('endorsePolicyNo')){
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.enableFieldsList = endorseObj.FieldsAllowed;
        this.endorsementId = endorseObj.EndtTypeId;
        if(this.endorsementId!=42 && this.endorsementId!=842){
          this.enableAddVehicle = this.enableFieldsList.some(ele=>ele=='addVehicle');
        }
      }
    }
  }

  ngAfterViewInit() {
    this.sortProperty = 'AllotedYN';
    this.sortDirection = 'desc';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  onCheckCustomer(rowData){
   return this.ReferenceNo==rowData.CustomerReferenceNo;
  }
  onSelect(rowData){
    this.onSelectCustomer.emit(rowData);
  }
  get keys() {
    return this.columnHeader.map(({ key }) => key);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue?.trim().toLowerCase();
  }

  private _filter(value: any, data: any[]): any[] {
    if (value == null) {
      value = '';
    }
    const filterValue = value.toLowerCase();
    return data.filter((option) => option?.CodeDescription?.toLowerCase().includes(filterValue));
  }




}
