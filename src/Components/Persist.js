import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  conversations: [],
  messages: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONVERSATION':
      return {
        ...state,
        conversations: [...state.conversations, action.payload]
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.conversationId]: [...state.messages[action.payload.conversationId], action.payload.message]
        }
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
