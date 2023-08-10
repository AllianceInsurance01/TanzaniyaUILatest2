import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import * as Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
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
  _chart: any;
  ngOnInit() {
    this._chart = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: true,
        type: 'pie',
        renderTo: 'PieChart',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0,
        },
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{series.name}: {point.y} & {point.percentage:.1f}%'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 45,
          size: 90,
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.y}({point.percentage:.1f} %)'
          }
        }
      },
      series: [{
        name: 'Claim TotalCount & Percentage ',
        colorByPoint: true,
        data: [
          { "name": 'Referral Rejected', "y": Number(3), "id": 'RR' },
          { "name": 'Referral Pending', "y": Number(5), "id": 'RP' },
          { "name": 'Referral Approved', "y": Number(7), "id": 'RR' }
        ],
        point: {
          events: {
            click: function (event) {
             
            },
          }
        }
      }]
    }
    Highcharts.chart('PieChart', this._chart);
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
