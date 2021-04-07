import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

@NgModule({
  declarations: [PokemonListComponent, PokemonCardComponent],
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  exports: [PokemonListComponent]
})
export class PokemonModule {}
