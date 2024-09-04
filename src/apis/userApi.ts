import baseApi from "./baseEndpoint";
import {
  ApiResponsePaginationType,
  ApiResponseType,
  User,
  UserInfomationType,
  UserLoginResponeType,
} from "./interfaces";

export const getUserInfoApi = async (
  id: number
): Promise<ApiResponseType<UserInfomationType>> => {
  try {
    const { data } = await baseApi({
      method: "GET",
      url: "user/infomation/" + id,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const userUpdateInfoApi = async (userData: {
  username: string;
  password: string;
  email: string;
  fullName: string;
  age: number | string;
}): Promise<ApiResponseType<UserLoginResponeType>> => {
  try {
    const { data } = await baseApi({
      method: "PUT",
      url: "user/update-info",
      data: {
        username: userData.username || "",
        password: userData.password || "",
        fullName: userData.fullName || "",
        email: userData.email || "",
        age: userData.age || "",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getListUserApi = async (
  keyword?: string
): Promise<ApiResponseType<ApiResponsePaginationType<User>>> => {
  try {
    const { data } = await baseApi({
      method: "GET",
      url: "user/list-users",
      params: {
        keyword: keyword || "",
        limit: 99999999,
      },
    });
    console.log(data.items);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const AdminEditUserApi = async (
  id: number,
  newUserInfo: {
    username: string;
    password?: string;
    email: string;
    fullName: string;
    age: number;
    type: number;
    is_ban: number;
  }
) => {
  try {
    await baseApi({
      method: "PUT",
      url: "user/update-info/" + id,
      data: { ...newUserInfo, password: "" },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
