import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import storieService from "../services/storieService";




const initialState = {
    storie: [],
    stories: [],
    storiesOnly: [],
    like: [],
    storieUser: [],
    error: false,
    sucess: false,
    loading: false,
    message: false
}



// Publish user Storie
export const publishStorie = createAsyncThunk(
    "storie/publish",
    async(storie, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token;

        const data = await storieService.publishStorie(storie, token)

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;

    }
)


//Delete a photo
export const deleteStorie = createAsyncThunk(
    "storie/delete",
    async (id, thunkAPI) => {

        console.log("Slice");

        const token = thunkAPI.getState().auth.user.token

        const data = await storieService.deleteStorie(id, token)

        

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
        
    }
)


//Get user Storie
export const getUserStories = createAsyncThunk(
    "storie/userstories",
    async (id, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token;

        const data = await storieService.getUserStories(id, token);

        return data;

    }
)



//Get all stories
export const getAllStories = createAsyncThunk(
    "storie/getall",
    async (_, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token;

        const data = await storieService.getAllStories(token);

        

        return data;
    }
)


//Like a photo
export const likeStorie = createAsyncThunk(
    "storie/like",
    async (id, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token;

        const data = await storieService.likeStorie(id, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data; 
    }
)



export const storieSlice = createSlice({
    name: "storie",
    initialState,
    reducers: {
        resetMessageStorie: (state) => {
            state.loading = false;
            state.error = false;
            state.sucess = false;
            state.message = false;      
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(publishStorie.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(publishStorie.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.storie = action.payload;

            state.message = "Storie publicado com sucesso!"
        })
        .addCase(publishStorie.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.storie = {};
        })
        .addCase(getUserStories.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getUserStories.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.storieUser = action.payload;
            
            action.payload.map((storie) => (
                state.storiesOnly.unshift(storie.image)
            ));
        
        })
        .addCase(deleteStorie.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(deleteStorie.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.message = action.payload.message;

        })
        .addCase(getAllStories.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getAllStories.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.stories = action.payload;  
        })
        .addCase(likeStorie.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.like.push(action.payload.userId);

            state.message = action.payload.message;
        })
        .addCase(likeStorie.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    }
});


export const { resetMessageStorie } = storieSlice.actions;
export default storieSlice.reducer;