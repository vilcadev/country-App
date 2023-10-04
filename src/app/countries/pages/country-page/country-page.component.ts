import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  constructor(
     private activatedRoute: ActivatedRoute,
     private CountriesService: CountriesService,
     private router: Router,
      ){}

  // Dentro del ngOnInit Inicialmente se creo un Observable Hell o callback Hell,
  // esto es llamar un Observable dentro de otro Observable
  /**
   *   ngOnInit(): void {
    this.activatedRoute.params
    .subscribe( ({id}) => {

      this.CountriesService.searchCountryByAlphaCode(id)
      .subscribe(country =>{
        console.log({country})
      });

    });
  }
   */
  // Pero con rxjs mejoramos esto gracias a switchMap
  //switchMap: Regresa un nuevo Observable
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.CountriesService.searchCountryByAlphaCode(id))
      )
      // Ahora el subscribe de abajo esta suscrito al resultado del switchMap
    .subscribe( country => {
      if(!country) return this.router.navigateByUrl('');
      return this.country = country;
    });
  }


}
