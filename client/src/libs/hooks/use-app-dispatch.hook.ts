import { UseDispatch, useDispatch } from 'react-redux';

import { AppDispatch } from '#/providers/store';

const useAppDispatch: UseDispatch<AppDispatch> = useDispatch;

export { useAppDispatch };
