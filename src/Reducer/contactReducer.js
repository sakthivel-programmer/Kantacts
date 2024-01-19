import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// initial data that are goig to be stored in appstore
const initialState = {

  contacts:[]

};

// function that allows us to make api calls
export const addContactAsync = createAsyncThunk(
  'contact/fetchContact',
  async (arg,ThunkAPI) => {

    // fetching fake contacts from api as promise
    await fetch("https://jsonplaceholder.typicode.com/users")
    .then( ( res ) => res.json() )
    .then( parseData => {

      // invoking reducer action from here
      ThunkAPI.dispatch(actions.addContact(parseData))

    })

  }

);

// DELETE request using fetch to delete contact and its a dummy call wont make any change
export const deleteContactAsync = createAsyncThunk(
  'contact/deleteContact',
  async () => {

    await fetch("https://jsonplaceholder.typicode.com/users",{

      method:"DELETE",

      headers:{

        "Content-type":"application/json"

      },

      body:JSON.stringify({

        message:"Dummy deleted"

      })

    })

  }
  
);

// PUT request using fetch to update data and its a dummy call wont make any change
export const updateContactAsync = createAsyncThunk(
  'contact/updateContact',
  async () => {

    await fetch("https://jsonplaceholder.typicode.com/users",{

      method:"PUT",

      headers:{

        "Content-type":"application/json"

      },

      body:{

        message:"Dummy delete"

      }

    })

  }

);

// slice function to manage reducer and actions
export const contactSlice = createSlice({

  name: 'counter',

  initialState,

  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // action that updates contacts array
    addContact: (state,action) => {

      state.contacts=[...action.payload]

    }

  },

});


export const actions = contactSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const contactSelector = (state) => state.contactReducer.contacts;

export default contactSlice.reducer;
