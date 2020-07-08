import {AfterViewInit, Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements AfterViewInit, OnChanges {
  @Input() chartData: number;
  options: any;
  // updateOptions: any;
  // private oneDay = 24 * 3600 * 1000;
  // private now: Date;
  // private value: number;
  private data: any[];
  private xAxisData: any[];
  // private specs: number;

  constructor() { }

  ngAfterViewInit() {
    // generate some random testing data:
    this.data = [];
    this.xAxisData = [];
    // this.now = new Date(1997, 9, 3);
    // this.specs = 7;
    // this.value = Math.random() * 1000;

    for (let i = 0; i < 10000; i++) {
      // this.data.push({
      //   x: `${i} devices`,
      //   value: i * this.chartData
      // });
      this.data.push(i * this.chartData);
      this.xAxisData.push(`${i} devices`);
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
        type: 'category',
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

  updateOptions() {
    for (let i = 0; i < 10000; i++) {
      this.data.push({
        x: `${i} devices`,
        value: i * this.chartData
      });
      this.xAxisData.push(i);
    }
    this.options.xAxis.data = this.xAxisData;
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
