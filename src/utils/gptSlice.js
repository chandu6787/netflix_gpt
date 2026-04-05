import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice(
    {
        name:'gpt',
        initialState:{
            showGPTSearch:false,
            gptMovies:null,
            movieNames:null
        },
        reducers:{
            toggleGPTSearchView:(state)=>
            {
                state.showGPTSearch=!state.showGPTSearch
            },
            addGptMovieResult:(state,action)=>
            {
             const {gptMovies,TMDBMovies}=action.payload;
             state.gptMovies=TMDBMovies;
             state.movieNames=gptMovies;
            }
        }
    }
)
export const {toggleGPTSearchView,addGptMovieResult}=gptSlice.actions;
export default gptSlice.reducer;