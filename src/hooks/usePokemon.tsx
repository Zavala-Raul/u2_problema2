import { useActionState, useReducer } from 'react'
import { type PokemonDetails } from '../types/PokemonDetails'
import {type  PokemonAction } from '../types/PokemonAction'
import { type PokemonState } from '../types/PokemonState'
import { getPokemonAsync } from '../services/Pokedex'

type FormState = {
  message: string
}

const initialState: PokemonState = {
  pokes: [],
  selectedPokemon: null
}

function reducerPoke(state: PokemonState,action:PokemonAction): PokemonState {
    switch (action.type) {

        case 'add': {
            return {
                ...state,
                pokes: [...state.pokes, action.item]
            }
        }
        case 'delete': {

            return {
                ...state,
                pokes: state.pokes.filter((item) => item.entryId !== action.id)
            }
        }
        case 'select': {
            return {
                ...state,
                selectedPokemon: action.pokemon
            }
        }

    }

}

const usePokemon = () => {

  const [state, dispatchPoke] = useReducer(reducerPoke, initialState);
  const { pokes, selectedPokemon } = state;

  function addPoke(pokemon: PokemonDetails, nickname: string, role: string) {
    dispatchPoke({
      type: 'add',
      item: {
        entryId: crypto.randomUUID(),
        details: pokemon,
        nickname,
        role
      }
    })
  }

  function deletePoke(id: string) {
    dispatchPoke({ type: 'delete', id })
  }

  function selectPoke(pokemon: PokemonDetails | null) {
    dispatchPoke({ type: 'select', pokemon })
  }

  const searchAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
    const query = String(formData.get('query') ?? '').trim()
    selectPoke(null)

    if (query.length < 3) {
      return { message: 'Escribe al menos 3 caracteres.' }
    }

    try {
      const pokemon = await getPokemonAsync(query)
      selectPoke(pokemon)
      return { message: 'Pokémon cargado.' }
    } catch (error) {
      return { message: error instanceof Error ? error.message : 'No se pudo buscar el pokémon.' }
    }
  }

  const [searchState, searchPokemonAction, isSearching] = useActionState(searchAction, { message: '' })
  
  const pokemonAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
    const nickname = String(formData.get('nickname') ?? '').trim()
    const role = String(formData.get('role') ?? '')

    if (!selectedPokemon) {
      return { message: 'Busca y selecciona un pokémon antes de registrarlo.' }
    }

    if (nickname.length < 3) {
      return { message: 'El apodo debe tener al menos 3 caracteres.' }
    }

    if (role !== 'titular' && role !== 'reserva') {
      return { message: 'Selecciona un rol válido.' }
    }

    await new Promise(resolve => setTimeout(resolve, 1000))

    addPoke(selectedPokemon, nickname, role)

    return { message: 'Pokémon registrado correctamente.' }
  }

  const [formState, addPokemonAction, isPending] = useActionState(pokemonAction, { message: '' })

  return {
    pokes,
    selectPoke,
    addPoke,
    deletePoke,
    /** */
    formState,
    addPokemonAction,
    isPending,
    /** */
    selectedPokemon,
    /** */
    searchState,
    searchPokemonAction,
    isSearching,
    /** */
    total: pokes.length,
    titulares: pokes.filter(poke => poke.role === 'titular').length,
    reservas: pokes.filter(poke => poke.role === 'reserva').length
  }
}

export default usePokemon
