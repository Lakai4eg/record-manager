import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface specialist {
  id: number
  name: string
  checked: boolean
}

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html',
  styleUrls: ['./specialist-list.component.scss']
})


export class SpecialistListComponent implements OnInit {
  @Input() specList: specialist[] = []
  @Output() onSpecClick: EventEmitter<specialist> = new EventEmitter<specialist>()

  onSpecialistClick(spec: specialist){
    spec.checked = !spec.checked
    this.onSpecClick.emit(spec)
  }

  constructor() {}

  ngOnInit(): void {
    this.specList.forEach(el=>el.checked = false)
  }

}
