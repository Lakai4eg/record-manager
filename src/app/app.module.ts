import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpecialistListComponent } from './specialist-list/specialist-list.component';
import { SheduleControllerComponent } from './shedule-controller/shedule-controller.component';
import { SheduleItemComponent } from './shedule-controller/shedule-item/shedule-item.component';
import { CalendarComponent } from './calendar/calendar.component';
import {FormsModule} from "@angular/forms";

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    SpecialistListComponent,
    SheduleControllerComponent,
    SheduleItemComponent,
    CalendarComponent,
  ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
    ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
