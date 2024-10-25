import { LitElement, html, css } from 'lit-element';
import "@bbva-experience-components/bbva-button-default/bbva-button-default.js";
import "@bbva-experience-components/bbva-type-text/bbva-type-text.js"

export class PokemonesUi extends LitElement {
  static get properties() {
    return {
      active: { type: Boolean },
      pokemonData: { type: Array },
      loading: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.active = true;
    this.pokemonData = [];
    this.loading = true;
  }

  async fetchPokemon() {
    try {
      console.log('Iniciando fetch de Pokémon');
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const pokemonList = await Promise.all(data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const pokemonDetails = await res.json();
        return {
          nombre: pokemonDetails.name,
          imagen: pokemonDetails.sprites.front_default,
          tipos: pokemonDetails.types.map(typeInfo => typeInfo.type.name).join(', '),
        };
      }));

      this.pokemonData = pokemonList;
      this.loading = false;
    } catch (error) {
      console.error('Error al obtener datos de Pokémon:', error);
      this.loading = false;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.active) {
      this.fetchPokemon();
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: 'Arial', sans-serif;
      }
        .title {
        text-align: center;
        font-size: 2rem;
        color: #333;
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 10px;
      }
  
      .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 20px;
        max-height: 80vh;
        overflow-y: auto;
        background-color: #f9f9f9;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
  
      .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 20px;
        max-height: 80vh;
        overflow-y: auto;
        background-color: #f9f9f9;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
  
      .card {
        background-color: #ffffff;
        border-radius: 15px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 15px;
        margin: 15px;
        text-align: center;
        transition: transform 0.3s, box-shadow 0.3s;
        width: 240px;
        position: relative;
        overflow: hidden;
        border: 2px solid transparent;
        font-weight: bold;
        color: #444;
        font-size: 1.1rem;
      }
  
      .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        border-color: #ffcc00; /* Color dorado al hacer hover */
      }
  
      img {
        border-radius: 10px;
        max-width: 100%;
        height: auto;
        margin-bottom: 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }
  
      h3 {
        margin: 10px 0;
        font-size: 1.5rem; /* Aumentado para mayor prominencia */
        color: #333;
      }
  
      p {
        color: #555;
        font-size: 0.95rem;
        margin: 5px 0; /* Espacio para mayor claridad */
      }
  
      .loading {
        text-align: center;
        font-size: 1.5rem;
        color: #666;
        padding: 20px;
      }
  
      bbva-button-default {
        background-color: #ffcc00;
        color: #fff;
        border-radius: 5px;
        padding: 10px 15px;
        font-weight: bold;
        transition: background-color 0.3s;
      }
  
      bbva-button-default:hover {
        background-color: #ffb300; /* Efecto hover en el botón */
      }
    `;
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">Cargando Pokémon...</div>`;
    }

    return html`
      <bbva-type-text class="title" text="Lista de Pokemones"></bbva-type-text>
      <div class="card-container">
        ${this.pokemonData.length === 0 
          ? html`<div>No se encontraron Pokémon.</div>` 
          : this.pokemonData.map(pokemon => html`
            <div class="card">
              <h3>${pokemon.nombre}</h3>
              <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
              <p>Tipos: ${pokemon.tipos}</p>
              <bbva-button-default text="Evoluciones"></bbva-button-default>
            </div>
          `)}
      </div>
    `;
  }
}

customElements.define('pokemones-ui', PokemonesUi);
