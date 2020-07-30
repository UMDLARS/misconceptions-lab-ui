import {AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

// the marks for previous attacks:
// 2014 ICMP/NTP attack: 196 Gbps
// 2015 UDP/ICMP/NTP attack: 127 Gbps
// early 2016 UDP/DNS: 230
// SYN/ACK/GRE/HTTP Mirai: 623 Gbps
// Github memcached servers: 1350 Gbps

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('lineChart') chartRef: ElementRef;
  @Input() chartData: number;
  @Input() realDevices: number;
  @Input() chartType: string;
  chart: any;

  dataPoints: any[] = [];
  chartContext: any;
  labels: any[] = [];
  public cryptoYAxis = [{
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
  }];
  public ddosYAxis = [{
    scaleLabel: {
      labelString: 'Attack traffic (Mbps)',
      display: true
    },
    display: true
  }];
  public volumeMarks = ['2015 UDP', '2014 NTP', 'Mirai', 'Github', 'Amazon'];
  public amounts = [127000, 400000, 623000, 1350000, 2300000];
  public annotations = this.volumeMarks.map((name, index) => {
    return {
        id: name + 'line', // optional
        type: 'line',
        events: ['click'],
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: this.amounts[index],
        borderColor: 'red',
        borderWidth: 2,
        label: {
          enabled: true,
          position: 'center',
          content: name
        },
        onClick(e) {
          console.log('OnClick works!');
        }
    };
  });

  constructor() {}

  ngAfterViewInit() {
    for (let i = 0; i < 10000; i++) {
      this.dataPoints.push(i * this.chartData);
      this.labels.push(i.toString());
    }
    this.chartContext = this.chartRef.nativeElement.getContext('2d');
    this.initChart();
  }

  ngOnChanges(change: any) {
    if (change.chartData) {
      this.chartData = change.chartData.currentValue;
      if (!change.chartData.firstChange) {
        this.updateChart();
      }
    }
    if (change.realDevices) {
      this.realDevices = change.realDevices.currentValue;
    }
    // console.log(change);
  }

  initChart() {
    const chartConfig = {
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
          yAxes: (this.chartType === 'crypto' ? this.cryptoYAxis : this.ddosYAxis),
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
          ...(this.chartType !== 'crypto') && { annotations: this.annotations }
        },
        responsive: true
      },
      plugins: [ChartAnnotation]
    };
    // chartConfig.options.scales.yAxes = (this.chartType === 'crypto' ? this.cryptoYAxis : this.ddosYAxis);
    this.chart = new Chart(this.chartContext, chartConfig);
  }

  public updateChart() {
    // console.log('in updateChart');
    if (this.chart != null) { this.chart.destroy(); }
    this.dataPoints = [];
    this.labels = [];
    for (let i = 0; i < 10000; i ++) {
      this.dataPoints.push(i * this.chartData);
      this.labels.push(i.toString());
    }
    this.initChart();
  }
}
