import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './pokemones-ui.css.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';
import '@bbva-experience-components/bbva-type-text/bbva-type-text.js';
import '@bbva-web-components/bbva-spinner/bbva-spinner.js';
import {BbvaCoreIntlMixin} from '@bbva-web-components/bbva-core-intl-mixin';
import "@pokedex/pokemones-dm/pokemones-dm.js"

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

  async firstUpdated(){
    const pokemonesDm =this.shadowRoot.querySelector("pokemones-dm");
    this.pokemonData = await pokemonesDm.fetchPokemon(),
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('pokemones-ui-shared-styles'),
    ];
  }


  connectedCallback() {
    super.connectedCallback();
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

    <pokemones-dm></pokemones-dm>
    `;

  }
  

}
