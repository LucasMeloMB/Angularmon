export class PokemonDetail {
  public id: number;
  public order: number;
  public name: string;
  public height: number;
  public abilities: Ability[];
  public species: Species;
  public types: Type[];
  public weight: number;
  public sprites: Sprite;
  public stats: Stat[];

  constructor() {
    this.abilities = [];
    this.types = [];
  }
}

class Ability {
  public ability: {
    name: string;
  };
}

class Species {
  public url: string;
}

export class Type {
  public slot: number;
  public type: {
    name: string;
  };
}

export class Sprite {
  public front_default: string;
  public front_shiny: string;
}

class Stat {
  public base_stat: number;
  public stat: {
    name: string;
  };
}
