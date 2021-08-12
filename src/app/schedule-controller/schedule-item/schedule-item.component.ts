import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {RegDataTransferService} from "../../reg-data-transfer.service";


export interface interval {
  id: number
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
  @Input() scheduleItem: scheduleItem = {
    busyInterval: [],
    date: "",
    id: 0,
    name: "",
    workTimeEnd: "",
    workTimeStart: "",
    workTimes: []
  }

  getTimes = ({workTimeStart, workTimeEnd, busyInterval, workTimes} = this.scheduleItem) => {
    //Получает рабочие и занятые интервалы и создаем из них график

    //Заполняем все интервалы
    let modifiedWorkTimes: interval[] = []
    let start = moment(workTimeStart, 'HH:mm').format('HH:mm')
    let end = moment(workTimeEnd, 'HH:mm').format('HH:mm')
    modifiedWorkTimes.push({id: 0, time: workTimeStart, name: ''})
    let id = 0
    while (start !== end) {
      id++
      start = ((start):string=>{
         return moment(start, 'HH,mm').add(10, 'minute').format('HH:mm')
        })(start)
      modifiedWorkTimes.push({id: id, time: start, name: ''})
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

  constructor(public regData: RegDataTransferService) {
  }

  ngOnInit(): void {
    this.scheduleItem.workTimes = this.getTimes()
    console.log('init')
  }


}
