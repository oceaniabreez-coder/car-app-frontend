import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CarFilters } from '../../models/filter-model';
import { Car } from '../../models/car-model';

@Component({
  selector: 'app-car-filters-component',
  imports: [ReactiveFormsModule],
  templateUrl: './car-filters-component.html',
  styleUrl: './car-filters-component.scss'
})
export class CarFiltersComponent{


    @Output() search = new EventEmitter<CarFilters>();
    @Output() add = new EventEmitter<Car>();
    @Output() csv = new EventEmitter<void>()
  
    searchCarForm: FormGroup;
    addCarForm: FormGroup;

    constructor(private fb: FormBuilder) {
      this.searchCarForm = this.fb.group({
      name: this.fb.control(''),
      make: this.fb.control(''),
      year: this.fb.control(''),
      cylinders: this.fb.control(''),
      horsepower: this.fb.control(''),
      displacement: this.fb.control(''),
      origin: this.fb.control(''),
      mpg: this.fb.control(''),
      weight: this.fb.control(''),
      acceleration: this.fb.control('')
  });

  this.addCarForm = this.fb.group({
    name: this.fb.control(''),
    origin: this.fb.control(''),
    model_year: this.fb.control(''),
    cylinders: this.fb.control(''),
    mpg: this.fb.control(''),
    horsepower: this.fb.control(''),
    displacement: this.fb.control(''),
    weight: this.fb.control(''),
    acceleration: this.fb.control('')
  });
}

    onSearch(){
      const newFilter = this.searchCarForm.value; 
      this.search.emit(newFilter);
    }

    onAddCar(){
      const newCar = this.addCarForm.value; 
      this.add.emit(newCar);
    }

    downloadCsv(){
      this.csv.emit();
    }

}
