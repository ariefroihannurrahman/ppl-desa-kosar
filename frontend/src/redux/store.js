import { configureStore } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';

import reducer from './reducers/root';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer,
  middleware: [thunk],
});
