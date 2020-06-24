import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, AfterViewInit {
  @ViewChild('lineChart') chartRef: ElementRef;
  chart: any;

  dataPoints: any[] = [];
  chartContext: any;
  labels: any[] = [];

  specs = 7;

  constructor() {
  }

  ngOnInit() {
    // generate some random testing data:

    for (let i = 0; i < 10000; i++) {
      this.dataPoints.push({x: i, y: i * this.specs});
      this.labels.push(i.toString() + ' devices');
    }
    console.log(this.dataPoints);
  }

  ngAfterViewInit() {
    // let index = 0;
    // for (let i = 0; i < 50; i++) {
    //   this.dataPoints.push({x: index, y: 0});
    //   this.labels.push(index);
    //   index++;
    // }
    this.chartContext = this.chartRef.nativeElement.getContext('2d');
    this.initChart();
  }

  initChart() {
    this.chart = new Chart(this.chartContext, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.dataPoints,
            // radius: 5,
            // fill: true
            showLine: false
          }
        ]
      },
      options: {
        animation: {
          duration: 0
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              suggestedMin: 0,
              suggestedMax: 70000,
              display: true
            },
            type: 'logarithmic'
          }],
          yAxes: [{
            display: true,
            ticks: {
              suggestedMin: 0,
              suggestedMax: 80000,
              display: true
            }
          }],
        },
        tooltip: {
          enabled: true
        },
        responsive: true
      }
    });
  }
}
