import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetail } from 'src/app/model/pokemon.detail';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemonDetail: PokemonDetail = new PokemonDetail();

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PokemonService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const pokemonName = this.activatedRoute.snapshot.params.pokemonName;
    this.getPokemon(pokemonName);
  }
  getPokemon(pokemon: string): void {
    this.service.getPokemonDetail(pokemon).subscribe(
      (response: PokemonDetail) => {
        this.pokemonDetail = response;
      },
      (error: any) => {
        if (error.status === 404) {
          this.snackBar.open('Pokemon não encontrado', 'Ok', {
            duration: 5000
          });
        }
      }
    );
  }
}
