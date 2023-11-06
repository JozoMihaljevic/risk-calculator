import { Spol } from './spol';

export class Osobni {
  public dob?: any;
  public visina?: any;
  public masa?: any;
  public struk?: any;
  public bokovi?: any;
  public spol?: Spol;

  constructor() {
    this.spol = Spol.Muškarac;
    this.dob = 18;
    this.bokovi = 0;
    this.masa = 20;
    this.struk = 20;
    this.visina = 20;
  }
}
