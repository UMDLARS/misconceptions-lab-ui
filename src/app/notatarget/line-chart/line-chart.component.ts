import {Component, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnChanges {
  options: any;
  updateOptions: any;
  // private oneDay = 24 * 3600 * 1000;
  // private now: Date;
  private value: number;
  private data: any[];
  private xAxisData: number[];
  private specs: number;

  constructor() { }

  ngOnInit() {
    // generate some random testing data:
    this.data = [];
    this.xAxisData = [];
    // this.now = new Date(1997, 9, 3);
    this.specs = 7;
    this.value = Math.random() * 1000;

    for (let i = 0; i < 10000; i++) {
      this.data.push({
        x: `${i} devices`,
        value: i * this.specs
      });
      this.xAxisData.push(i);
    }
    console.log(this.data[9]);

    // initialize chart options:
    this.options = {
      title: {
        text: 'Fake Data'
      },
      tooltip: {
        trigger: 'axis',
        // formatter: (params) => {
        //   params = params[0];
        //   // const date = new Date(params.name);
        //   return params.x + ' : ' + params.value;
        // },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'value',
        data: this.xAxisData,
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '10%'],
        splitLine: {
          show: false
        }
      },
      series: [{
        name: 'Mocking Data',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: this.data
      }]
    };
  }

  ngOnChanges() {
  }

  // randomData() {
  //   this.now = new Date(this.now.getTime() + this.oneDay);
  //   this.value = this.value + Math.random() * 21 - 10;
  //   return {
  //     name: this.now.toString(),
  //     value: [
  //       [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
  //       Math.round(this.value)
  //     ]
  //   };
  // }

}
