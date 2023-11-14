import { IType } from './type';

// mongodb collection schema setting.
export const SETTING = {
  mongodb: [
    {
      collection: 'user',
      description: 'Office member information',
      schema: {
        department: { type: IType.String, required: true },
        employeeID: { type: IType.String, required: true },
        name: { type: IType.String, required: true },
        firstName: { type: IType.String, required: true },
        lastName: { type: IType.String, required: true },
        userID: { type: IType.String, required: true },
        extension: { type: IType.String, required: true },
        email: { type: IType.String, required: true },
      },
    },
    {
      collection: 'vote',
      description: 'doing vote activity',
      schema: {
        name: { type: IType.String, required: true },
        extension: { type: IType.String, required: true },
        vote: { type: IType.String, required: true },
        timestamp: { type: IType.Date, default: 'Date.now()' },
      },
    },
  ],
  dashboard: {
    session: {
      name: 'status',
      time: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  },
};

// type for mongodb
export type TUser = {
  department: string;
  employeeID: string;
  name: string;
  firstName: string;
  lastName: string;
  userID: string;
  extension: string;
  email: string;
};

export type TVote = {
  employeeID: string;
  vote: boolean;
  timestamp: Date;
};

export type TYPE = TUser | TVote;

// type for Rest api respond
export type IRespond = {
  res: boolean;
  msg: string;
  data?: any[];
};
