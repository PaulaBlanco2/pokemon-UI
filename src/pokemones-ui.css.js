import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
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

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 20px;
}

.title-container {
  text-align: center;
  margin-bottom: 20px;
}

.card-container {
  display: grid;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow-y: auto;
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 600px) {
  .card-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 900px) {
  .card-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1200px) {
  .card-container {
    grid-template-columns: repeat(5, 1fr);
  }
}
.card {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 15px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  font-weight: bold;
  color: #444;
  font-size: 1.1rem;
  border: 2px solid transparent;
  position: relative;
  z-index: 1;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  border-color: #ffcc00;
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
  font-size: 1.5rem;
  color: #333;
}

p {
  color: #555;
  font-size: 0.95rem;
  margin: 5px 0;
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
  background-color: #ffb300;
}

.bbva-spinner {
  height: 100%;
}
`;
