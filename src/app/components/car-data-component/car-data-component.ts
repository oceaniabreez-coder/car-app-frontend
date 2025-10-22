import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { Car } from '../../models/car-model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-data-component',
  imports: [ReactiveFormsModule],
  templateUrl: './car-data-component.html',
  styleUrl: './car-data-component.scss'
})
export class CarDataComponent {

  @Output() update = new EventEmitter<Car>();
  @Output() delete = new EventEmitter<Car>();



  cars = input<Array<Car>>([]);
  openCarValue: Car | undefined; 

  updateCarForm: FormGroup;

  constructor(private fb: FormBuilder) {
     this.updateCarForm = this.fb.group({
    id: this.fb.control(''),
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

  openCar(car:Car){
    console.log("data data",car)
    this.openCarValue = car
    this.updateCarForm.patchValue(this.openCarValue);
  }


  onUpdate(){
    const updateCar = this.updateCarForm.value;
    updateCar.model_year = Number(updateCar.model_year)
    updateCar.cylinders = Number(updateCar.cylinders)
    this.update.emit(updateCar);

  }

  onDelete(){
    const deleteCar =this.updateCarForm.value;
    this.delete.emit(deleteCar);
  }


}
