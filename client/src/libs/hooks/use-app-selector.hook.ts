import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { AppReducers } from '#/providers/store';

const useAppSelector: TypedUseSelectorHook<AppReducers> = useSelector;

export { useAppSelector };
