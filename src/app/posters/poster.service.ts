import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, concatAll, map, of, tap } from 'rxjs';
import {
  PosterDataTypes,
  PosterCardData,
  GalacticPosterData,
} from './posters.models';

export interface PosterApiData {
  dataType: string;
  data: any;
  nextPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class PosterService {
  private apiData: any = {
    people: 'https://swapi.dev/api/people/',
    planets: 'https://swapi.dev/api/planets/',
    starships: 'https://swapi.dev/api/starships/',
  };

  //cartTotal: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  galacticPosterData: BehaviorSubject<GalacticPosterData> =
    new BehaviorSubject<GalacticPosterData>({
      [PosterDataTypes.HEROS]: [],
      [PosterDataTypes.PLANETS]: [],
      [PosterDataTypes.STARSHIPS]: [],
    });

  constructor(private http: HttpClient) {}

  setGalacticPosterData(data: PosterCardData[], dataType: PosterDataTypes) {
    this.galacticPosterData.next({
      ...this.galacticPosterData.getValue(),
      [dataType]: data,
    });
  }

  getGalacticPosterData(): Observable<GalacticPosterData> {
    return this.galacticPosterData.asObservable();
  }

  fetchPosterData(): Observable<any> {
    const posterDataHttpCalls = Object.keys(this.apiData).map((key) => {
      return this.http.get(this.apiData[key as PosterDataTypes]);
    });

    return of(...posterDataHttpCalls).pipe(
      concatAll(),
      tap((resp: any) => {
        const dataForType: PosterApiData = this.getDataForType(resp);
        this.setPosterDataForType(dataForType);
      })
    );
  }

  getDataForType(dataResponse: any) {
    const next: number = dataResponse.next
      ? dataResponse.next?.split('=')[1]
      : '';
    const dataType: string = dataResponse.next
      ? dataResponse.next.split('/')[4]
      : ' ';
    return {
      dataType: dataType,
      data: dataResponse.results
        ? this.getFilteredData(dataResponse.results, dataType)
        : [],
      nextPage: next,
    };
  }

  getFilteredData(data: any[], dataType: string): any {
    if (dataType === PosterDataTypes.HEROS) {
      return data.filter((item: any) => {
        const starshipAssociation = item.starships?.length > 0 ? true : false;
        const moreThanOneFilm = item.films?.length > 1 ? true : false;
        return moreThanOneFilm && starshipAssociation;
      });
    }
    return data;
  }

  setPosterDataForType(posterData: PosterApiData) {
    const cardData: PosterCardData[] = this.getCardData(posterData);
    console.log('card data', cardData);
    this.setGalacticPosterData(
      cardData,
      posterData.dataType as PosterDataTypes
    );
  }

  getCardData(posterApiData: PosterApiData): PosterCardData[] {
    const heroPosterData = posterApiData.data.map((item: any) => {
      return {
        type: posterApiData.dataType,
        stock: this.getStockForCard(item.name),
        title:
          posterApiData.dataType === PosterDataTypes.HEROS
            ? 'Heros!'
            : posterApiData.dataType,
        name: item.name ? item.name : 'no name found for hero ',
        price:
          posterApiData.dataType === PosterDataTypes.HEROS ? '$14.99' : '$9.99',
      };
    });
    return heroPosterData;
  }

  getStockForCard(cardDataKey: string) {
    if (localStorage.getItem(cardDataKey)) {
      return this.getItem(cardDataKey);
    } else {
      //get random number
      const randomNumber = Number(
        Math.floor(Math.random() * 100) + 1
      ).toString();
      this.setItem(cardDataKey, randomNumber);
      return randomNumber;
    }
  }
  setItem(key: string, randomNumber: string): void {
    try {
      localStorage.setItem(key, JSON.stringify(randomNumber));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  getItem(key: string): any {
    try {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error('Error retrieving from localStorage', error);
      return null;
    }
  }
}
