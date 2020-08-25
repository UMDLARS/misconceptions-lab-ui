import {Component} from '@angular/core';
import * as sha256 from 'crypto-js/sha256';
import {NbDialogRef} from '@nebular/theme';
import {HttpClient, HttpEventType, HttpHeaderResponse, HttpRequest, HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-device-test',
  templateUrl: './device-test.component.html',
  styleUrls: ['./device-test.component.css']
})
export class DeviceTestComponent {
  public hashTesting = false;
  public bwTesting = false;
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
  halt = false; // used for canceling
  request: Subscription;

  constructor(private http: HttpClient,
              protected ref: NbDialogRef<DeviceTestComponent>) {}

  async test(doTest: boolean) {
    if (doTest) {
      Promise.all([this.hashTest(), this.bandwidthTest()])
        .then((results) => this.ref.close(results))
        .catch(() => { this.ref.close([0, 0]); });
    } else {
      this.ref.close([0, 0]);
    }
  }

  async bandwidthTest() {
    this.bwTesting = true;
    const timeoutPromise = new Promise(resolve => setTimeout(() => {
      if (this.request) {
        this.request.unsubscribe();
      }
      resolve(this.speed);
    }, 10000));
    const bwPromise = new Promise<number>((resolve, reject) => {
      const req = new HttpRequest('GET', this.url, {
        responseType: 'blob',
        reportProgress: true
      });
      this.request = this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.DownloadProgress) {
          this.percentDone = Math.round((100 * event.loaded) / event.total);
          // console.log(`File is ${this.percentDone}% downloaded.`);

          this.currTime = new Date().getTime();
          // percentDone gets rounded up to 1...so this should catch that (with negligible side effects)
          if (this.percentDone <= 1) {
            this.startTime = new Date().getTime();
            this.prevTime = this.startTime;
          }

          this.bytesReceived = event.loaded / 1000000;
          this.speed =
            (this.bytesReceived - this.oldbytes) /
            ((this.currTime - this.prevTime) / 1000);
          this.prevTime = this.currTime;

          this.oldbytes = this.bytesReceived;

          if (this.percentDone === 100) {
            this.endTime = new Date().getTime();
            const duration = (this.endTime - this.startTime) / 1000;
            this.speed = event.total / duration / 1000000;
            this.unit = 'Mbps';
          }
        } else if (event instanceof HttpResponse) {
          if (event.ok) {
            resolve(this.speed);
          }
        } else if (event instanceof HttpHeaderResponse) {
          if (event.status !== 200) {
            reject(new Error(event.statusText));
          }
        }
      });
    });
    return await Promise.race([timeoutPromise, bwPromise]);
  }

  hashTest() {
    this.hashTesting = true;
    return new Promise<number>(resolve => {
      if (typeof Worker !== 'undefined') {
        // Create a new
        const worker = new Worker('./device-test.worker', {type: 'module'});
        worker.onmessage = ({data}) => {
          console.log(`page got message: ${data}`);
          this.hashTesting = false;
          resolve(data);
        };
        worker.postMessage({});
      } else {
        // Web workers are not supported in this environment.
        resolve(this.mainThreadHashTest(10000));
      }
    });
  }

  // this will only be used when worker fails for some reason
  public mainThreadHashTest(timeLimit) {
    let digest = sha256('OluIlR66cSkX2Ee0qjeCia0NzIDFHxIt');
    const start = new Date().getTime();
    let hashes = 0;
    let curTime = new Date().getTime();
    while (curTime < start + timeLimit) {
      digest = sha256(digest);
      hashes++;
      curTime = new Date().getTime();
    }
    console.log('Total hashes performed in ' + timeLimit + ' millisecs: ' + hashes);
    this.hashTesting = false;
    return hashes / timeLimit * 1000; // yields hashes per second
  }
}
