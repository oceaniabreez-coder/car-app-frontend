import { Component, input } from '@angular/core';
import { Car } from '../../models/car-model';

@Component({
  selector: 'app-car-data-component',
  imports: [],
  templateUrl: './car-data-component.html',
  styleUrl: './car-data-component.scss'
})
export class CarDataComponent {

  cars = input<Array<Car>>([]);

}
