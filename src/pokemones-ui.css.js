import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
@charset "UTF-8";
:host {
  display: block;
  box-sizing: border-box;
}

:host([hidden]), [hidden] {
  display: none !important;
}

*, *::before, *::after {
  box-sizing: inherit;
}

:host {
  display: block;
  font-family: "Arial", sans-serif;
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
  overflow: hidden;
  font-weight: bold;
  color: #444;
  font-size: 1.1rem;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  border-color: #ffcc00; /* Color dorado al hacer hover */
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 204, 0, 0.1);
  border-radius: 15px;
  z-index: 0;
  transition: opacity 0.3s;
  opacity: 0;
}

.card:hover::before {
  opacity: 1;
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
