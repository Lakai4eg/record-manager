import {Component, Input, OnInit} from '@angular/core';

export interface sheduleItem {
  id: number
  name: string
  date: string
  workTimeStart: Date
  workTimeEnd: Date
  workTimes?: any
}

@Component({
  selector: 'app-shedule-item',
  templateUrl: './shedule-item.component.html',
  styleUrls: ['./shedule-item.component.scss']
})

export class SheduleItemComponent implements OnInit {
  @Input() sheduleItem: sheduleItem | any = {}

  getSheduleItem(tempSheduleItem: any){
    if (!tempSheduleItem.workTimes){
      tempSheduleItem.workTimes = this.getTimes(tempSheduleItem.workTimeStart, tempSheduleItem.workTimeEnd)
    }
    this.sheduleItem = tempSheduleItem
  }

  getTimes = function (startTime: Date, endTime: Date) :Date[]{
    let workTimes: Date[] = []
    let tmp :Date = ((startTime:Date)=>new Date(startTime))(startTime)
    workTimes.push(tmp)
    while (startTime < endTime) {
      let currTime = ((startTime):Date=>{
        startTime = new Date(startTime.setMinutes(startTime.getMinutes() + 10))
        return startTime
        })(startTime)
      workTimes.push(currTime)
    }
    workTimes.pop()
    return workTimes
  }


  constructor() {

  }

  ngOnInit(): void {
    this.getSheduleItem(this.sheduleItem)
  }

}
