import { Injectable } from '@angular/core';
import * as moment from "moment";
import {interval} from "./schedule-controller/schedule-item/schedule-item.component";

export class specInfo{
  'specId': number
  'specName': string
  'date': string
  'time': string
  'patientName': string
}

@Injectable({
  providedIn: 'root'
})
export class RegDataTransferService {
  record: specInfo = {specId: 0, date: "", specName: "", patientName: "", time: ""}
  regFormHidden: boolean = true

  openForm(id: number, name: string, date: string, time: string){
    this.record.specId = id
    this.record.date = date
    this.record.specName = name
    this.record.time = time
    this.regFormHidden = false
  }

  closeForm(){
    this.regFormHidden = true
  }

  getTimes = (item:any) => {
    //Получает рабочие и занятые интервалы и создаем из них график

    //Заполняем все интервалы
    let modifiedWorkTimes: interval[] = []
    let start = moment(item.workTimeStart, 'HH:mm').format('HH:mm')
    let end = moment(item.workTimeEnd, 'HH:mm').format('HH:mm')
    modifiedWorkTimes.push({id: 0, time: item.workTimeStart, name: ''})
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
    if(item.busyInterval){
      item.busyInterval.forEach(((busy:interval)=>{
        let idx: number = modifiedWorkTimes.findIndex((el)=>{
          return busy.time === el.time
        })
        modifiedWorkTimes[idx].name = busy.name
      }))
    }
    return modifiedWorkTimes
  }
}
