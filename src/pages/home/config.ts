import { createContext, Dispatch, SetStateAction } from 'react';

export const height = 0;
export enum HomePageType {
  teaser = 'teaser',
  polling = 'polling',
  billing = 'billing',
}

export enum HomeStepType {
  unset,
  fadeIn,
  patternIn,
  topicIn,
}
export type THomeState = { step: HomeStepType; height: number; page: HomePageType };
export type THomeContext = [THomeState, Dispatch<SetStateAction<THomeState>>];

export const HomeState = { step: HomeStepType.unset, height, page: HomePageType.teaser };
export const HomeContext = createContext<THomeContext>([HomeState, () => {}]);
