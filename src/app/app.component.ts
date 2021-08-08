import {Component, OnInit} from '@angular/core';
import {specialist} from "./specialist-list/specialist-list.component";
import * as moment from 'moment';
import {sheduleItem} from "./shedule-controller/shedule-item/shedule-item.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'record-manager';
  dateSelected = moment().format('yyyy-MM-DD')
  allSpec : specialist[] = [
    {id: 0, name: 'Аитова Аниса Равильевна'},
    {id: 1, name: 'Вавилов Никита Васильевич'},
    {id: 2, name: 'Гилева Ирина Сергеевна'},
    {id: 3, name: 'Ковалева Наталья Васильевна'},
    {id: 4, name: 'Маматов Евгения Александровна'}
  ]
  allLoadedItems = [
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
      date: '2021-08-07',
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
    }
  ]
  allSheduleItems: any = []
  allShowedSpec :specialist[] = []

  updateShowedSpec(currentSpec: specialist){
    if(currentSpec.checked){
      this.allShowedSpec.push(currentSpec)
      }
      else {
        let indexOfCurrentSpec = this.allShowedSpec.indexOf(currentSpec)
        if(indexOfCurrentSpec !== -1){
        this.allShowedSpec.splice(indexOfCurrentSpec, 1)
      }
    }
    this.allSheduleItems.push(this.selectSheduleItems(this.dateSelected, currentSpec.id))
    console.log(this.allSheduleItems)
  }

  updateDateSelected(date: string) {
    this.dateSelected = date.toString()
  }

  addSheduleItemToList(){
  }

  selectSheduleItems(date: string, specId: number){
    return this.allLoadedItems.find(elem => {
      return ((elem.id === specId) && (elem.date === date))
    })
  }

  ngOnInit() {
  }
}
