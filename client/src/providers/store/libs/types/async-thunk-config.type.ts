import { AppDispatch } from './app-dispatch.type';
import { AppReducers } from './app-reducers.type';
import { ExtraArgument } from './extra-argument.type';

type AsyncThunkConfig = {
  state: AppReducers;
  dispatch: AppDispatch;
  extra: ExtraArgument;
};

export type { AsyncThunkConfig };
