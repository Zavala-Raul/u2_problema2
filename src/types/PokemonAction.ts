import { type PokeItem } from "./PokeItem";
import { type PokemonDetails } from "./PokemonDetails";

export type PokemonAction = 
| {type: "add";item:PokeItem}
| {type: "delete";id:string}
| {type: "select";pokemon:PokemonDetails | null}
