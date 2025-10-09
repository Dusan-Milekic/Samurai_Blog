import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
const API_BASE_URL = import.meta.env.VITE_API_URL 
/* ---------- Tipovi ---------- */
export interface IAccount {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user: IAccount;
  token?: string;
}

export interface AccountState {
  currentUser: IAccount | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  token: string | null;
}

/* ---------- Thunk: Login with email and password ---------- */
export const login = createAsyncThunk<IAccount, LoginCredentials>(
  "account/login",
  async ({ email, password }) => {
    const res = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || `Login failed: ${res.status}`);
    }
    
    const data = await res.json();
    return data.user as IAccount; // Vrati samo user deo
  }
);
/* ---------- Thunk: Fetch current user (if token exists) ---------- */
export const fetchCurrentUser = createAsyncThunk<IAccount>(
  "account/fetchCurrentUser",
  async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const res = await fetch(`${API_BASE_URL}/auth/me/`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.status}`);
    }
    
    return (await res.json()) as IAccount;
  }
);

const initialState: AccountState = {
  currentUser: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  token: localStorage.getItem('authToken'),
};

/* ---------- Slice ---------- */
export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('authToken');
    },
  },
 // extraReducers ostaju isti kao što imate
extraReducers: (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action: PayloadAction<IAccount>) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Login failed";
      state.isAuthenticated = false;
      state.currentUser = null;
    });
  },
});

/* ---------- Actions ---------- */
export const { clearError, logout } = accountSlice.actions;

/* ---------- Selectors ---------- */
export const selectCurrentUser = (state: RootState) => state.account.currentUser;
export const selectIsAuthenticated = (state: RootState) => state.account.isAuthenticated;
export const selectAccountLoading = (state: RootState) => state.account.loading;
export const selectAccountError = (state: RootState) => state.account.error;
export const selectAuthToken = (state: RootState) => state.account.token;

/* ---------- Export ---------- */
export default accountSlice.reducer;