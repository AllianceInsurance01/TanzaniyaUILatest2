import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "./variables/charts";
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;tabSection:any='policy';
  public clicked: boolean = true;
  public clicked1: boolean = false;
  referralList:any[]=[];customerList:any[]=[];
  ngOnInit() {
    this.customerList = [
      {"CustomerName":"SteveSmith","Type":"Individual"},
      {"CustomerName":"Steve James","Type":"Individual"},
      {"CustomerName":"Michael","Type":"Individual"},
      {"CustomerName":"Thomas","Type":"Individual"},
      {"CustomerName":"Peter England","Type":"Individual"},
    ]
    this.referralList = [
      {"CustomerName":"SteveSmith","QuoteNo":"Q03622","ReferenceNumber":"MOT-05450","Remarks":"Test"},
      {"CustomerName":"SteveJames","QuoteNo":"Q03623","ReferenceNumber":"MOT-05451","Remarks":"Test"},
      {"CustomerName":"SteveSmith","QuoteNo":"Q03624","ReferenceNumber":"MOT-05452","Remarks":"Test"},
      {"CustomerName":"SteveJames","QuoteNo":"Q03625","ReferenceNumber":"MOT-05453","Remarks":"Test"},
      {"CustomerName":"SteveJames","QuoteNo":"Q03626","ReferenceNumber":"MOT-05454","Remarks":"Test"},
    ]
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }
  setTabSection(name){this.tabSection=name;}

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
