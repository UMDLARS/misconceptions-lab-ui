import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges
} from '@angular/core';
import {Chart} from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('lineChart') chartRef: ElementRef;
  @Input() chartData: number;
  @Input() realDevices: number;
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

  ngOnChanges(change: any) {
    this.chartData = change.chartData.currentValue;
    // console.log(change);
    if (!change.chartData.firstChange) {
      this.updateChart();
    }
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
        // animation: {
        //   duration: 5
        // },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              labelString: '# of devices',
              display: true
            },
            display: true,
            ticks: {
              display: true
            },
            // type: 'logarithmic'
          }],
          yAxes: [{
            scaleLabel: {
              labelString: 'Yearly earnings (in USD)',
              display: true
            },
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
        annotation: {
          drawTime: 'afterDatasetsDraw', // this is the default
          annotations: [{
            id: 'shodan-line', // optional
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: this.realDevices,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              enabled: true,
              position: 'center',
              content: 'real world devices'
            },
            onClick: (e) => {
              console.log('OnClick works!');
            }
          }]
        },
        responsive: true
      },
      plugins: [ChartAnnotation]
    });
  }

  public updateChart() {
    // console.log('in updateChart');
    this.dataPoints = [];
    this.labels = [];
    for (let i = 0; i < 10000; i ++) {
      this.dataPoints.push(i * this.chartData);
      this.labels.push(i.toString());
    }
    this.initChart();
  }

}
