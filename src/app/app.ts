import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarHomeComponent } from "./components/car-home-component/car-home-component";
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CarHomeComponent,NgxUiLoaderModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('car-app-frontend');
}
