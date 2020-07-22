import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('lineChart') chartRef: ElementRef;
  @Input() chartData: number;
  chart: any;

  dataPoints: any[] = [];
  chartContext: any;
  labels: any[] = [];

  constructor() {}

  ngAfterViewInit() {
    for (let i = 0; i < 10000; i ++) {
      this.dataPoints.push(i * this.chartData);
      this.labels.push(i.toString());
    }
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
            radius: 0,
            fill: true, // default is true
            borderWidth: 8, // default is 3
          }
        ]
      },
      options: {
        animation: {
          duration: 5
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            labelString: '# of devices',
            display: true,
            ticks: {
              display: true
            },
            // type: 'logarithmic'
          }],
          yAxes: [{
            labelString: 'Yearly earnings (in USD)',
            display: true,
            ticks: {
              callback: (value, index, values) => {
                return '$' + value;
              },
              display: true
            }
          }],
        },
        tooltip: {
          enabled: true,
          position: 'nearest',
          mode: 'label',
          intersect: false
        },
        hover: {
          mode: 'label'
        },
        responsive: true
      }
    });
  }

}
