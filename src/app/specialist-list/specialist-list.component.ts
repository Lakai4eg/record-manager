import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface specialist {
  id: number
  name: string
  checked?: boolean
}

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html',
  styleUrls: ['./specialist-list.component.scss']
})


export class SpecialistListComponent implements OnInit {
  @Input() specList: specialist[] = []
  @Output() onSpecClick: EventEmitter<specialist> = new EventEmitter<specialist>()

  // specList : specialist[] = [
  //   {id: 1, name: 'Аитова Аниса Равильевна'},
  //   {id: 2, name: 'Вавилов Никита Васильевич'},
  //   {id: 3, name: 'Гилева Ирина Сергеевна'},
  //   {id: 4, name: 'Ковалева Наталья Васильевна'},
  //   {id: 5, name: 'Маматов Евгения Александровна'}
  // ]

  onSpecialistClick(spec: specialist){
    spec.checked = !spec.checked
    this.onSpecClick.emit(spec)
  }

  constructor() {}

  ngOnInit(): void {
  }

}
