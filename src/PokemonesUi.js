import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './pokemones-ui.css.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';
import '@bbva-experience-components/bbva-type-text/bbva-type-text.js';
import '@bbva-web-components/bbva-spinner/bbva-spinner.js';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import '@pokedex/pokemones-dm/pokemones-dm.js';

export class PokemonesUi extends BbvaCoreIntlMixin(LitElement) {
  static get properties() {
    return {
      pokemonData: { type: Array },
      loading: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.pokemonData = [];
    this.loading = true;
  }

  firstUpdated() {
    // Escuchar el evento 'pokemon-data-loaded' emitido por el componente PokemonesDm
    this.addEventListener('pokemon-data-loaded', (e) => {
      this.pokemonData = e.detail; // Asigna los datos recibidos a pokemonData
      this.loading = false; // Cambia el estado de carga
    });
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('pokemones-ui-shared-styles'),
    ];
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
      <pokemones-dm></pokemones-dm> <!-- Agregar el componente de datos en la UI -->
    `;
  }
}
customElements.define('pokemones-ui', PokemonesUi);
