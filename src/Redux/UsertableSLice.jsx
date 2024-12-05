import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// use of createAsyncThunkfunction for RestFul API calling in redux toolkit method 
//  and export veraible and use with useDispatch hook

export const FetchUserTable = createAsyncThunk(
    "UserTable/FetchUserTable",
    async (API, { rejectWithValue }) => {
        // API is in parameter in Async function it replace with API Path
        // and  rejectWithValue is return error message on UI 
        // use fetch inbuild method for API calling
        // try and catch block for error handling 

        try {
        
            const response = await fetch(API,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
              const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// below async thunck function for Add New User action
export const addNewUser = createAsyncThunk(
    "UserTable/addNewUser",
    async (newUser, { getState, rejectWithValue }) => {
      try {
       
        const { UserTable } = getState();
        return [...UserTable.userTable, newUser];
        
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

// Slice to manage user table state
// use builder method for extraReducers with three step pending,fulfilled,rejected
export const UserTableSlice = createSlice({
    name: "UserTable",
    initialState: {
        userTable: [],
        loading: false,
        error: null,
    },
   
    extraReducers: (builder) => {
        builder
            .addCase(FetchUserTable.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(FetchUserTable.fulfilled, (state, action) => {
                state.loading = false;
                state.userTable = action.payload;
            })
            .addCase(FetchUserTable.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.userTable = action.payload;
              })
    },
});

export default UserTableSlice.reducer;
