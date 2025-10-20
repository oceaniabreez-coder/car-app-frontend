import { Car } from "./car-model";

export interface CarResponse{
    cars: Car[];
    count : number;
    
}

export interface CarAddResponse{
    message:string;
    car:Car;
}