import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, timer, Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-vaccine-search',
  templateUrl: './vaccine-search.component.html',
  styleUrls: ['./vaccine-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VaccineSearchComponent implements OnInit {
  countDown: Subscription;
  counter = 300; //5 min
  tick = 1000;

  everySecond: Observable<number> = timer(0, 20 * 1000); //20 seconds
  subscription: Subscription;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: any = ['vaccine', 'available_capacity', 'min_age_limit', 'name', 'address', 'pincode'];
  capacity: string;
  pincode: string;
  pincodeList = [273001, 273004, 273007, 273008, 273010, 273012, 273013, 273015];
  selectedPin = []
  autoReload = false;

  constructor(private http: HttpClient, private api: ApiService, private router: Router) {

  }
  ngOnDestroy(): void {
    this.countDown?.unsubscribe();
    if (this.subscription)
      this.subscription.unsubscribe();
  }
  ngOnInit(): void {
  }
  onBackClick() {
    this.router.navigate(['home']);
  }
  onSearch() {
    this.callAPI();
  }
  onRefresh() {
    this.callAPI()
  }
  onAutoReloadStart() {
    this.countDown = timer(0, this.tick).subscribe(() => {
      --this.counter;
      if (this.counter === 0) {
        this.onStop();
      }
    });
    console.log(this.countDown);

    this.subscription = this.everySecond.subscribe(res => {
      this.callAPI();
    });

  }
  callAPI() {
    this.api.loadVAccine(this.pincode).subscribe(resp => {
      let data = this.api.transformData(resp['centers']);
      if (this.capacity) {
        data = data.filter(val => val.available_capacity > parseInt(this.capacity));
      }
      if (this.selectedPin.length > 0) {
        data = data.filter(val => this.selectedPin.indexOf(parseInt(val.pincode)) !== -1)
      }
      this.dataSource.data = data;
    });
  }
  onStop() {
    this.countDown.unsubscribe();
    this.counter = 300;
    this.subscription.unsubscribe();
  }
}
