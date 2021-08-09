import {Component, OnInit} from '@angular/core';
import {specialist} from "./specialist-list/specialist-list.component";
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'RecordManager'
  dateSelected = moment().format('yyyy-MM-DD')

  //allSpecialistsSchedule - условный бэкэнд, база данных с расписанием врачей
  allSpecialistsSchedule = [
    {
      id: 0,
      name: 'Аитова Аниса Равильевна',
      date: '2021-08-09',
      workTimeStart: '09:00',
      workTimeEnd: '12:30',
      busyInterval: [{time: '10:10', name: 'ДлиннаяФамилия Петр Петрович'}, {time: '10:30', name:'Иванов Иван Иванович'}]
    },
    {
      id: 0,
      name: 'Аитова Аниса Равильевна',
      date: '2021-08-08',
      workTimeStart: '13:30',
      workTimeEnd: '15:30'
    },
    {
      id: 1,
      name: 'Вавилов Никита Васильевич',
      date: '2021-08-08',
      workTimeStart: '10:30',
      workTimeEnd: '15:30'
    },
    {
      id: 1,
      name: 'Вавилов Никита Васильевич',
      date: '2021-08-10',
      workTimeStart: '14:30',
      workTimeEnd: '15:30'
    },
    {
      id: 2,
      name: 'Гилева Ирина Сергеевна',
      date: '2021-08-09',
      workTimeStart: '13:30',
      workTimeEnd: '15:30'
    },
    {
      id: 3,
      name: 'Ковалева Наталья Васильевна',
      date: '2021-08-09',
      workTimeStart: '10:00',
      workTimeEnd: '16:00',
    },
    {
      id: 4,
      name: 'Маматов Евгения Александровна',
      date: '2021-08-09',
      workTimeStart: '11:30',
      workTimeEnd: '17:00',
      busyInterval: [{time: '13:50', name: 'Петров Петр Петрович'}, {time: '14:40', name:'Иванов Иван Иванович'}]
    },
    {
      id: 0,
      name: 'Аитова Аниса Равильевна',
      date: '2021-08-10',
      workTimeStart: '10:00',
      workTimeEnd: '14:30',
      busyInterval: [{time: '10:10', name: 'Петров Петр Петрович'}, {time: '10:30', name:'Иванов Иван Иванович'}]
    }
  ]

  workingSpecs: any[] = []
  allscheduleItems: any[] = []


  updateShowedSpec(currentSpec: specialist){
    let specScheduleCurrentDay = this.findScheduleOfSpecialist(this.dateSelected, currentSpec.id)
    if(currentSpec.checked){
      this.allscheduleItems.push(specScheduleCurrentDay)
    }
    else{
      this.allscheduleItems.splice(this.allscheduleItems.findIndex(el =>{
        return el.id === currentSpec.id;
      }), 1)
    }
  }

  updateDateSelected(date: string) {
    this.dateSelected = date
    this.allscheduleItems = []
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

  ngOnInit() {
  }
}
