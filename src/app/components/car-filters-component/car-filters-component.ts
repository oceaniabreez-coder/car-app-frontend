import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CarFilters } from '../../models/filter-model';

@Component({
  selector: 'app-car-filters-component',
  imports: [ReactiveFormsModule],
  templateUrl: './car-filters-component.html',
  styleUrl: './car-filters-component.scss'
})
export class CarFiltersComponent{


    @Output() search = new EventEmitter<CarFilters>();
     @Output() csv = new EventEmitter<void>()
  
    searchCarForm: FormGroup;


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
}
 
    onSearch(){
      const newFilter = this.searchCarForm.value; 
      this.search.emit(newFilter);
    }

    downloadCsv(){
      this.csv.emit();
    }

}
