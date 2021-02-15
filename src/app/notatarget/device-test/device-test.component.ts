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
  private url = 'assets/100mb.bin';
  public percentDone: number;
  public progress = 0;
  startTime: any;
  endTime: any;
  currTime: any;
  prevTime: any;
  speed = 0;
  bytesReceived = 0;
  oldbytes = 0;
  cancelMsg = 'Maybe later'; // turns into 'Cancel' if tests initiated
  request: Subscription;
  worker: Worker;

  constructor(private http: HttpClient,
              protected ref: NbDialogRef<DeviceTestComponent>) {}

  async test() {
    this.cancelMsg = 'Cancel';
    Promise.all([this.hashTest(), this.bandwidthTest()])
      .then((results) => this.ref.close(results))
      .catch(() => { this.ref.close([0, 0]); });
  }

  cancel() {
    if (this.request) {
      this.request.unsubscribe();
    }
    if (this.worker) {
      this.worker.terminate();
    }
    this.hashTesting = false; // ends mainThreadHashTest
    this.ref.close([0, 0]);
  }

  async bandwidthTest() {
    this.bwTesting = true;

    const timeoutPromise = new Promise(resolve => setTimeout(() => {
      if (this.request) {
        this.request.unsubscribe();
      }
      console.log('bandwidthTest has timed out!');
      this.bwTesting = false;
      resolve(this.speed);
    }, 12000));

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
          }
        } else if (event instanceof HttpResponse) {
          if (event.ok) {
            this.bwTesting = false;
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

  /**
   * hashTest also controls the progress bar's value.
   * Since hash testing is timed out at 10 sec, this function updates the progress bar's value with the percent of
   * bandwidth file downloaded plus number of seconds since hash testing began.
   */
  hashTest() {
    this.hashTesting = true;
    let counter = 5;
    setInterval(() => {
      counter += 5;
      this.progress = this.percentDone / 2 + counter; }, 1000);
    return new Promise<number>(resolve => {
      if (typeof Worker !== 'undefined') {
        // Create a new
        this.worker = new Worker('./device-test.worker', {type: 'module'});
        this.worker.onmessage = ({data}) => {
          console.log(`page got message: ${data}`);
          this.hashTesting = false;
          resolve(data);
        };
        this.worker.postMessage({});
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
    while (curTime < start + timeLimit && this.hashTesting) {
      digest = sha256(digest);
      digest = sha256(digest);
      hashes += 2;
      curTime = new Date().getTime();
    }
    console.log('Total hashes performed in ' + (curTime - start) + ' millisecs: ' + hashes);
    this.hashTesting = false;
    return hashes / (curTime - start) * 1000; // yields hashes per second
  }
}
