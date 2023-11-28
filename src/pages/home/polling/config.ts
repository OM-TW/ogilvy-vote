import { createContext, Dispatch, SetStateAction } from 'react';

export enum PollingStepType {
  login,
  vote,
  conform,
  finish,
}

export enum PollingOptionType {
  unset,
  A,
  B,
}

export type TPollingState = {
  step: PollingStepType;
  option: PollingOptionType;
  extension: string;
};

export type TPollingContext = [TPollingState, Dispatch<SetStateAction<TPollingState>>];

export const PollingState = {
  step: PollingStepType.login,
  option: PollingOptionType.unset,
  extension: '',
};

export const PollingContext = createContext<TPollingContext>([PollingState, () => {}]);

export const PollingMessage = {
  login: {
    error: {
      title: '系統訊息',
      body: '帳號密碼錯誤',
    },
    format: {
      title: '系統訊息',
      body: '帳號密碼格式有誤',
    },
  },
  check: {
    'The extension has not yet voted.': '未投票',
    'The extension has already cast a vote.': '你已經投過票',
    'Extension not found.': '無該分機',
    'The extension check failed.': '分機檢查失敗',
  },
  vote: {
    'Vote counted successfully.': '投票成功',
    'Missing argument for parameter.': '投票遺失資料',
    'Vote failed.': '投票失敗',
    'The extension has already cast a vote.': '你已經投過票',
  },
};
