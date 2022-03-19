import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  sha256(message: any) {
    function rotr(n: any, b: any) { return (n>>>b)|(n<<(32-b)); }

    let h0 = 0x6A09E667;
    let h1 = 0xBB67AE85;
    let h2 = 0x3C6EF372;
    let h3 = 0xA54FF53A;
    let h4 = 0x510E527F;
    let h5 = 0x9B05688C;
    let h6 = 0x1F83D9AB;
    let h7 = 0x5BE0CD19;
    let k = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2];

    let binstr = "";
    for (let i = 0; i < message.length; i++) {
      let char = message.charCodeAt(i).toString(2);
      while (char.length < 8) { char = "0"+char; }
      binstr += char;
    }
    binstr += "1";
    while (binstr.length%512 != 448) { binstr += "0"; }
    let length = (8*message.length).toString(2);
    while (length.length != 64) { length = "0"+length; }
    binstr += length;

    for (let i = 0; i < binstr.length; i += 512) {
      let block = binstr.substr(i, 512);
      let w = [];
      for (let j = 0; j < 16; j++) { w[j] = parseInt(block.substr(32*j, 32), 2); }

      for (let j = 16; j < 64; j++) {
        let s0: any = rotr(w[j-15], 7)^rotr(w[j-15], 18)^(w[j-15]>>>3);
        let s1: any = rotr(w[j-2], 17)^rotr(w[j-2], 19)^(w[j-2]>>>10);
        w[j] = (w[j-16]+s0+w[j-7]+s1)|0;
      }

      let a = h0;
      let b = h1;
      let c = h2;
      let d = h3;
      let e = h4;
      let f = h5;
      let g = h6;
      let h = h7;

      for (let j = 0; j < 64; j++) {
        let sigma0 = rotr(a, 2)^rotr(a, 13)^rotr(a, 22);
        let ma = (a&b)^(a&c)^(b&c);
        let t2 = sigma0+ma;
        let sigma1 = rotr(e, 6)^rotr(e, 11)^rotr(e, 25);
        let ch = (e&f)^((~e)&g);
        let t1 = h+sigma1+ch+k[j]+w[j];

        h = g;
        g = f;
        f = e;
        e = (d+t1)|0;
        d = c;
        c = b;
        b = a;
        a = (t1+t2)|0;
      }

      h0 = (h0+a)|0;
      h1 = (h1+b)|0;
      h2 = (h2+c)|0;
      h3 = (h3+d)|0;
      h4 = (h4+e)|0;
      h5 = (h5+f)|0;
      h6 = (h6+g)|0;
      h7 = (h7+h)|0;
    }

    let hash = [h0, h1, h2, h3, h4, h5, h6, h7];
    let hex = "";
    for (let i = 0; i < hash.length; i++) {
      for (let j = 0; j < 4; j++) {
        let number = (hash[i]>>(((3-j)*8))&255);
        if (number < 16) {
          hex += "0"+number.toString(16);
        } else {
          hex += number.toString(16);
        }
      }
    }
  	return hex;

  }
}
