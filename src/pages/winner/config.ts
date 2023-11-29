import { createContext, Dispatch, SetStateAction } from 'react';
import { TUser, TVote } from '../../../setting';

export enum WinnerPageType {
  landing = '/landing',
}

export enum WinnerStepType {
  Unset = 'Result',
  Creative = 'Creative',
  Strategy = 'Strategy',
  Delivery = 'Delivery',
  Experience = 'Experience',
  Executive = 'Executive & Back Office',
  Maggie = 'Maggie Cell',
  Abby = 'Abby Cell',
  Adonis = 'Adonis Cell',
  LDZ = 'LDZ Cell',
  Total = 'Total',
}

export type TWinnerState = {
  step: WinnerStepType;
  page: WinnerPageType;
  user: TUser[];
  vote: TVote[];
  status: boolean;
};
export type TWinnerContext = [TWinnerState, Dispatch<SetStateAction<TWinnerState>>];

export const WinnerState: TWinnerState = {
  step: WinnerStepType.Unset,
  page: WinnerPageType.landing,
  user: [],
  vote: [],
  status: false,
};

export const WinnerContext = createContext<TWinnerContext>([WinnerState, () => {}]);

export type Result = {
  Creative: { A: number; B: number };
  Strategy: { A: number; B: number };
  Delivery: { A: number; B: number };
  Experience: { A: number; B: number };
  'Executive & Back Office': { A: number; B: number };
  'Maggie Cell': { A: number; B: number };
  'Abby Cell': { A: number; B: number };
  'Adonis Cell': { A: number; B: number };
  'LDZ Cell': { A: number; B: number };
  Total: { A: number; B: number };
};

export type Props = {
  data: false | { result: Result; status: boolean };
  step: WinnerStepType;
};
