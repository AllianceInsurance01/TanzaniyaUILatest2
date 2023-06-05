import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, AfterViewInit, Injectable, ViewChild,Inject } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';



/**
 * A database that only load part of the data initially. After user clicks on the `Load more`
 * button, more data will be loaded.
 */
interface FoodNode {  
  name: string;  
  children?: FoodNode[];  
}  
@Component({
  selector: 'app-productDialog',
  templateUrl: './productDialog.component.html',
  styleUrls: ['./productDialog.component.scss']
})
export class ProductDialogComponent implements AfterViewInit {
  TREE_DATA: FoodNode[] = [  
    {  
      name: 'Motor Private Vehicles',  
      children: [  
        {name: 'Base Cover'},  
        {name: 'Loss Of Use',
            children: [
              {name: '15 Days'},  
              {name: '20 Days'},  
            ]
        },  
        {name: 'TPL Cover'},  
      ]  
    },  
  ];
  activateNode: any="Products";
  Status: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceId: string;
  ProductLists:any[]=[];
  productid: any;
  sectionList: any[]=[];
  emiList: any[]=[];
  factorTypeList: any[]=[];
  treeData: any;
  taxTypeList: any[]=[];proRataList: any[]=[];
  paymentTypeList: any[]=[];
  policyTypeList: any[]=[];
  ngAfterViewInit() {
    //document.getElementById('node-Vegetables').click();

  }
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);  
  dataSource = new MatTreeNestedDataSource<FoodNode>();  
  sectionTreeData = new MatTreeNestedDataSource<FoodNode>();  
  factorTreeData = new MatTreeNestedDataSource<FoodNode>();

  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any
  ,private sharedService:SharedService,) {
    
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.Status=this.data?.title;
      this.productid=this.data?.Id;
      if(this.Status){
        this.ongetdetails()
      }
      this.dataSource.data = this.TREE_DATA;  

    
  }

  ongetdetails(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productid,
    }

     let urlLink = `${this.ApiUrl1}master/companyproductconfigstatus`;
       this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
         (data: any) => {
           console.log(data);
           if(data.Result){
            let productDetails = data?.Result;
            if(productDetails?.SectionDeatils) this.sectionList = productDetails?.SectionDeatils;
            if(productDetails?.EmiDetails) this.emiList = productDetails?.EmiDetails;
            if(productDetails?.FactorTypeDetails) this.factorTypeList = productDetails?.FactorTypeDetails;
            if(productDetails?.TaxSetupDetails) this.taxTypeList = productDetails?.TaxSetupDetails;
            if(productDetails?.ProRataDetails) this.proRataList = productDetails?.ProRataDetails;
            if(productDetails?.PaymentDetails) this.paymentTypeList = productDetails?.PaymentDetails;
            if(productDetails?.PolicyTypeDetails) this.policyTypeList = productDetails?.PolicyTypeDetails
            this.setTreeValues();
           }
         },
       (err) => { },
     );
  }
  setTreeValues(){
    if(this.sectionList.length!=0){
      let treeData:any=[
        {name:"Sections","class":"sectionBg",count:this.sectionList.length,children:[]}
      ];let i=0;
      for(let section of this.sectionList){
          let entry = {
            name:section.Name,
            count:null,
            class:"sectionBg",
            children:[]
          }
          if(section.CoverDetails.length!=0){
            let j=0;
            entry.children = [
              {name:"Covers",class:"coverBg",count:section.CoverDetails.length,children:[]}
            ]
            for(let cover of section.CoverDetails){
              let coverEntry = {name:cover.Name, class:"coverBg",count:null,children:[]}
              entry.children[0].children.push(coverEntry);
              j+=1;
              if(j==section.CoverDetails.length){
                treeData[0].children.push(entry);
                i+=1;
                if(i==this.sectionList.length){this.treeData = treeData; this.setFactorTypes()}
              }
            }
          }
          else{
            treeData.push(entry);i+=1;
            if(i==this.sectionList.length){this.treeData = treeData; this.setFactorTypes()}
          }
      }
    }
    else{this.treeData=[];this.sectionTreeData = this.treeData; this.setFactorTypes();}
  }
  setFactorTypes(){
    if(this.factorTypeList.length!=0){
      let treeData:any=[
        {name:"Factor Types","class":"factorBg",count:this.factorTypeList.length,children:[]}
      ];let i=0;
      for(let factor of this.factorTypeList){
          let entry = {
            name:factor.Name,
            count:null,
            class:"factorBg",
            children:[]
          }
            treeData[0].children.push(entry);i+=1;
            if(i==this.factorTypeList.length){this.treeData = this.treeData.concat(treeData);;this.setProRataDetails() }
      }
    }
    else{
      this.sectionTreeData = this.treeData
      this.setProRataDetails(); 
    }
  }
  setProRataDetails(){
    if(this.proRataList.length!=0){
      let treeData:any=[
        {name:"Pro Rata","class":"payBg",count:this.proRataList.length,children:[]}
      ];let i=0;
      for(let factor of this.proRataList){
          let entry = {
            name:factor.Name,
            count:null,
            class:"payBg",
            children:[]
          }
            treeData[0].children.push(entry);i+=1;
            if(i==this.proRataList.length){this.treeData = this.treeData.concat(treeData);;this.setTaxDetails() }
      }
    }
    else{
      this.sectionTreeData = this.treeData
      this.setTaxDetails(); 
    }
  }
  setTaxDetails(){
    if(this.taxTypeList.length!=0){
      let treeData:any=[
        {name:"Taxes","class":"taxBg",count:this.taxTypeList.length,children:[]}
      ];let i=0;
      for(let factor of this.taxTypeList){
          let entry = {
            name:factor.Name,
            count:null,
            class:"taxBg",
            children:[]
          }
            treeData[0].children.push(entry);i+=1;
            if(i==this.taxTypeList.length){this.treeData = this.treeData.concat(treeData);;this.setEmiDetails() }
      }
    }
    else{
      this.sectionTreeData = this.treeData
      this.setEmiDetails(); 
    }
  }
  setEmiDetails(){
    if(this.emiList.length!=0){
      let treeData:any=[
        {name:"EMI","class":"emiBg",count:this.emiList.length,children:[]}
      ];let i=0;
      for(let emi of this.emiList){
          let entry = {
            name:emi.Name,
            count:null,
            class:"emiBg",
            children:[]
          }
            treeData[0].children.push(entry);i+=1;
            if(i==this.emiList.length){this.treeData = this.treeData.concat(treeData);;this.setPaymentDetails() }
      }
    }
    else{
      this.sectionTreeData = this.treeData
      this.setPaymentDetails(); 
    }
  }
  setPaymentDetails(){
    if(this.paymentTypeList.length!=0){
      let treeData:any=[
        {name:"Payment Types","class":"payBg",count:this.paymentTypeList.length,children:[]}
      ];let i=0;
      for(let pay of this.paymentTypeList){
          let entry = {
            name:pay.Name,
            count: null,
            class:"payBg",
            children:[]
          }
            treeData[0].children.push(entry);i+=1;
            if(i==this.paymentTypeList.length){this.treeData = this.treeData.concat(treeData);;this.setPolicyTypeDetails() }
      }
    }
    else{
      this.sectionTreeData = this.treeData
      this.setPolicyTypeDetails(); 
    }
  }
  setPolicyTypeDetails(){
    if(this.policyTypeList.length!=0){
      let treeData:any=[
        {name:"Policy Types","class":"policyBg",count:this.policyTypeList.length,children:[]}
      ];let i=0;
      for(let pay of this.policyTypeList){
          let entry = {
            name:pay.Name,
            count:null,
            class:"policyBg",
            children:[]
          }
            treeData[0].children.push(entry);i+=1;
            if(i==this.policyTypeList.length){this.treeData = this.treeData.concat(treeData);this.sectionTreeData = this.treeData }
      }
    }
    else{
      this.sectionTreeData = this.treeData
    }
  }
  close(){ this.dialogRef.close();}
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;  
}