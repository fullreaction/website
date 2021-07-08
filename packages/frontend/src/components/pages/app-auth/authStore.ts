import { createStore } from '@stencil/store';

// Please tell me if this is a bad idea
const authStore = createStore({
  isError: false,
  errorText: '',
}).state;

export default authStore;
