/// <reference lib="webworker" />
import * as sha256 from 'crypto-js/sha256';

addEventListener('message', ({ data }) => {
    const timeLimit = 10000;
    let digest = sha256('OluIlR66cSkX2Ee0qjeCia0NzIDFHxIu');
    const start = new Date().getTime();
    let hashes = 0;
    let curTime = new Date().getTime();
    while (curTime < start + timeLimit) {
      digest = sha256(digest);
      hashes++;
      curTime = new Date().getTime();
    }
    console.log('Total hashes performed in ' + timeLimit + ' millisecs: ' + hashes);
    const response = hashes / timeLimit * 1000; // yields hashes per second
    postMessage(response);
});
