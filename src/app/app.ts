import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarHomeComponent } from "./components/car-home-component/car-home-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CarHomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('car-app-frontend');
}
