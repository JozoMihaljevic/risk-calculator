import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { OsobniFormComponent } from './osobni-form/osobni-form.component';

import { BmiService } from './services/bmi.service';
import { WhrService } from './services/whr.service';
import { HomaService } from './services/homa.service';
import { KrvnaSlikaService } from './services/krvna-slika.service';
import { KalkulatorRizikaService } from './services/kalkulatorRizika.service';
import { SamobrojeviDirective } from './samobrojevi.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    OsobniFormComponent,
    SamobrojeviDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    BmiService,
    WhrService,
    HomaService,
    KrvnaSlikaService,
    KalkulatorRizikaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
