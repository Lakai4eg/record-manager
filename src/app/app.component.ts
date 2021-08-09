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
      date: '2021-08-07',
      workTimeStart: new Date(2021, 8, 7, 10, 0),
      workTimeEnd: new Date(2021, 8, 7, 10, 30),
    },
    {
      id: 1,
      name: 'Вавилов Никита Васильевич',
      date: '2021-08-08',
      workTimeStart: new Date(2021, 8, 7, 11, 0),
      workTimeEnd: new Date(2021, 8, 7, 12, 30),
    },
    {
      id: 2,
      name: 'Гилева Ирина Сергеевна',
      date: '2021-08-07',
      workTimeStart: new Date(2021, 8, 7, 13, 30),
      workTimeEnd: new Date(2021, 8, 7, 15, 30),
    },
    {
      id: 3,
      name: 'Ковалева Наталья Васильевна',
      date: '2021-08-07',
      workTimeStart: new Date(2021, 8, 7, 13, 30),
      workTimeEnd: new Date(2021, 8, 7, 15, 30),
    },
    {
      id: 4,
      name: 'Маматов Евгения Александровна',
      date: '2021-08-07',
      workTimeStart: new Date(2021, 8, 7, 13, 30),
      workTimeEnd: new Date(2021, 8, 7, 15, 30),
    },
    {
      id: 0,
      name: 'Аитова Аниса Равильевна',
      date: '2021-08-08',
      workTimeStart: new Date(2021, 8, 7, 10, 0),
      workTimeEnd: new Date(2021, 8, 7, 10, 30),
    }
  ]

  workingSpecs: any[] = []
  allSheduleItems: any[] = []


  updateShowedSpec(currentSpec: specialist){
    let specScheduleCurrentDay = this.findScheduleOfSpecialist(this.dateSelected, currentSpec.id)
    if(currentSpec.checked){
      this.allSheduleItems.push(specScheduleCurrentDay)
    }
    else{
      this.allSheduleItems.splice(this.allSheduleItems.find((el, idx) =>{
        console.log(idx)
        return el.id === currentSpec.id;
      }), 1)
    }
  }

  updateDateSelected(date: string) {
    this.dateSelected = date
    this.allSheduleItems = []
    this.workingSpecs = this.getSpecWorkingCurrentDay(date)
  }

  findScheduleOfSpecialist(date: string, specId: number){
    //Ищем график специалиста на указанный день
    return this.allSpecialistsSchedule.find(elem => {
      return ((elem.id === specId) && (elem.date === date))
    })
  }

  getSpecWorkingCurrentDay(day: string){
    /*Получаем с бэкэнда список докторов, работающих в указанный день.
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
