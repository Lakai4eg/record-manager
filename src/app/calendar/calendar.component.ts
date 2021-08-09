import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as moment from "moment";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Output() onDateChange = new EventEmitter<string>()

  inputDate:string = moment().format('yyyy-MM-DD')

  inputDateChange(){
    this.onDateChange.emit(this.inputDate.toString())
  }

  constructor() { }

  ngOnInit(): void {
    this.inputDateChange()
  }

}
