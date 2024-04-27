import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interface';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania];
  private baseUrl: string = 'https://restcountries.com/v3.1';
  private queryParams: string = 'fields=cca3,name,borders';

  constructor(private http: HttpClient) { }

  public get regions(): Region[] {
    return [...this._regions];
  }

  public getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);
    
    const endpoint: string = `${this.baseUrl}/region/${region}?${this.queryParams}`;
    return this.http.get<Country[]>(endpoint)
      .pipe(
        map( countries => countries.map(this.mapToSmallCountry)),
      );
  }

  public getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {

    const endpoint: string = `${this.baseUrl}/alpha/${alphaCode}?${this.queryParams}`;

    return this.http.get<Country>(endpoint)
      .pipe(
        map(this.mapToSmallCountry)
      );
  }

  public getCountryBordersByCode(borders: string[]): Observable<SmallCountry[]> {
    if (!borders || borders.length === 0) return of([]);

    const requests: Observable<SmallCountry>[] = [];

    borders.forEach( (code: string) => {
      const request = this.getCountryByAlphaCode(code);
      requests.push(request);
    });

    return combineLatest(requests);
  }

  private mapToSmallCountry(country: Country): SmallCountry {
    const newSmallCountry: SmallCountry = {
      name: country.name.common,
      cca3: country.cca3,
      borders: country.borders ?? []
    }
    return newSmallCountry;
  }
}
