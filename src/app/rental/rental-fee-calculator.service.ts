import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentalFeeCalculatorService {

  constructor() { }

  calculate(): number {
    return 2.99;
  }
}
