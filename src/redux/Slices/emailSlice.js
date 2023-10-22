import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getEmail = createAsyncThunk(
    'email/get',
    async (page=1) => {
      
      const data = await fetch(`https://flipkart-email-mock.vercel.app?page=${page}`);
     
      return data.json();
    }
  );
export const getEmailById = createAsyncThunk(
    'email/getById',
    async (id) => {
      console.log(id);
      const data = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`);
      return data.json();
    }
  );
const emailSlice = createSlice({
    name: 'emails',
    initialState: {
        loading:false,
        error:false,
        message:null,
        emails:[],
        filterEmails:[],
        total:0,
        email_body:{},
        favorites:JSON.parse(localStorage.getItem('Favorites')) || [],
        reads:[]
        
     },
    reducers: {
        addtoFavorite:(state,action)=>{
            console.log(action.payload);
         state.favorites.push(action.payload)
         const userFavorites = JSON.parse(localStorage.getItem('Favorites')) || [];

         const updatedEmail = { ...action.payload, fav: true };
         const emailIndex = state.emails.findIndex((email) => email.id === updatedEmail.id);
         
         if (emailIndex !== -1) {
             state.emails[emailIndex] = { ...state.emails[emailIndex], ...updatedEmail };
            }
            userFavorites.push(state.emails)
   
        //  localStorage.setItem('Favorites', JSON.stringify(state.emails))
        },
       filter:(state,action)=>{
         
       
         if(action.payload==='favorites'){

             state.filterEmails=state.emails.filter((email)=>email.fav)
         }

         else if(action.payload==='reads'){
             
             state.filterEmails=state.emails.filter((email)=>(email.read || email.fav))
             
         }
         else if(action.payload==='unread'){
             
           return state.filterEmails=state.emails.filter((email)=>!email.read)
             
         }
          
        
       },
       addtoReads:(state,action)=>{
        const updatedEmail = { ...action.payload};
         const emailIndex = state.emails.findIndex((email) => email.id === updatedEmail.id);
         
         if (emailIndex !== -1) {
             state.emails[emailIndex] = { ...state.emails[emailIndex], ...updatedEmail };
            }
       }
    },
    extraReducers: (builder) => {
        builder.addCase(getEmail.pending,(state)=>{
             state.loading=true;
        }),
        builder.addCase(getEmail.fulfilled, (state, action) => {
            state.loading=false
            state.emails=action.payload.list;
            state.total=action.payload.total;
        }),
        builder.addCase(getEmail.rejected,(state,action)=>{
           state.loading=false;
           state.error=action.payload
        }),
        builder.addCase(getEmailById.pending,(state)=>{
             state.loading=true;
        }),
        builder.addCase(getEmailById.fulfilled, (state, action) => {
            state.loading=false
            state.email_body=action.payload;
        }),
        builder.addCase(getEmailById.rejected,(state,action)=>{
           state.loading=false;
           state.error=action.payload
        })
     
          
      
    }
  });
  export const {addtoFavorite,filter,addtoReads}=emailSlice.actions
  export default emailSlice.reducer;