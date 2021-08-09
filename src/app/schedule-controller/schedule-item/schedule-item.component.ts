import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';

export interface interval {
  time: string
  name: string
}

export interface scheduleItem {
  id: number
  name: string
  date: string
  workTimeStart: string
  workTimeEnd: string
  busyInterval: interval[]
  workTimes?: interval[]
}

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss']
})

export class scheduleItemComponent implements OnInit {
  @Input() scheduleItem: scheduleItem | any = {}

  getScheduleItem(tempscheduleItem: any){
    if (!tempscheduleItem.workTimes){
      tempscheduleItem.workTimes = this.getTimes()
    }
    this.scheduleItem = tempscheduleItem
  }

  getTimes = ({workTimeStart, workTimeEnd, busyInterval, workTimes} = this.scheduleItem) => {
    //Получает рабочие и занятые интервалы и создаем из них график

    //Заполняем все интервалы
    let modifiedWorkTimes: interval[] = []
    let start = moment(workTimeStart, 'HH:mm').format('HH:mm')
    let end = moment(workTimeEnd, 'HH:mm').format('HH:mm')
    modifiedWorkTimes.push({time: workTimeStart, name: ''})
    while (start !== end) {
      start = ((start):string=>{
         return moment(start, 'HH,mm').add(10, 'minute').format('HH:mm')
        })(start)
      modifiedWorkTimes.push({time: start, name: ''})
    }
    modifiedWorkTimes.pop()

    //Перезаписываем интервалы с записью
    if(busyInterval){
      busyInterval.forEach(((busy:interval)=>{
        let idx: number = modifiedWorkTimes.findIndex((el)=>{
          return busy.time === el.time
        })
        modifiedWorkTimes[idx].name = busy.name
      }))
    }
    return modifiedWorkTimes
  }

  timeClick(evt: Event){

  }

  constructor() {
  }

  ngOnInit(): void {
    this.getScheduleItem(this.scheduleItem)
  }

}
