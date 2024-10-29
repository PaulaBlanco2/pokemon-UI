import { LitElement, html } from 'lit-element';
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
    // Escucha el evento para cargar Pokémon
    this.addEventListener('pokemon-data-loaded', this.handlePokemonDataLoaded.bind(this));
    const dm = this.shadowRoot.querySelector('pokemones-dm');
    if (dm) {
      dm.fetchPokemon(); // Llama a la función para obtener Pokémon
    }
  }

  handlePokemonDataLoaded(event) {
    this.pokemonData = event.detail;
    this.loading = false; // Cambia el estado de carga
    this.requestUpdate(); // Solicita actualización del renderizado
  }

  render() {
    return html`
      <div class="main-container">
        ${this.loading 
          ? html`<bbva-spinner></bbva-spinner>` 
          : this.pokemonData.length === 0 
            ? html`<div>No se encontraron Pokémon.</div>`
            : this.pokemonData.map(pokemon => html`
                <div class="card">
                  <h3>${pokemon.nombre}</h3>
                  <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
                  <p>Tipos: ${pokemon.tipos}</p>
                  <bbva-button-default
                    text="Evoluciones"
                    @click="${() => this.dispatchEvent(new CustomEvent('show-evolutions', { detail: { pokemon }, bubbles: true, composed: true }))}">
                  </bbva-button-default>
                </div>
              `)
        }
      </div>
      <pokemones-dm></pokemones-dm>
    `;
  }
}
