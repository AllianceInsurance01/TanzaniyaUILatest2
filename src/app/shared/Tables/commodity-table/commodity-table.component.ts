declare var $:any;
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild, OnChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../app-config.json';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-commodity-table',
  templateUrl: './commodity-table.component.html',
  styleUrls: ['./commodity-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CommodityTableComponent implements OnInit {

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  closeResult: string;
  popupopen:boolean=false;
  minus:boolean=true;

  @Input('data') tableData: any[] = [];
  @Input('cols') columnHeader: any[] = [];
  @Input("innerData") innerTableData: any = [];
  @Input("innerCols") innerColumnHeader:any=[];
  @Input('Currency') Currency:any='';
//@Input("innertabData") innertabData:any=[];
  //@Input("inerListData") inerListData:any=[];
  @Input("gridType") gridType:any="";
  @Input('filterValue') filterValue: any = '';
  @Input('show') show:any;
  @Output('onGetEndorsements') onGetEndorsements = new EventEmitter();
  @Output('onAdd') onAdd = new EventEmitter();
  @Output('onSchedule') onSchedule = new EventEmitter();
  @Output('onCredit') onCredit = new EventEmitter();
  @Output('onDebit') onDebit = new EventEmitter();
  @Output('onEdit') onEdit = new EventEmitter();
  @Output('onActive')onActive= new EventEmitter();
  @Output('isActionBtn') isActionBtn = new EventEmitter();
   @Output ('onReject') onReject = new EventEmitter();
   @Output ('onMail') onMail = new EventEmitter();
   @Output ('onSms') onSms = new EventEmitter();
   @Output('onFollowup') onFollowup = new EventEmitter();
   @Output('onView') onView = new EventEmitter();
   @Output('onViews') onViews = new EventEmitter();
   @Output('add') add =new EventEmitter();
  public dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';

  public selectedData:any;
  expandedSymbol: string = null;
  selectedIndex: any=null;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.applyFilter(this.filterValue);
    if(!this.gridType){
      this.gridType = "";
    }
    console.log('hhkkkkk',this.tableData,this.innerTableData);
    //console.log('DDDDDDD',this.innertabData)
    // console.log('columnHeader',this.columnHeader,'tableData',this.tableData);

  }


  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;

  }

  ngAfterViewInit() {
    this.sortProperty = 'AllotedYN';
    this.sortDirection = 'desc';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
  onPassData(element:any,index){
   
    element.isClicked = !element.isClicked;
    if(element.isClicked){
      this.selectedIndex = index;
      this.onAdd.emit(element);
      this.add.emit(element);
      this.selectedData = element;
      this.minus=false;
    }
    else{
      this.selectedIndex = null;
      this.minus=true;
    }
    
  }



  toggleExpandableSymbol(symbol: null): void {
    this.expandedSymbol = this.expandedSymbol === symbol
      ? null
      : symbol;
  }


}
