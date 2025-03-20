import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { UserApi } from './Features/Auth/AuthApi'
import userSlice from '../Redux/Features/Auth/UserSlice'
export const store = configureStore({
    reducer: {

        [UserApi.reducerPath]: UserApi.reducer,
        user:userSlice
    },

    middleware: (getDefaultMiddelware) => getDefaultMiddelware({
        serializableCheck: {
        }
    }).concat(UserApi.middleware)
})
setupListeners(store.dispatch)