import {Component, Input, OnInit} from '@angular/core';
import {specialist} from "./specialist-list/specialist-list.component";
import * as moment from 'moment';
import {RegDataTransferService} from "./reg-data-transfer.service";
import db from "../assets/db";

export class specScheduleItem {
  'id': number
  'name': string
  'date': string
  'workTimeStart': string
  'workTimeEnd': string
  'busyInterval': {
    'time': string
    'name': string
  }[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit{
  constructor(public regData: RegDataTransferService) {
  }
  @Input() onRecordAdd: any

  //allSpecialistsSchedule - условный бэкэнд, база данных с расписанием врачей
  allSpecialistsSchedule: specScheduleItem[] = db
  dateSelected = moment().format('yyyy-MM-DD')
  workingSpecs: specialist[] = []
  allScheduleItems: any[] = []


  updateShowedSpec(currentSpec: specialist){
    let specScheduleCurrentDay = this.findScheduleOfSpecialist(this.dateSelected, currentSpec.id)
    if(currentSpec.checked){
      this.allScheduleItems.push(specScheduleCurrentDay)
    }
    else{
      this.allScheduleItems.splice(this.allScheduleItems.findIndex(el =>{
        return el.id === currentSpec.id;
      }), 1)
    }
  }

  updateDateSelected(date: string) {
    this.dateSelected = date
    this.allScheduleItems = []
    this.workingSpecs = this.getSpecWorkingCurrentDay(date)
  }

  findScheduleOfSpecialist(date: string, specId: number){
    //Ищем график специалиста на указанный день
    return this.allSpecialistsSchedule.find(elem => {
      return ((elem.id === specId) && (elem.date === date))
    })
  }

  getSpecWorkingCurrentDay(day: string){
    //Получаем список докторов, работающих в указанный день вида
    let allWorking =  this.allSpecialistsSchedule.filter((elem:specScheduleItem) => {
      return elem.date === day
    })
    return allWorking.map((elem:specScheduleItem)=>{
      return {id: elem.id, name: elem.name}
    })
  }

  addRecord({specId, specName, date,time,patientName} = this.regData.record):void{
    let idxOfRecordedElem = this.allSpecialistsSchedule.findIndex((el:specScheduleItem)=>{
      return (el.name === specName) && (el.date === date)
    })
    if(idxOfRecordedElem>=0){
        this.allSpecialistsSchedule[idxOfRecordedElem].busyInterval.push({
          time: time,
          name: patientName
        })
    }
    setTimeout(()=>{
      this.updateShowedSpec({id: specId, name: specName, checked: false})
    })
    this.updateShowedSpec({id: specId, name: specName, checked: true})
}

  ngOnInit(): void {
  }
}
