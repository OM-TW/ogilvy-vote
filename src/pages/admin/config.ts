import { createContext, Dispatch, SetStateAction } from 'react';

export const AdminPage = {};

export enum AdminStepType {
  unset = 0,
  fadeIn = 1,
}
export type TAdminState = { step: AdminStepType };
export type TAdminContext = [TAdminState, Dispatch<SetStateAction<TAdminState>>];

export const AdminState = { step: AdminStepType.unset };
export const AdminContext = createContext<TAdminContext>([AdminState, () => {}]);
