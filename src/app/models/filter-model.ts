export interface CarFilters {
  id?: string;
  name?: string;
  mpg?: number;
  cylinders?: number;
  displacement?: number;
  horsepower?: number;
  weight?: number;
  acceleration?: number;
  model_year?: number;
  origin?: string;
}

export interface CarRangeFilters {
  id?: string;
  name?: string;
  mpgMin?: number;
  mgpMax?: number;
  cylinders?: number;
  dipMin?: number;
  dipMax?: number;
  hpMin?: number;
  hpMax?: number;
  weightMin?: number;
  weightMax?: number;
  accMin?: number;
  accMax?: number;
  model_year?: number;
  origin?: string;
}