import { Injectable } from '@angular/core';
import { Osobni } from '../models/osobni';

@Injectable()
export class WhrService {
  /**
    * Računa WHR index.
    *
    * @param {Osobni} osobni
    */

  stupanjWHR: number = 2;
  stupanjWHR2: number = 2;

  getWhr(osobni: Osobni) {
    let whr;

    if (osobni.bokovi == null) {
      return whr = '';
    } else {
      whr = osobni.struk / osobni.bokovi;
      return whr;
    }
  }

  whrPoruka(osobni: Osobni, whr: any) {
    let porukaWHR: string;
    if (osobni.spol === 'm') {
      if (whr < 0.9) {
        porukaWHR = 'Rizik nizak, tip gionidni, rizik za nastanak kardiovaskularnih bolesti nizak.' +
          ' U slučaju nakupljanja masnog tkiva, ono se nakuplja na području bokova i bedara.';
        this.stupanjWHR = 1;
      } else if (0.91 < whr && whr < 0.99) {
        porukaWHR = 'Rizik prosječan, tip gionidni, rizik za nastanak kardiovaskularnih bolesti normalan.' +
          ' U slučaju nakupljanja masnog tkiva, ono se nakuplja na području bokova i bedara.';
        this.stupanjWHR = 2;
      } else {
        porukaWHR = 'Rizik povišen, tip visceralni, rizik za nastanak kardiovaskularnih bolesti visok.' +
          ' U slučaju nakupljanja masnog tkiva, ono se nakuplja u području trbuha.';
        this.stupanjWHR = 3;
      }
    } else {
      if (whr < 0.8) {
        porukaWHR = 'Rizik nizak, tip gionidni, rizik za nastanak kardiovaskularnih bolesti nizak.' +
          ' U slučaju nakupljanja masnog tkiva, ono se nakuplja na području bokova i bedara.';
        this.stupanjWHR = 1;
      } else if (0.81 < whr && whr < 0.84) {
        porukaWHR = 'Rizik prosječan, tip gionidni, rizik za nastanak kardiovaskularnih bolesti normalan.' +
          ' U slučaju nakupljanja masnog tkiva, ono se nakuplja na području bokova i bedara.';
        this.stupanjWHR = 2;
      } else {
        porukaWHR = 'Rizik povišen, tip visceralni, rizik za nastanak kardiovaskularnih bolesti visok.' +
          ' U slučaju nakupljanja masnog tkiva, ono se nakuplja u području trbuha.';
        this.stupanjWHR = 3;
      }
    }
    return porukaWHR;
  }

  getWhr2(osobni: Osobni) {
    const whr2 = osobni.struk / osobni.visina;
    if (osobni.spol === 'm') {
      if (whr2 <= 0.34) {
        this.stupanjWHR2 = 0;
      } else if (0.35 <= whr2 && whr2 < 0.41) {
        this.stupanjWHR2 = 0;
      } else if (0.42 <= whr2 && whr2 < 0.48) {
        this.stupanjWHR2 = 1;
      } else if (0.49 <= whr2 && whr2 < 0.53) {
        this.stupanjWHR2 = 2;
      } else if (0.54 <= whr2 && whr2 < 0.57) {
        this.stupanjWHR2 = 3;
      } else {
        this.stupanjWHR2 = 4;
      }
    } else if (osobni.spol === 'f') {
      if (whr2 <= 0.34) {
        this.stupanjWHR2 = 0;
      } else if (0.35 <= whr2 && whr2 < 0.42) {
        this.stupanjWHR2 = 0;
      } else if (0.43 <= whr2 && whr2 < 0.52) {
        this.stupanjWHR2 = 1;
      } else if (0.53 <= whr2 && whr2 < 0.57) {
        this.stupanjWHR2 = 2;
      } else if (0.58 <= whr2 && whr2 < 0.62) {
        this.stupanjWHR2 = 3;
      } else {
        this.stupanjWHR2 = 4;
      }
    }
    return whr2;
  }

  getRizikWHR(osobni: Osobni) {
    let stupanjRizikaWHR = 0;

    if (osobni.struk == null || osobni.bokovi == null) {
      stupanjRizikaWHR = 0;
    } else {
      stupanjRizikaWHR = this.stupanjWHR + this.stupanjWHR2;
    }

    console.log(stupanjRizikaWHR);

    return stupanjRizikaWHR;
  }
}
