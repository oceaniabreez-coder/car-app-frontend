import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../enviornments/environment';
import { CarAddResponse, CarResponse } from '../models/car-response-model';
import { Car } from '../models/car-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/api/cars`;

  searchCars(filter:any,limit:number){
    const url = `${this.baseUrl}/search`;
    const body = { filter, limit };
    return this.http.post<CarResponse>(url,body);
  }
  
  addCar(car:Car){
    const url = this.baseUrl
    const body = car;
    return this.http.post<CarAddResponse>(url,body);
  }
  
  updateCar(car:Car){
    const url = this.baseUrl
    const body = car;
    return this.http.put<CarAddResponse>(url,body);
  }

  deleteCar(id:string){
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<CarAddResponse>(url);
  }
  
  
}
