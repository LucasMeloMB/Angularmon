import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonList } from '../model/pokemon.list';
import { map } from 'rxjs/operators';
import { PokemonDetail } from '../model/pokemon.detail';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private API = 'https://pokeapi.co/api/v2/';
  constructor(private http: HttpClient) {}

  getPokemonList(
    offset: number,
    limit: number = 51
  ): Observable<PokemonList[]> {
    return this.http
      .get<PokemonList[]>(`${this.API}pokemon?offset=${offset}&limit=${limit}`)
      .pipe(map((response: any) => response.results));
  }

  getPokemonDetail(pokemon: number | string): Observable<PokemonDetail> {
    if (pokemon === 'dragonair') {
      pokemon = 148;
    }
    return this.http.get<PokemonDetail>(`${this.API}pokemon/${pokemon}`);
  }
}
