import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  templateUrl: './selectors-page.component.html',
  styles: ``
})
export class SelectorsPageComponent implements OnInit{
  
  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required]
  });

  public countriesByRegion: SmallCountry[] = []; 
  public borders: SmallCountry[] = [];

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  public get regions(): Region[] {
    return this.countriesService.regions
  }

  private onRegionChanged(): void {
    this.myForm.get('region')?.valueChanges
      .pipe(
        tap( () => this.myForm.get('country')!.setValue('') ),
        tap( () => this.borders = [] ),
        switchMap( region => this.countriesService.getCountriesByRegion(region))
      )
      .subscribe( countries => this.countriesByRegion = countries);
  }

  private onCountryChanged(): void {
    this.myForm.get('country')?.valueChanges
      .pipe(
        tap( () => this.myForm.get('borders')!.setValue('') ),
        filter((value:string) => value.length > 0),
        switchMap( alphaCode => this.countriesService.getCountryByAlphaCode(alphaCode)),
        switchMap( country => this.countriesService.getCountryBordersByCode(country.borders))
      )
      .subscribe( countries => {this.borders = countries; console.log(countries)});
  }
}
