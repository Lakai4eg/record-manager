import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RegDataTransferService} from "../reg-data-transfer.service";

export interface recProps {
  specName: string
  date: string
  time: string
  patientName?: string
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})


export class RegisterFormComponent {
  constructor(public regData: RegDataTransferService) {
  }
  @Output() onRecordAdd = new EventEmitter();

  recordAdd(){
    this.onRecordAdd.emit()
    this.regData.closeForm()
  }

}
