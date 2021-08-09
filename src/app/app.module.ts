import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpecialistListComponent } from './specialist-list/specialist-list.component';
import { scheduleControllerComponent } from './schedule-controller/schedule-controller.component';
import { scheduleItemComponent } from './schedule-controller/schedule-item/schedule-item.component';
import { CalendarComponent } from './calendar/calendar.component';
import {FormsModule} from "@angular/forms";

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    SpecialistListComponent,
    scheduleControllerComponent,
    scheduleItemComponent,
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
