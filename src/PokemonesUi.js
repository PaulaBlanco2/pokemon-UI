import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import '../../../pokemones-ui/src/PokemonesUi.js';
import '../../../pokemones-dm/src/PokemonesDm.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';

class PokemonesPage extends CellsPage {
  static get is() {
    return 'pokemones-page';
  }

  constructor() {
    super();
    this.selectedPokemon = null;
  }

  render() {
    return html`
      <div class="main-container">
        ${this.pokemonData.map(
          (pokemon) => html`
            <div class="card">
              <h3>${pokemon.nombre}</h3>
              <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
              <p>Tipos: ${pokemon.tipos}</p>
              <bbva-button-default
                text="Evoluciones"
                @click="${() => this.dispatchEvent(new CustomEvent('show-evolutions', { detail: { pokemon }, bubbles: true, composed: true }))}">
              </bbva-button-default>
            </div>
          `
        )}
      </div>
    `;
  }
  

  handleShowEvolutions(event) {
    const pokemon = event.detail.pokemon;
    const evolutions = this.getEvolutions(pokemon);
    this.goToEvolution(evolutions);
  }

  getEvolutions(pokemon) {
    return [`${pokemon.nombre} Evolución 1`, `${pokemon.nombre} Evolución 2`];
  }

  goToEvolution(evolutions) {
    this.publish('evolutions-channel', { detail: evolutions });
    this.navigate('evoluciones');
  }
}

window.customElements.define(PokemonesPage.is, PokemonesPage);
