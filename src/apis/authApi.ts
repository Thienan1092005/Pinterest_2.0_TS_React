import baseApi from "./baseEndpoint";
import { ApiResponseType, UserLoginResponeType } from "./interfaces";

export const userLognApi = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<ApiResponseType<UserLoginResponeType>> => {
  try {
    const { data } = await baseApi({
      method: "POST",
      url: "auth/login",
      data: {
        username,
        password,
      },
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response?.data;
    throw error.message;
  }
};
