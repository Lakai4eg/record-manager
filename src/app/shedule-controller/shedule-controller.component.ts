import {Component, Input, OnInit} from '@angular/core';
import {sheduleItem} from "./shedule-item/shedule-item.component";

@Component({
  selector: 'app-shedule-controller',
  templateUrl: './shedule-controller.component.html',
  styleUrls: ['./shedule-controller.component.scss']
})
export class SheduleControllerComponent implements OnInit {
  @Input() allSheduleItems: sheduleItem[] = []

  constructor() {}


  ngOnInit(): void {
  }

}


