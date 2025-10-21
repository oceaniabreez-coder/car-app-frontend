import { Component, inject, OnInit, signal } from '@angular/core';
import { CarFiltersComponent } from "../car-filters-component/car-filters-component";
import { CarDataComponent } from "../car-data-component/car-data-component";
import { ApiService } from '../../services/api.service';
import { Car } from '../../models/car-model';
import { CarFilters } from '../../models/filter-model';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-car-home-component',
  imports: [CarFiltersComponent, CarDataComponent],
  templateUrl: './car-home-component.html',
  styleUrl: './car-home-component.scss'
})
export class CarHomeComponent implements OnInit{

  constructor(private papa: Papa) {}

  viewCars = signal<Array<Car>>([]);
  carApiService = inject(ApiService)
  private carData:any[] =[];

  ngOnInit(): void {
    this.carApiService.searchCars('{}',100)
    .subscribe((carList)=>{
      console.log(carList)
      this.carData = carList.cars;
      this.viewCars.set(carList.cars);
    })
  }


  searchCars(filters: CarFilters){
    console.log('Search requested with filters:', filters);
    this.carApiService.searchCars(filters,100)
    .subscribe((carList)=>{
      console.log(carList)
      this.carData = carList.cars;
      this.viewCars.set(carList.cars);
    })
  }

    addCar(car:Car){
    console.log('new car added',car);
    this.carApiService.addCar(car)
    .subscribe((addedCar)=>{
      console.log(addedCar);
    })
  }


  downloadCsv(){
  console.log("downloadCSV",this.carData);

    if (!this.carData || this.carData.length === 0) {
    alert('No data available to export.');
    return;
  }

  const csv = this.papa.unparse(this.carData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'car-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);

  }

}
