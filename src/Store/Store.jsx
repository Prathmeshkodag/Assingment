import { configureStore } from "@reduxjs/toolkit";  
import UserTableReducer from '../Redux/UsertableSLice';

// Create a Redux store and combine all reducers into one.
// This allows global state access in the React app using the useSelector hook.
export const store = configureStore({
    reducer: {
        // Register the UserTable slice reducer under the key 'UserTable'
        UserTable: UserTableReducer,
    }
});
