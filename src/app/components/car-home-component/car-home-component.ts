import { Component, inject, OnInit, signal } from '@angular/core';
import { CarFiltersComponent } from "../car-filters-component/car-filters-component";
import { CarDataComponent } from "../car-data-component/car-data-component";
import { ApiService } from '../../services/api.service';
import { Car } from '../../models/car-model';
import { CarFilters } from '../../models/filter-model';

@Component({
  selector: 'app-car-home-component',
  imports: [CarFiltersComponent, CarDataComponent],
  templateUrl: './car-home-component.html',
  styleUrl: './car-home-component.scss'
})
export class CarHomeComponent implements OnInit{

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
    console.log("downloadCSV");

  }

}
