import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PosterDataTypes } from './posters/posters.models';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  cartTotal: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor() {}
  getCartTotal() {
    this.cartTotal.asObservable;
  }

  addToCartTotal(cardDataType: PosterDataTypes) {
    const currentTotal = this.cartTotal.getValue();
    let newTotal;
    if (cardDataType === PosterDataTypes.HEROS) {
      newTotal = currentTotal + 14.99;
    } else {
      newTotal = currentTotal + 9.99;
    }
    this.cartTotal.next(newTotal);
  }
}
