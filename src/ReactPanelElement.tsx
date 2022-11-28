// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleSheetManager, createGlobalStyle } from 'styled-components';
import Font from './style/Font';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button, input[type="submit"], input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    width: 100%;
  }
`;

export default (ReactPanel) =>
  class extends HTMLElement {
    constructor() {
      super().attachShadow({ mode: 'open' });
      this._renderScheduled = null;

      const props = {};
      ['hass', 'narrow', 'route', 'panel'].forEach((prop) => {
        const key = `_${prop}`;
        this[key] = null;
        props[prop] = {
          set(value) {
            this[key] = value;
            this._render();
          },
        };
      });
      Object.defineProperties(this, props);

      this._root = ReactDOM.createRoot(this.shadowRoot as HTMLElement);
      if (window.location.search.includes('kiosk')) {
        this._hideSidebar();
      }

      this._renderFont();
    }

    _hideSidebar() {
      const newStyle = document.createElement('style');
      newStyle.innerHTML = `app-drawer-layout:not([narrow]){ left: calc(var(--app-drawer-width) * -1);} app-drawer {display: none;} `;

      const appDrawer = window.document.body
        .querySelector('home-assistant')
        ?.shadowRoot?.querySelector('home-assistant-main')
        ?.shadowRoot.querySelector('app-drawer');

      appDrawer?.removeAttribute('opened');
      appDrawer?.removeAttribute('persistent');
      appDrawer?.setAttribute('swipe-open');
      appDrawer.append(newStyle);
    }

    disconnectedCallback() {
      this._root.unmount();
    }

    _renderFont() {
      const newStyle = document.createElement('style');
      newStyle.innerHTML = Font;
      window.document.head.append(newStyle);
    }

    _render() {
      if (this._renderScheduled !== null) return;

      this._renderScheduled = Promise.resolve().then(() => {
        this._renderScheduled = null;

        // console.log('t', this._hass);

        this._root.render(
          <StyleSheetManager target={this.shadowRoot}>
            <>
              <GlobalStyle />
              <ReactPanel hass={this._hass} />
            </>
          </StyleSheetManager>
        );
      });
    }
  };
