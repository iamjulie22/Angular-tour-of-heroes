import { Injectable } from '@angular/core';
import { Hero } from '../_models';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

// Fejléc a lekérésekhez
const httpOption = {
  headers: new HttpHeaders({'Content-Type':'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) { }

  getAllHeroes(){
    return this.http.get<Hero[]>(`${environment.apiURL}/posts`, httpOption);
  }

  getHeroById(heroId: Number){
    return this.http.get<Hero>(`${environment.apiURL}/posts/${heroId}`,httpOption);

  }

  addHero(hero:Hero){
    return this.http.post<Hero>(`${environment.apiURL}/posts`, hero, httpOption).pipe(
      tap(hero => console.log(`inserted hero = ${JSON.stringify(hero)}`)),
      catchError(error => error)
    );
  }

  updateHero(hero:Hero) {
    return this.http.put<Hero>(`${environment.apiURL}/posts/${hero.id}`,hero,httpOption).pipe(
      tap(updatedHero => console.log(`updated hero = ${JSON.stringify(updatedHero)}`)),
      catchError(error => error)
      );
  }

  deleteHero(heroId: Number) {
    return this.http.delete<Hero>(`${environment.apiURL}/posts/${heroId}`,httpOption).pipe(
      tap(() => console.log(`deleted hero with id = ${heroId}`)),
      catchError(error => error)
    )
  }
}
