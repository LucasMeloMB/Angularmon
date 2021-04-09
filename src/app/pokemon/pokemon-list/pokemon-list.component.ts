import { Component, Input, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { PokemonDetail } from 'src/app/model/pokemon.detail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PokemonList } from 'src/app/model/pokemon.list';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemonList: PokemonDetail[] = [];
  searchPokemon: PokemonDetail = new PokemonDetail();
  search: FormControl = new FormControl('');
  offset: number;
  limit: number;
  showMore: boolean;
  showCard: boolean;
  loadingButton: boolean;
  searchState: boolean;
  private maxOffset = 898;
  constructor(private service: PokemonService, private snackBar: MatSnackBar) {
    this.offset = 0;
    this.limit = 51;
    this.showMore = false;
    this.showCard = false;
    this.loadingButton = false;
    this.searchState = false;
  }

  ngOnInit(): void {
    this.getList();
  }

  checkShowMoreButton(): void {
    if (this.offset + this.limit >= this.maxOffset) {
      this.showMore = false;
    } else {
      this.showMore = true;
    }
  }

  getList(): void {
    this.loadingButton = true;
    this.checkShowMoreButton();
    this.service
      .getPokemonList(this.offset, this.limit)
      .subscribe((response) => {
        this.getPokemons(response);
      });
  }

  getPokemons(list: PokemonList[]): void {
    const arr: Observable<PokemonDetail>[] = [];
    list.map((value: PokemonList) => {
      arr.push(this.service.getPokemonDetail(value.name));
    });
    forkJoin([...arr]).subscribe((details: PokemonDetail[]) => {
      this.pokemonList.push(...details);
      this.offset += this.limit;
      if (this.maxOffset - this.offset < this.limit) {
        this.limit = this.maxOffset - this.offset;
      }
      this.loadingButton = false;
      this.checkShowMoreButton();
    });
  }

  getSearchPokemon(): void {
    const pokemon = this.search.value.toLowerCase();
    if (pokemon === '') {
      this.showCard = false;
      this.searchState = false;
      this.checkShowMoreButton();
    } else {
      this.searchState = true;
      this.showMore = false;
      this.service.getPokemonDetail(pokemon).subscribe(
        (response: PokemonDetail) => {
          this.searchPokemon = response;
          this.showCard = true;
        },
        (error: any) => {
          this.showCard = false;
          if (error.status === 404) {
            this.snackBar.open('Pokemon não encontrado', 'Ok', {
              duration: 5000
            });
          }
        }
      );
    }
  }
}
