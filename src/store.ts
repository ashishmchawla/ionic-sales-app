import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./redux/userSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = {
  reducer: {
    user: userReducer,
  },
};

let rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
let persistor = persistStore(store);

export { store, persistor };
