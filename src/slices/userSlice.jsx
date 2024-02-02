import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

import userServices from "../services/userService";



const initialState = {
    user: {},
    users: [],
    userStorie: {},
    error: false,
    sucess: false,
    loading: false,
    message: false
}



//Get user detaills
export const profile = createAsyncThunk(
    "user/profile",
    async (user, thunkAPI) => {

        
        
        const token = thunkAPI.getState().auth.user.token;

        const data = await userServices.profile(user, token);

        return data;
    }
)


//Update user details
export const updateProfile = createAsyncThunk(
    "user/update",
    async(user, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token

        const data = await userServices.updateProfile(user, token)

            //check for errors
        if(data.error) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
)


//Get user details
export const getUserDetails = createAsyncThunk(
    "user/get",
    async (id, thunkAPI) => {

        const data = await userServices.getUserDetails(id);

        return data;
    }
)



//Get all users
export const getAllUsers = createAsyncThunk(
    "user/getall",
    async (_, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token

        const data = await userServices.getAllUsers(token)

            //check for errors
        if(data.error) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;

    }
)


//Insert a Storie
export const insertStorie = createAsyncThunk(
    "user/isertStorie",
    async (user, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token

        const data = await userServices.insertStorie(user, token)

        //check for errors
        if(data.error) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
)




export const removeInsertStorie = createAsyncThunk(
    "user/removeInsertStorie",
    async (id, thunkAPI) => {

        console.log("Slice: " + id)

        const token = thunkAPI.getState().auth.user.token

        const data = await userServices.removeInsertStorie(id, token)

        //check for errors
        if(data.error) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
)





export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessageUser: (state) => {
            state.loading = false;
            state.error = false;
            state.sucess = false;
            state.message = false;
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(profile.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(profile.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.user = action.payload;
            
        })
        .addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.user = action.payload;
            state.message = "Usuário atualizado com sucesso!"
        })
        .addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = {};
        })
        .addCase(getUserDetails.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getUserDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.user = action.payload;
            
        })
        .addCase(getAllUsers.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.users = action.payload;
            
        }).addCase(insertStorie.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.userStorie = action.payload;

            state.message = action.payload.message;
        
        })
        .addCase(removeInsertStorie.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(removeInsertStorie.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.user.stories = action.payload;
            state.message = action.payload.message;
        });
        
    }
});



export const {resetMessageUser} = userSlice.actions;
export default userSlice.reducer;