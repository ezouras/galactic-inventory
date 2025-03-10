import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppSessionService {
  private postersLoadedData$ = new BehaviorSubject(false);

  setPostersLoaded(loading: boolean) {
    this.postersLoadedData$.next(loading);
  }
  getPostersLoaded$() {
    return this.postersLoadedData$.asObservable();
  }
}
