import { Component, Input, OnInit } from '@angular/core';
import { Type, Sprite } from 'src/app/model/pokemon.detail';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() types: Type[] = [];
  @Input() sprites: Sprite = new Sprite();

  constructor() {}

  ngOnInit(): void {}

  getPrincipalType(list: any[]): void {
    return list.filter((type) => type.slot === 1)[0]?.type.name;
  }
}
