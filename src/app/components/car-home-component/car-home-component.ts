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


  //search car service
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
        this.toastr.error('Failed to search car. Please change the filters and try again.', err);
      }
    })
  }

    //Add new car service
    addCar(car:Car){
    console.log('new car added',car);
    this.carApiService.addCar(car).subscribe({
      next:(addedCar)=>{
      console.log(addedCar);
       this.toastr.success('Car added successfully!', 'Success');
    },
     error: (err) => {
        console.error(err);
        this.toastr.error('Failed to add car. Please try again.', err);
      }
    })
  }
  
  //update car service
  updateCar(car:Car){
    console.log('car update',car);
    this.carApiService.updateCar(car).subscribe({
      next:(updatedCar)=>{
      console.log(updatedCar);
      this.toastr.success('Car updated successfully!', 'Success');
    },
    error: (err) => {
        console.error(err);
        this.toastr.error('Failed to update car. Please try again.', err);
      }

    })

  }

  //delete car service
  deleteCar(car:Car){
    console.log('car deleted',car)
    this.carApiService.deleteCar(car.id).subscribe({
      next:(deletedCar)=>{
      console.log("deleted car",deletedCar);
       this.toastr.error('Car deleted successfully!', 'Success');
    },
    error: (err) => {
        console.error(err);
        this.toastr.error('Failed to delete car. Please try again.', err);
      }

    })
  }

  //sorting service
  carSorting(){
     if (this.isAscending) {
      this.carData.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.carData.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.isAscending = !this.isAscending;
  }


  //download CSV service
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
