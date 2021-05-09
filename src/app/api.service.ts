import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL: string = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=654&date=09-05-2021';
  URL: string = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict';
  date = new Date();

  constructor(private http: HttpClient) { }

  loadVAccine(pincode: string) {
    let params: any;
    if (pincode) {
      params = {
        date: this.getFormattedDate(),
        pincode: pincode
      }
    } else {
      params = {
        date: this.getFormattedDate(),
        district_id: 654
      }
    }
    return this.http.get(this.URL, { params });
  }

  transformData(data) {
    let transformObj = []
    // console.log(data);
    data.forEach(val => {
      val.sessions.forEach(session => {
        if (session.min_age_limit === 18 && session.available_capacity > 0) {
          let Obj = {};
          Obj['vaccine'] = session.vaccine;
          Obj['min_age_limit'] = session.min_age_limit;
          Obj['available_capacity'] = session.available_capacity;
          Obj['date'] = session.date;
          Obj['name'] = val.name;
          Obj['address'] = val.address;
          Obj['pincode'] = val.pincode;
          transformObj.push(Obj);
        }
      });;
    });
    console.log(transformObj);
    return transformObj;
  }

  getFormattedDate() {
    let dd = this.date.getDate() + '';
    let mm = (this.date.getMonth() + 1) + '';
    let yyyy = this.date.getFullYear();
    if (parseInt(dd) < 10) {
      dd = '0' + dd;
    }
    if (parseInt(mm) < 10) {
      mm = '0' + mm;
    }
    let today = dd + '-' + mm + '-' + yyyy;
    return today;
  }
}
