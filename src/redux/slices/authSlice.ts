import { ApiResponseType, UserLoginResponeType } from "@/apis/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUserRegister, userLognApi, userRegisterApi } from "@/apis/authApi";
import toast from "react-hot-toast";

interface AuthState {
  isLogin: boolean;
  isLoading: boolean;
  currentUser: UserLoginResponeType | null;
}

const getCurrentUserLocal = JSON.parse(
  localStorage.getItem("currentUser") || "null"
);

const initialState: AuthState = {
  isLogin: !!getCurrentUserLocal,
  isLoading: false,
  currentUser: getCurrentUserLocal || null,
};

//Tạo hàm handleLogin với ReDux thunk
export const handleLoginThunk = createAsyncThunk(
  "authSlice/login",
  async (values: {
    username: string;
    password: string;
  }): Promise<ApiResponseType<UserLoginResponeType>> => {
    try {
      const data = await userLognApi(values);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const handleRegisterThunk = createAsyncThunk(
  "authSlice/register",
  async (value: IUserRegister) => {
    try {
      const { data } = await userRegisterApi(value);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //chỗ này dễ vl :33//
    logout: (state) => {
      localStorage.removeItem("currentUser");
      toast.success("👋 Bye! Logout success");
      setTimeout(() => location.reload(), 500);
      return { ...state, isLogin: false, currentUser: null };
    },
    setCurrentUser: (state, { payload }: { payload: UserLoginResponeType }) => {
      localStorage.setItem("currentUser", JSON.stringify(payload));
      return { ...state, isLogin: true, currentUser: payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(handleLoginThunk.fulfilled, (state, action) => {
      localStorage.setItem("currentUser", JSON.stringify(action.payload.data));
      console.log(action.payload.data);
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        currentUser: action.payload.data,
      };
    });
    builder.addCase(handleLoginThunk.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(handleLoginThunk.rejected, (state) => {
      return { ...state, isLoading: false };
    });
    builder.addCase(handleRegisterThunk.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(handleRegisterThunk.rejected, (state) => {
      return { ...state, isLoading: false };
    });
    builder.addCase(handleRegisterThunk.fulfilled, (state, action) => {
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        currentUser: action.payload,
      };
    });
  },
});

export const { logout, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth;
export type { AuthState };
