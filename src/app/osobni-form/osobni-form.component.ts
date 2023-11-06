import { Component, OnInit } from '@angular/core';
import { Osobni } from '../models/osobni';
import { KrvnaSlika } from '../models/krvnaslika';
import { BmiService } from '../services/bmi.service';
import { WhrService } from '../services/whr.service';
import { HomaService } from '../services/homa.service';
import { KrvnaSlikaService } from '../services/krvna-slika.service';
import { KalkulatorRizikaService } from '../services/kalkulatorRizika.service';

import { Spol } from '../models/spol';

@Component({
  selector: 'app-osobni-form',
  templateUrl: './osobni-form.component.html',
  styleUrls: ['./osobni-form.component.css']
})
export class OsobniFormComponent implements OnInit {

  spolovi: any[] = [
    { key: 'm', name: 'Muškarac' },
    { key: 'f', name: 'Žena' },
  ];

  osobniPodaci: Osobni = new Osobni();
  krvnaSlika: KrvnaSlika = new KrvnaSlika();

  bmi?: number;
  bodyFatPostotak?: any;
  preporucenaTjelesnaMasa?: any;
  bodyFatPostotakPoruka?: any;
  bmiPoruka?: any;
  whr?: number | "";
  whrPoruka?: any;
  whr2?: number;
  homaIr?: number;
  homaIrPoruka?: any;
  homaBeta?: number;
  homaBetaPoruka?: any;
  glukozaPoruka?: any;
  ukupniKolesterolPoruka?: any;
  ldlKolesterolPoruka?: any;
  hdlKolesterolPoruka?: any;
  trigliceridiPoruka?: any;
  rizikKks?: number;
  rizikHoma?: number;
  rizikWHR?: number;
  rizikBMI?: number;
  rizikUkupni?: number;
  rizikUkupniPostotak?: number;
  rizikUkupniPoruka?: any;




  submitted = false;

  constructor(
    private bmiService: BmiService,
    private whrService: WhrService,
    private homaService: HomaService,
    private krvnaSlikaService: KrvnaSlikaService,
    private kalkulatorRizikaService: KalkulatorRizikaService) {
  }

  ngOnInit() {
  }

  ponistiUnos() {
    this.osobniPodaci = new Osobni();
    this.krvnaSlika = new KrvnaSlika();
  }

  racunajPrikazi() {
    this.racunajBmi();
    this.racunajBodyFatPostotak();
    this.racunajPreporucenaTjelesnaMasa();
    this.prikaziBmiPoruku();
    this.prikaziBodyFatPostotakPoruku();
    this.racunajWHRstrukbokovi();
    this.prikaziWHRPoruku();
    this.racunajWHRstrukvisina();
    this.racunajHomaIr();
    this.prikaziHomaIrPoruku();
    this.racunajHomaBeta();
    this.prikaziHomaBetaPoruku();
    this.prikaziGlukozaPoruku();
    this.prikaziUkupniKolesterolPoruka();
    this.prikaziLdlKolesterolPoruka();
    this.prikaziHdlKolesterolPoruka();
    this.prikaziTrigliceridiPoruka();
    this.prikaziRizik();
    this.prikaziUkupniRizik();
    this.prikaziUkupniRizikPostotak();
    this.prikaziUkupniRizikPoruku();
  }

  racunajBmi() {
    this.bmi = this.bmiService.getBmi(this.osobniPodaci);
    console.log(this.osobniPodaci);
  }

  racunajBodyFatPostotak() {
    this.bodyFatPostotak = this.bmiService.getBodyFatPostotak(this.osobniPodaci, this.bmi);
  }

  racunajPreporucenaTjelesnaMasa() {
    this.preporucenaTjelesnaMasa = this.bmiService.getPreporucenaTjelesnaMasa(this.osobniPodaci);
  }

  prikaziBmiPoruku() {
    this.bmiPoruka = this.bmiService.bmiPoruka(this.bmi);
  }

  prikaziBodyFatPostotakPoruku() {
    this.bodyFatPostotakPoruka = this.bmiService.bodyFatPostotakPoruka(this.bodyFatPostotak, this.osobniPodaci);
  }

  racunajWHRstrukbokovi() {
    this.whr = this.whrService.getWhr(this.osobniPodaci);
  }

  prikaziWHRPoruku() {
    this.whrPoruka = this.whrService.whrPoruka(this.osobniPodaci, this.whr);
  }

  racunajWHRstrukvisina() {
    this.whr2 = this.whrService.getWhr2(this.osobniPodaci);
  }

  racunajHomaIr() {
    this.homaIr = this.homaService.getHomaIr(this.krvnaSlika);
    console.log(this.krvnaSlika);
  }

  prikaziHomaIrPoruku() {
    this.homaIrPoruka = this.homaService.homaIrPoruka(this.homaIr);
  }

  racunajHomaBeta() {
    this.homaBeta = this.homaService.getHomaBeta(this.krvnaSlika);
  }

  prikaziHomaBetaPoruku() {
    this.homaBetaPoruka = this.homaService.homaBetaPoruka(this.homaBeta);
  }

  prikaziGlukozaPoruku() {
    this.glukozaPoruka = this.krvnaSlikaService.glukozaPoruka(this.krvnaSlika);
  }

  prikaziUkupniKolesterolPoruka() {
    this.ukupniKolesterolPoruka = this.krvnaSlikaService.ukupniKolPoruka(this.krvnaSlika);
  }

  prikaziLdlKolesterolPoruka() {
    this.ldlKolesterolPoruka = this.krvnaSlikaService.ldlKolPoruka(this.krvnaSlika);
  }

  prikaziHdlKolesterolPoruka() {
    this.hdlKolesterolPoruka = this.krvnaSlikaService.hdlKolPoruka(this.krvnaSlika, this.osobniPodaci);
  }

  prikaziTrigliceridiPoruka() {
    this.trigliceridiPoruka = this.krvnaSlikaService.trigliceridiPoruka(this.krvnaSlika);
  }

  prikaziRizik() {
    this.rizikKks = this.krvnaSlikaService.getRizikKKS();
    this.rizikHoma = this.homaService.getRizikHoma(this.krvnaSlika);
    this.rizikWHR = this.whrService.getRizikWHR(this.osobniPodaci);
    this.rizikBMI = this.bmiService.getRizikBMIBFP();
  }

  prikaziUkupniRizik() {
    this.rizikUkupni = this.kalkulatorRizikaService.racunajUkupniRizik(this.rizikKks, this.rizikHoma, this.rizikWHR, this.rizikBMI);
  }

  prikaziUkupniRizikPoruku() {
    this.rizikUkupniPoruka = this.kalkulatorRizikaService.ukupniRizikPoruka(this.rizikUkupni);
  }

  prikaziUkupniRizikPostotak() {
    this.rizikUkupniPostotak = this.kalkulatorRizikaService.racunajUkupniRizikPostotak(this.krvnaSlika);
  }

  onSubmit() {
    this.submitted = true;
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.osobniPodaci);
  }
}
