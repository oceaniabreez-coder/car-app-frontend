import { Component, inject, OnInit, signal } from '@angular/core';
import { CarFiltersComponent } from "../car-filters-component/car-filters-component";
import { CarDataComponent } from "../car-data-component/car-data-component";
import { ApiService } from '../../services/api.service';
import { Car } from '../../models/car-model';
import { CarFilters, CarRangeFilters } from '../../models/filter-model';
import { Papa } from 'ngx-papaparse';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-home-component',
  imports: [CarFiltersComponent, CarDataComponent,NgxSpinnerModule],
  templateUrl: './car-home-component.html',
  styleUrl: './car-home-component.scss'
})
export class CarHomeComponent implements OnInit{

  private toastr = inject(ToastrService);
  constructor(private papa: Papa,private spinner: NgxSpinnerService) {}

  viewCars = signal<Array<Car>>([]);
  carApiService = inject(ApiService)
  private carData:any[] =[];
  isAscending: boolean = true;

  ngOnInit(): void {
    this.carApiService.searchCars('{}',100)
    .subscribe((carList)=>{
      console.log(carList)
      this.carData = carList.cars;
      this.viewCars.set(carList.cars);
    })
  }


  searchCars(filters: CarRangeFilters){
    console.log('Search requested with filters:', filters);
    this.carApiService.searchCars(filters,100).subscribe({
      next:(carList)=>{
      console.log(carList)
      this.carData = carList.cars;
      this.viewCars.set(carList.cars);
    },
    error: (err) => {
        console.error(err);
        this.toastr.error('Failed to search car. Please try again.', err);
      }
    })
  }

    addCar(car:Car){
    console.log('new car added',car);
    this.carApiService.addCar(car)
    .subscribe((addedCar)=>{
      console.log(addedCar);
       this.toastr.error('Car added successfully!', 'Delete');
    })
  }
  
  updateCar(car:Car){
    console.log('car update',car);
    this.carApiService.updateCar(car)
    .subscribe((updatedCar)=>{
      console.log(updatedCar);
    })
  }

  deleteCar(car:Car){
    console.log('car deleted',car)
    this.carApiService.deleteCar(car.id)
    .subscribe((deletedCar)=>{
      console.log("deleted car",deletedCar);
       this.toastr.success('Car deleted successfully!', 'Success');
    })
  }

  carSorting(){
     if (this.isAscending) {
      this.carData.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.carData.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.isAscending = !this.isAscending;
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
