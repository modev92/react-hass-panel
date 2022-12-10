import React from 'react';

type CallServiceData = {
  entity_id: string;
  [key: string]: any;
};

type StateOptionsInternal<T> = {
  state: string;
  last_changed: string;
  attributes: T;
};
export type StateOptions<T> = {
  state: string;
  lastChanged: string;
  friendlyName: string;
  attributes: T;
};

export type EntitiesOptions = {
  icon?: string;
};

export interface IHassContext<Attributes = object> {
  states: Record<string, StateOptionsInternal<Attributes>>;
  entities: Record<string, EntitiesOptions>;
  callService: (domain: string, service: string, data: CallServiceData) => void;
}

const defaultState = {
  states: {},
  entities: {},
  callService: () => null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HassContext = React.createContext<any>(defaultState);

export function useHass<AttributesType = object>(): IHassContext<AttributesType> {
  return React.useContext<IHassContext<AttributesType>>(HassContext);
}
