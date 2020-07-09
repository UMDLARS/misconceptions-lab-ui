import {Component} from '@angular/core';
import * as sha256 from 'crypto-js/sha256';
import {NbDialogRef} from '@nebular/theme';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-device-test',
  templateUrl: './device-test.component.html',
  styleUrls: ['./device-test.component.css']
})
export class DeviceTestComponent {
  public prompt = 'Running these tests will take about a minute, but it will be burdensome on your CPU '
    + 'and will require a large chunk of data transfer. If your device\'s battery is low or you don\'t want to '
    + 'waste data consumption, you can try this at a later time.';
  public hashTesting = false;
  public bwTesting = false;
  private hashrate = 0;
  private bandwidth = 0;
  private url = 'assets/10mb.bin';
  public percentDone: number;
  startTime: any;
  endTime: any;
  currTime: any;
  prevTime: any;
  speed = 0;
  bytesReceived = 0;
  oldbytes = 0;
  unit = 'Mbps';

  constructor(
    private http: HttpClient,
    protected ref: NbDialogRef<DeviceTestComponent>
  ) {}

  test(doTest: boolean) {
    if (doTest) {
      this.hashTesting = true;
      if (typeof Worker !== 'undefined') {
        // Create a new
        const worker = new Worker('./device-test.worker', { type: 'module' });
        worker.onmessage = ({ data }) => {
          // console.log(`page got message: ${data}`);
          this.hashrate = data;
        };
        worker.postMessage({});
      } else {
        // Web workers are not supported in this environment.
        // You should add a fallback so that your program still executes correctly.
        this.hashrate = this.hashTest(10000);
      }
      document.getElementById('hashspan').style.opacity = '0.5';
      this.hashTesting = false;
      this.bandwidth = this.bandwidthTest();
      this.bwTesting = true;
    }
    this.ref.close([this.hashrate, this.bandwidth]);
  }

  bandwidthTest() {
    const req = new HttpRequest('GET', this.url, {
      responseType: 'blob',
      reportProgress: true
    });
    this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.DownloadProgress) {
        this.percentDone = Math.round((100 * event.loaded) / event.total);
        // console.log(`File is ${this.percentDone}% downloaded.`);

        this.currTime = new Date().getTime();
        if (this.percentDone === 0) {
          this.startTime = new Date().getTime();
          this.prevTime = this.startTime;
        }

        this.bytesReceived = event.loaded / 1000000;
        // console.log('bytesReceived', this.bytesReceived);
        this.speed =
          (this.bytesReceived - this.oldbytes) /
          ((this.currTime - this.prevTime) / 1000);
        if (this.speed < 1) {
          this.unit = 'Kbps';
          this.speed *= 1000;
        } else { this.unit = 'Mbps'; }
        // console.log('speed', this.speed + this.unit);
        // console.log(this.prevTime);
        // console.log(this.currTime);
        // console.log('time', this.currTime - this.prevTime);
        this.prevTime = this.currTime;

        this.oldbytes = this.bytesReceived;
        // console.log('oldbytes', this.oldbytes);
        // console.log('\n');

        if (this.percentDone === 100) {
          this.endTime = new Date().getTime();
          const duration = (this.endTime - this.startTime) / 1000;
          const mbps = event.total / duration / 1000000;
          if (mbps < 1) {
            this.speed = event.total / duration / 1000;
            this.unit = 'Kbps';
          } else {
            this.speed = mbps;
            this.unit = 'Mbps';
          }
        }
      } else if (event instanceof HttpResponse) {
        // const res: any = event.body;
        // // console.log('start download:', res);
        // const url = window.URL.createObjectURL(res);
        // const a = document.createElement('a');
        // document.body.appendChild(a);
        // a.setAttribute('style', 'display: none');
        // a.href = url;
        // a.download = 'SpeedTest_32MB.dat';
        // a.click();
        // window.URL.revokeObjectURL(url);
        // a.remove();
        console.log('File is completely downloaded!');
      }
    });
    return this.speed;
  }

  public hashTest(timeLimit) {
    let digest = sha256('pohejcwyL1yLuY6wunOkbEaEjhLZM5fw');
    const start = new Date().getTime();
    let hashes = 0;
    let curTime = new Date().getTime();
    while (curTime < start + timeLimit) {
      digest = sha256(digest);
      hashes++;
      curTime = new Date().getTime();
    }
    console.log('Total hashes performed in ' + timeLimit + ' millisecs: ' + hashes);
    return hashes / timeLimit * 1000; // yields hashes per second
  }
}