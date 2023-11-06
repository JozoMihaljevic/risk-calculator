import { Injectable } from '@angular/core';
import { Osobni } from '../models/osobni';

@Injectable()
export class BmiService {
  /**
   * Računa BMI index.
   *
   * @param {Osobni} osobni
   */

  stupanjBMI: any;
  stupanjBFP: any;

  getBmi(osobni: Osobni) {
    const bmi = osobni.masa / ((osobni.visina / 100) * (osobni.visina / 100));
    return bmi;
  }

  getBodyFatPostotak(osobni: Osobni, bmi: any) {
    let bodyFatPostotak;

    if (osobni.spol === 'm') {
      bodyFatPostotak = ((1.2 * bmi) + (0.23 * osobni.dob) - 5.4 - 10.8).toFixed(0);
    } else {
      bodyFatPostotak = ((1.2 * bmi) + (0.23 * osobni.dob) - 5.4).toFixed(0);
    }
    return bodyFatPostotak.toString();
  }

  getPreporucenaTjelesnaMasa(osobni: Osobni) {
    let preporucenaTjelesnaMasa;
    preporucenaTjelesnaMasa = (((osobni.visina * osobni.visina) / 10000) * 21.75).toFixed(0);
    return preporucenaTjelesnaMasa;
  }

  bmiPoruka(bmi: any) {
    let porukaBmi: string;
    if (bmi <= 18.4) {
      porukaBmi = 'Tjelesna masa ispod preporučene, rizik u odnosu na BMI: Nizak';
      this.stupanjBMI = 0;
    } else if (18.4 < bmi && bmi <= 24.9) {
      porukaBmi = 'Idealna tjelesna masa, rizik u odnosu na BMI: Normalan';
      this.stupanjBMI = 0;
    } else if (24.9 < bmi && bmi <= 29.9) {
      porukaBmi = 'Povišena tjelesna masa, rizik u odnosu na BMI: Povišen';
      this.stupanjBMI = 1;
    } else if (29.9 < bmi && bmi <= 34.9) {
      porukaBmi = 'Prekomjerna tjelesna masa (gojaznost, pretilost) 1. stupnja!!! Rizik u odnosu na BMI: Visok';
      this.stupanjBMI = 2;
    } else if (34.9 < bmi && bmi <= 45) {
      porukaBmi = 'Prekomjerna tjelesna masa (gojaznost, pretilost) 2. stupnja!!! Rizik u odnosu na BMI: Visok';
      this.stupanjBMI = 3;
    } else {
      porukaBmi = 'Prekomjerna tjelesna masa (gojaznost, pretilost) 3. stupnja!!! Rizik u odnosu na BMI: Visok';
      this.stupanjBMI = 4;
    }
    return porukaBmi;
  }

  bodyFatPostotakPoruka(bodyFatPostotak: any, osobni: Osobni) {
    let porukaBodyFatPostotak: string;
    // za muškarce:
    if (osobni.spol === 'm') {
      if (bodyFatPostotak <= 6) {
        porukaBodyFatPostotak = 'Rizik za nastanak kardiovaskularnih bolesti u odnosu na postotak tjelesnih masti: Nizak';
        this.stupanjBFP = 0;
      } else if (7 <= bodyFatPostotak && bodyFatPostotak <= 13) {
        porukaBodyFatPostotak = 'Rizik za nastanak kardiovaskularnih bolesti u odnosu na postotak tjelesnih masti: Nizak';
        this.stupanjBFP = 0;
      } else if (14 <= bodyFatPostotak && bodyFatPostotak <= 17) {
        porukaBodyFatPostotak = 'Rizik za nastanak kardiovaskularnih bolesti u odnosu na postotak tjelesnih masti: Normalan';
        this.stupanjBFP = 1;
      } else if (18 <= bodyFatPostotak && bodyFatPostotak <= 22) {
        porukaBodyFatPostotak = 'Rizik za nastanak kardiovaskularnih bolesti u odnosu na postotak tjelesnih masti: Povišen';
        this.stupanjBFP = 2;
      } else if (23 <= bodyFatPostotak && bodyFatPostotak <= 29) {
        porukaBodyFatPostotak = 'Rizik za nastanak kardiovaskularnih bolesti u odnosu na postotak tjelesnih masti: Povišen';
        this.stupanjBFP = 3;
      } else {
        porukaBodyFatPostotak = 'Rizik za nastanak kardiovaskularnih bolesti u odnosu na postotak tjelesnih masti: Visok';
        this.stupanjBFP = 4;
      }
    } else {
      if (bodyFatPostotak <= 13) {
        porukaBodyFatPostotak = 'Rizik u odnosu na postotak tjelesnih masti: Nizak</span>';
        this.stupanjBFP = 0;
      } else if (14 <= bodyFatPostotak && bodyFatPostotak <= 20) {
        porukaBodyFatPostotak = 'Rizik u odnosu na postotak tjelesnih masti: Nizak';
        this.stupanjBFP = 0;
      } else if (21 <= bodyFatPostotak && bodyFatPostotak <= 25) {
        porukaBodyFatPostotak = 'Rizik u odnosu na postotak tjelesnih masti: Normalan';
        this.stupanjBFP = 1;
      } else if (26 <= bodyFatPostotak && bodyFatPostotak <= 31) {
        porukaBodyFatPostotak = 'Rizik u odnosu na postotak tjelesnih masti: Povišen';
        this.stupanjBFP = 2;
      } else if (32 <= bodyFatPostotak && bodyFatPostotak <= 39) {
        porukaBodyFatPostotak = 'Rizik u odnosu na postotak tjelesnih masti: Povišen';
        this.stupanjBFP = 3;
      } else {
        porukaBodyFatPostotak = 'Rizik u odnosu na postotak tjelesnih masti: Visok';
        this.stupanjBFP = 4;
      }
    }
    return porukaBodyFatPostotak;
  }

  getRizikBMIBFP() {
    let stupanjRizikaBMIBFP;

    stupanjRizikaBMIBFP = this.stupanjBMI + this.stupanjBFP;

    console.log(stupanjRizikaBMIBFP);

    return stupanjRizikaBMIBFP;
  }
}
