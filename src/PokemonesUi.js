import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './pokemones-ui.css.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';
import '@bbva-experience-components/bbva-type-text/bbva-type-text.js';
import '@bbva-web-components/bbva-spinner/bbva-spinner.js';
import {BbvaCoreIntlMixin} from '@bbva-web-components/bbva-core-intl-mixin';

/**
 * ![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <pokemones-ui></pokemones-ui>
 * ```
 */
export class PokemonesUi extends BbvaCoreIntlMixin(LitElement) {
  static get properties() {
    return {
      /**
       * Description for property
       */
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

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('pokemones-ui-shared-styles'),
    ];
  }

  async fetchPokemon() {
    try {
      console.log('Iniciando fetch de Pokémon');
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=50');

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

  render() {
    return html`
    <div class="main-container">
      ${this.loading 
        ? html` 
          <div class="bbva-spinner">
            <bbva-spinner with-mask=""></bbva-spinner>
          </div>`
        : html`
          <bbva-type-text class="title" text="${this.t("pokemon-title")}"></bbva-type-text>
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
        `}
    </div>
    `;

  }
  

}
