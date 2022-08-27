// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleSheetManager } from 'styled-components';

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
    }

    disconnectedCallback() {
      this._root.unmount();
    }

    _render() {
      if (this._renderScheduled !== null) return;

      this._renderScheduled = Promise.resolve().then(() => {
        this._renderScheduled = null;

        this._root.render(
          <StyleSheetManager target={this.shadowRoot}>
            <ReactPanel hass={this._hass} />
          </StyleSheetManager>
        );
      });
    }
  };
