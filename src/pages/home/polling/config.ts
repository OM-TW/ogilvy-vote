import { createContext, Dispatch, SetStateAction } from 'react';

export enum PollingStepType {
  unset,
  login,
  vote,
  conform,
  finish,
}

export type TPollingState = {
  step: PollingStepType;
};

export type TPollingContext = [TPollingState, Dispatch<SetStateAction<TPollingState>>];

export const PollingState = {
  step: PollingStepType.unset,
};

export const PollingContext = createContext<TPollingContext>([PollingState, () => {}]);
