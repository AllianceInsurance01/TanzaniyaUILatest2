import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';
import { DatePipe } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-preesceptionimages',
  templateUrl: './preesceptionimages.component.html',
  styleUrls: ['./preesceptionimages.component.css']
})
export class PreesceptionimagesComponent {
  public AppConfig: any = (Mydatas as any).default;
  public PreExceptionUrl: any = this.AppConfig.PreExceptionUrl;
  // public customerHeader:any=[];
  // public innerColumnHeader:any=[];
  public getdate:any='';
  public getTransId:any='';
  public preexception: any[]=[];
  public tableData: any[] = [];
  public tableImageData: any[] = [];
  public yearList: any[] = [];
  public monthList: any[] = [];
  public TableImagePath:any;
  public ImageName:any;
  public getImagePath:any;
  public getOriginalImageName:any;
  public Notavailable:boolean=false;
  dob:any="";
  StartDate:any="";
  selectedMonth:any="";
  selectedYear:any='';
  NoData:boolean=false;
  public Page: number = 1;

  constructor(private sharedService: SharedService,private datePipe:DatePipe){

    this.getAllYears();
    this.getAllMonths(this.selectedYear);
  }

  ngOnInit(): void {
    this.preexceptionTable();
    this.getAllMonths(this.selectedYear);
  }

  async preexceptionTable(){
    let urlLink = `${this.PreExceptionUrl}whatsapptemplate/getPreinspectionImages`;
    (await this.sharedService.onGetMethodPreexceptionAsync(urlLink)).subscribe((data:any)=>{
      console.log("getPreinspectionImages",data);
      if(data.Response){
        this.preexception = data?.Response;
        console.log("this.preexception", this.preexception);
    }
    })
  }

  async getPreinspectionImagesByDate(){
    let date = "";
    if(this.dob!='' && this.dob!= null && this.dob!=undefined){
      date = this.datePipe.transform(this.dob,'dd/MM/yyyy')
    }
    this.getdate=date;
    let urlLink = `${this.PreExceptionUrl}whatsapptemplate/getPreinspectionImagesByDate?entryDate=`+this.getdate;
    (await this.sharedService.onGetMethodPreexceptionAsync(urlLink)).subscribe((data:any)=>{
      console.log("getPreinspectionImagesByDate",data);
      if(data.Response){
        this.tableImageData = [];
        this.tableData=  data?.Response;
        console.log("Data",this.tableData)
        this.NoData=false;
      }
      if(data.Response == '' || data.Response == 'FAILED'){
        this.NoData=true;
      }
    })
  }
   //Download Image
   async getPreinspectionImagesdownload(event,i){
    console.log("******",event);
    console.log("***Image***",event.Image[i].ImagePath);
    this.getImagePath=event.Image[i].ImagePath;
    console.log("this.getImagePath",this.getImagePath);
    this.getOriginalImageName=event.Image[i].OriginalFileName;
    console.log("this.getImagePath",this.getOriginalImageName);
    let urlLink = `${this.PreExceptionUrl}whatsapptemplate/document/download?FilePath=`+this.getImagePath+`&OriginalFileName=`+this.getOriginalImageName;
        const link = document.createElement('a');
        // link.setAttribute('target', '_blank');
        link.setAttribute('href', urlLink);
        link.setAttribute('download', `products.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
  }

  getAllYears() {
    var NowYear = new Date().getFullYear();
    var Years = [];
    for (var Y = NowYear; Y >= NowYear - 123; Y--) {
      Years.push(Y);
    }
    this.yearList = Years;
  }
  getAllMonths(year){
    const date = new Date();
    const currentYear = date.getFullYear();
    for (let index = 0; index < 12; index++) {
      let daysInMonth = this.getDaysInMonth(year, index);
      this.monthList.push(daysInMonth)
    }
  }
  //DAYS IN MONTH DATA
  getDaysInMonth(year: any, month: any) {
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    var date = new Date(`${year}-${month}-1`);
    var firstDay = moment(new Date(date.getFullYear(), date.getMonth(), 1)).format("DD/MM/YYYY");
    var lastDay = moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format("DD/MM/YYYY");
    console.log("date",date);
    return {
      Days: new Date(year, month, 0).getDate(),
      Month: monthNames[new Date(year, month, 0).getMonth()],
      Dates: `${firstDay}-${lastDay}`
    };
  }
}
