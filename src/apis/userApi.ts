import baseApi from "./baseEndpoint";
import { ApiResponseType, UserInfomationType } from "./interfaces";

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
