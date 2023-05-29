import { createStore, rootReducer } from "../store/store.ts";

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof createStore>;

export type AppDispatch = AppStore["dispatch"];
