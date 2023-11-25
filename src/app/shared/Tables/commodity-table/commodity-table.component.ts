declare var $:any;
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild, OnChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  @Input('totalQuoteRecords') totalQuoteRecords:any;
  @Input('pageNo') activePage:any = null;
  @Input("start") start:any="";
  @Input("end") end:any="";
  @Input('pageCount') pageCount:any='';
  @Output('onGetEndorsements') onGetEndorsements = new EventEmitter();
  @Output('onAdd') onAdd = new EventEmitter();
  @Output('onSchedule') onSchedule = new EventEmitter();
  @Output('onCredit') onCredit = new EventEmitter();
  @Output('onDebit') onDebit = new EventEmitter();
  @Output('onPayEmi') onPayEmi = new EventEmitter();
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
   @Output('onCheckStatus') onCheckStatus = new EventEmitter();
   @Output('onLoadNextData') onLoadNextData =new EventEmitter();
   @Output('onLoadPreviousData') onLoadPreviousData =new EventEmitter();
  public dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';

  public selectedData:any;
  expandedSymbol: string = null;
  selectedIndex: any=null;
  pageEvent: PageEvent;
  endCount: any=null;
  startCount: any=null;
  nextSection: boolean=false;
  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    console.log('hhkkkkk',this.totalQuoteRecords,this.innerTableData);
    let data = this.tableData;
     this.splitToNChunks(this.tableData,this.pageCount,'first','direct')
    
    console.log('hhkkkkk',this.tableData,this.innerTableData);
    //console.log('DDDDDDD',this.innertabData)
    // console.log('columnHeader',this.columnHeader,'tableData',this.tableData);

  }
  splitToNChunks(array, n,type,btnType) {
    var PageOfItems:any[]=[];
      if(this.activePage==1 && btnType=='direct'){
        PageOfItems = array.slice(0,n);
        console.log("Final List",PageOfItems)
        this.nextSection = true;
        this.startCount = 1;
        if(this.totalQuoteRecords<=n){
          this.endCount = this.totalQuoteRecords;
        }
        else this.endCount = n;
      }
      else{
        
        if(btnType=='next' || btnType=='direct'){
          this.nextSection = true;
          if(type=='direct'){
            this.startCount = this.endCount+1;
            if(Number(this.totalQuoteRecords)<=Number(this.endCount)+(Number(n))){
              console.log("Final Entered 1",this.endCount,this.totalQuoteRecords,n)
                  this.endCount = Number(this.totalQuoteRecords)
                  
            }
            else{this.endCount = Number(this.endCount)+(Number(n)); console.log("Final Entered 2",this.endCount)}
          }
          else{
            this.startCount = this.start;this.endCount = this.end;
          }
        }
        else{
          this.nextSection = true;
          if(this.endCount == Number(this.totalQuoteRecords)){
            this.endCount = this.startCount-1;
            this.startCount = this.startCount-n;
          }
          else{
            this.startCount = this.startCount-n;
            this.endCount = this.endCount-(n);
          }
        }
        let startCount = 0,endCount=0;
        PageOfItems = array.slice(this.startCount-1,this.endCount);
        console.log("Final Page List",this.activePage,this.startCount,this.endCount,this.startCount-1,this.endCount-1,startCount,endCount)
      }
      this.dataSource = new MatTableDataSource(PageOfItems);
      this.dataSource.sort = this.sort;
      //this.dataSource.paginator = this.paginator;
      this.applyFilter(this.filterValue);
      if(!this.gridType){
        this.gridType = "";
      }
  }
  onNextPage(){
    if((this.endCount==10 && this.tableData.length<=60) || (this.endCount==70 && this.tableData.length<=120) || (this.endCount==130 && this.tableData.length<=180) || (this.endCount==190 && this.tableData.length<=240) || (this.endCount==250 && this.tableData.length<=300) || (this.endCount==310 && this.tableData.length<=360)  || (this.endCount==370 && this.tableData.length<=420)){
      if(this.tableData.length!=this.totalQuoteRecords){
        sessionStorage.setItem('loadingType','disable');
        this.activePage+=1;
        let obj = {
          'activePage':this.activePage,
          'startCount': this.startCount,
          'endCount': this.endCount,
          'n':this.pageCount
        }
        this.onLoadNextData.emit(obj);
        this.nextSection = true;
        this.splitToNChunks(this.tableData,this.pageCount,'direct','next') 
        console.log("Final Datas",this.tableData,this.startCount,this.endCount);
      }
      else{
        this.nextSection = true;
        this.splitToNChunks(this.tableData,this.pageCount,'direct','next') 
      }
    }
    else{
        this.nextSection = true;
       this.splitToNChunks(this.tableData,this.pageCount,'direct','next') 
    }
  }
  checkDataIndex(){
    return ((this.endCount<this.totalQuoteRecords && this.endCount<this.tableData.length) && this.nextSection)
  }
  onPreviousPage(){
    // if(this.startCount==61 || this.startCount == 121 || this.startCount==181 || this.startCount == 241 || this.startCount==301 || this.startCount==361  || this.startCount==421){
      
    //   let obj = {
    //     'activePage':this.activePage,
    //     'startCount': this.startCount-this.pageCount-this.pageCount,
    //     'endCount': this.endCount-this.pageCount-this.pageCount,
    //     'n':this.pageCount
    //   }
    //   this.onLoadPreviousData.emit(obj);
    // }
    // else{
      this.nextSection = true;
        if(this.startCount==61 || this.startCount == 121 || this.startCount==181 || this.startCount == 241 || this.startCount==301 || this.startCount==361  || this.startCount==421){
          this.activePage-=1;
          this.splitToNChunks(this.tableData,this.pageCount,'direct','previous');
        }
        else{
          this.splitToNChunks(this.tableData,this.pageCount,'direct','previous');
        }
    //}
    
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
  onChangePageCount(event){
    this.activePage=1;
    this.start = 1; this.end=Number(this.pageCount);
    console.log("Changed Event",this.start,this.end)
      this.splitToNChunks(this.tableData,Number(this.pageCount),'first','next');
  }
  onPaginateChange(event){
    console.log("Event Received",event)
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
