import {Component, Input, OnInit} from '@angular/core';
import {specialist} from "./specialist-list/specialist-list.component";
import * as moment from 'moment';
import {RegDataTransferService} from "./reg-data-transfer.service";

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

  title = 'RecordManager'
  dateSelected = moment().format('yyyy-MM-DD')

  //allSpecialistsSchedule - условный бэкэнд, база данных с расписанием врачей
  allSpecialistsSchedule: specScheduleItem[] = [
    {
      id: 0,
      name: 'Аитова Аниса Равильевна',
      date: '2021-08-11',
      workTimeStart: '09:00',
      workTimeEnd: '12:30',
      busyInterval: [{time: '10:10', name: 'ОченьДлиннаяФамилия Петр Петрович'}, {time: '10:30', name:'Иванов Иван Иванович'}]
    },
    {
      id: 0,
      name: 'Аитова Аниса Равильевна',
      date: '2021-08-12',
      workTimeStart: '13:30',
      workTimeEnd: '15:30',
      busyInterval: []
    },
    {
      id: 1,
      name: 'Вавилов Никита Васильевич',
      date: '2021-08-11',
      workTimeStart: '10:30',
      workTimeEnd: '15:30',
      busyInterval: []
    },
    {
      id: 1,
      name: 'Вавилов Никита Васильевич',
      date: '2021-08-12',
      workTimeStart: '14:30',
      workTimeEnd: '15:30',
      busyInterval: []
    },
    {
      id: 2,
      name: 'Гилева Ирина Сергеевна',
      date: '2021-08-11',
      workTimeStart: '13:30',
      workTimeEnd: '15:30',
      busyInterval: []
    },
    {
      id: 3,
      name: 'Ковалева Наталья Васильевна',
      date: '2021-08-11',
      workTimeStart: '10:00',
      workTimeEnd: '16:00',
      busyInterval: []
    },
    {
      id: 4,
      name: 'Маматов Евгения Александровна',
      date: '2021-08-11',
      workTimeStart: '11:30',
      workTimeEnd: '17:00',
      busyInterval: [{time: '13:50', name: 'ОченьДлиннаяФамилия Петр Петрович'}, {time: '14:40', name:'Иванов Иван Иванович'}]
    },
    {
      id: 0,
      name: 'Аитова Аниса Равильевна',
      date: '2021-08-10',
      workTimeStart: '10:00',
      workTimeEnd: '14:30',
      busyInterval: [{time: '10:10', name: 'Петров Петр Петрович'}, {time: '10:30', name:'ОченьДлиннаяФамилия Иван Иванович'}]
    }
  ]
  workingSpecs: any[] = []
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
    /*Получаем с бэкэнда список докторов, работающих в указанный день вида
    [{id: 0, name: 'Иванов Иван Иванович'}, {id:10, name:'Петров Петр Петрович'}]*/
    let allWorking =  this.allSpecialistsSchedule.filter((elem) => {
      return elem.date === day
    })
    return allWorking.map((elem)=>{
      return {id: elem.id, name: elem.name}
    })
  }

  addRecord({specId, specName, date,time,patientName} = this.regData.record):void{
    let idxOfRecordedElem = this.allSpecialistsSchedule.findIndex((el)=>{
      return (el.name === specName) && (el.date === date)
    })
    if(idxOfRecordedElem>=0){
        this.allSpecialistsSchedule[idxOfRecordedElem].busyInterval.push({
          time: time,
          name: patientName
        })
    }
    // this.updateShowedSpec({id: specId, name: specName, checked: false})
    this.updateShowedSpec({id: specId, name: specName, checked: true})
    }

  ngOnInit(): void {
  }
}
