import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Output() onDateChange = new EventEmitter<string>()

  inputDate:number = Date.now()

  inputDateChange(){
    this.onDateChange.emit(this.inputDate.toString())
  }

  constructor() { }

  ngOnInit(): void {
  }

}
