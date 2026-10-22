import type { PokeItem } from './PokeItem'
import type { PokemonDetails } from './PokemonDetails'

export type PokemonState = {
  pokes: PokeItem[]
  selectedPokemon: PokemonDetails | null
}
