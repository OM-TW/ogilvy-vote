import { createContext, Dispatch, SetStateAction } from 'react';

export const height = 0;

export enum HomeStepType {
  unset,
  fadeIn,
  patternIn,
  topicIn,
}
export type THomeState = { step: HomeStepType; height: number };
export type THomeContext = [THomeState, Dispatch<SetStateAction<THomeState>>];

export const HomeState = { step: HomeStepType.unset, height };
export const HomeContext = createContext<THomeContext>([HomeState, () => {}]);
