import { Injectable } from '@angular/core';

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
}
