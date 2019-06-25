import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-encrapter',
  templateUrl: './encrapter.component.html',
  styleUrls: ['./encrapter.component.css']
})
export class EncrapterComponent implements OnInit {
  plaintext: string;
  ciphertext = '';
  plaintable = {}
  ciphertable = {}
  esel: string;
  selectedCipher = 'rot13';

  constructor() {
  }

  ngOnInit() {
  }
  rot13(instring){
    const input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
    const index = x => input.indexOf(x);
    const translate = x => index(x) > -1 ? output[index(x)] : x;
    return instring.split('').map(translate).join('');
  }

  rever(instring){
    for(var i = 0; i < instring.length; i++){
      var c = instring.charCodeAt(i);
      c = String.fromCharCode(c ^ 64);
      instring = instring.substr(0,i) + c + instring.substr(i+1);
    }
    return instring.split("").reverse().join("");
  }

  onetp(instring){
    return "onetp";
  }

  changeEncryptionType(inarg){
    this.selectedCipher = inarg;
    this.updateCiphertext();
  }


  updateCiphertext() {
    var instring = this.plaintext;
    var out = ""
    console.log(this.selectedCipher);
    switch (this.selectedCipher){
      case "rot13":
	console.log("rot13");
	out = this.rot13(instring);
	break;
      case "rever":
	console.log("2")
	out = this.rever(instring);
	break;
      case "onetp":
	console.log("3");
	out = this.onetp(instring);
	break;
    }
    this.ciphertext = out;
    this.plaintable = this.dictgen(instring);
    console.log(this.plaintable['a']);
  }

  dictgen(instring){
    var dict = {};
      for(var i = 0; i < instring.length; i++){
        if(!dict[instring.charAt(i)]){
          dict[instring.charAt(i)] = 0;
        }
      dict[instring.charAt(i)] += 1;
      }
    return(dict)
    }
  }
