import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as service from './userService';

// user register code
export const userRegister = createAsyncThunk(
  'user/register',
  async ({ values, navigate }, { rejectWithValue }) => {
    try {
      const response = await service.userRegister(values);
      setTimeout(() => {
        navigate('/');
      }, 2000);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// user login code
export const userLogin = createAsyncThunk(
  'user/login',
  async ({ values, navigate }, { rejectWithValue }) => {
    try {
      const response = await service.userLogin(values);
      setTimeout(() => {
        navigate('/');
      }, 2000);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// user login with Google
export const loginWithGoogle = createAsyncThunk(
  'user/google',
  async ({ accessToken, navigate }, { rejectWithValue }) => {
    try {
      const response = await service.signInGoogle(accessToken);
      setTimeout(() => {
        navigate('/');
      }, 2000);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: {}, // for user data
  loading: false,
  error: {},
  message: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
      state.loading = false;
      state.error = {};
      state.message = null;
    },
    clearError: (state) => {
      state.error = {};
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register code
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = {};
        state.message = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify({ ...action.payload }));
        state.message = action.payload.message;
        state.error = {};
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : { message: 'Network Error!' };
      })

      // login code
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = {};
        state.message = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify({ ...action.payload }));
        state.message = action.payload.message;
        state.error = {};
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : { message: 'Network Error!' };
      })

      // google login code
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = {};
        state.message = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify({ ...action.payload }));
        state.message = action.payload.message;
        state.error = {};
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : { message: 'Network Error!' };
      });
  },
});

export const { userLogout, clearError, clearMessage } = userSlice.actions;
export default userSlice.reducer;
