import { Component, Input, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { PokemonDetail } from 'src/app/model/pokemon.detail';
import { PokemonList } from 'src/app/model/pokemon.list';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemonList: PokemonDetail[] = [];
  offset: number;
  limit: number;
  showMore: boolean;
  loading: boolean;
  maxOffset = 898;
  constructor(private service: PokemonService) {
    this.offset = 0;
    this.limit = 51;
    this.showMore = true;
    this.loading = false;
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.loading = true;
    if (this.offset + this.limit >= this.maxOffset) {
      this.showMore = false;
    }
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
      this.loading = false;
    });
  }
}
