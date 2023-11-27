import { Component, Input, OnInit, ViewChild, OnChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { CommodityTableComponent } from '../commodity-table.component';

@Component({
  selector: 'app-inner-table',
  templateUrl: './inner-table.component.html',
  styleUrls: ['./inner-table.component.scss']
})
export class InnerTableComponent implements OnInit {


  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public proposalNo = '';
  public userDetails: any;
  @Input('data') tableData: any[] = [];
  @Input('cols') columnHeader: any[] = [];
  @Input('filterValue') filterValue: any = '';
  @Output('onEdit') onEdit = new EventEmitter();
  @Output('onOpenCoverAction') onOpenCoverAction = new EventEmitter();
  @Output('isActionBtn') isActionBtn = new EventEmitter();
  @Output('onReqPath') onReqPath = new EventEmitter();
  @Output('onResPath') onResPath = new EventEmitter();

  public dataSource: any;currencyCode:any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';


  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private commodityTableComponent: CommodityTableComponent
  ) {
    this.proposalNo = sessionStorage.getItem('ProposalNo');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    //this.userDetails = this.userDetails.LoginResponse;
  }

  ngOnChanges() {
    if(this.tableData){
      this.tableData = this.tableData.filter(ele=>ele.Status!='D');
    
      if(this.tableData.length!=0){
        if(this.tableData[0].Currency)
        this.currencyCode = this.tableData[0].Currency;
      }
    }
    
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.applyFilter();
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

  applyFilter() {
    this.dataSource.filter = this.filterValue?.trim().toLowerCase();
  }

  private _filter(value: any, data: any[]): any[] {
    if (value == null) {
      value = '';
    }
    const filterValue = value.toLowerCase();
    return data.filter((option) => option?.CodeDescription?.toLowerCase().includes(filterValue));
  }


  onSubmit() {
    // console.log(this.commodityTableComponent.selectedData, this.tableData);
    // const selectedData = this.commodityTableComponent.selectedData;
    // const CommodityRateInfo: any[] = this.tableData.filter((x: any) => x.CommodityId == selectedData.CommodityId).map(z => ({
    //   "BaseRate": z.CommodityBaseRate,
    //   "CoverId": z.CoverId,
    //   "CoverName": z.CoverName,
    //   "ExcessDescription": z.DiscountDesc,
    //   "ExcessPercent": z.DiscountPercent,
    //   "ExcessValue": z.DiscountValue,
    //   "ModeOfTransport": z.ModeOfTransport,
    //   "ModeOfTransportName": z.ModeOfTransportDesc
    // }));
    // const urlLink = `${this.ApiUrl1}OpenCover/commodity/ratesetup/save`;


    // const reqData = {
    //   "CommodityDetails": [
    //     {
    //       "CommodityDescription": this.commodityTableComponent.selectedData.CommodityName,
    //       "CommodityId": this.commodityTableComponent.selectedData.CommodityId,
    //       "CommodityName": this.commodityTableComponent.selectedData.CommodityName,
    //       "CommodityRateInfo": CommodityRateInfo
    //     }
    //   ],
    //   "ProposalNo": this.proposalNo
    // }

    // this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
    //   (data: any) => {
    //     console.log(data);
    //   },
    //   (err) => { },
    // );

  }

  onPassData(element: any, name: any) {
    element['btnValue'] = name
    this.isActionBtn.emit(element);
  }

}
