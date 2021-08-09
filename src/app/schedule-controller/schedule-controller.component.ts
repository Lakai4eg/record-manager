import {Component, Input, OnInit} from '@angular/core';
import {scheduleItem} from "./schedule-item/schedule-item.component";

@Component({
  selector: 'app-schedule-controller',
  templateUrl: './schedule-controller.component.html',
  styleUrls: ['./schedule-controller.component.scss']
})
export class scheduleControllerComponent implements OnInit {
  @Input() allscheduleItems: scheduleItem[] = []

  constructor() {}


  ngOnInit(): void {
  }

}


