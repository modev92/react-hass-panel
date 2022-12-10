/// <reference types="react-scripts" />

declare namespace JSX {
  export interface MyPropType {
    icon?: string;
    state?: string;
  }

  interface IntrinsicElements {
    'ha-state-icon': MyPropType;
  }
}
