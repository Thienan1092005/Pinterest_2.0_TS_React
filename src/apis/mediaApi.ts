import baseApi from "./baseEndpoint";
import {
  ApiResponsePaginationType,
  ApiResponseType,
  GetCommentsByIdItemtype,
  MediaDetailResponseType,
  MediaListResponse,
  SavedImageApiResponseType,
} from "./interfaces";

export const getListImagesApi = async (
  limit?: number,
  page?: number
): Promise<MediaListResponse> => {
  try {
    const { data } = await baseApi({
      method: "GET",
      url: "media/get-media-list",
      params: {
        limit: limit || 10,
        page: page || 1,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const getImageIdBySlug = async (
//   slug: string | undefined
// ): Promise<number | undefined> => {
//   try {
//     const data = await getListImagesApi();
//     const foundImage = data.items.find((item) => item.slug === slug);
//     return foundImage?.id;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
export const getImageDetailById = async (
  id: number | undefined
): Promise<MediaDetailResponseType> => {
  try {
    const { data } = await baseApi({
      method: "GET",
      url: `media/get-media-detail/${id}`,
    });
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCommentsByIdApi = async (
  id: number,
  optionals?: { page?: number; replyTo?: number }
): Promise<
  ApiResponseType<ApiResponsePaginationType<GetCommentsByIdItemtype>>
> => {
  try {
    const { data } = await baseApi({
      method: "GET",
      url: "media/get-comments/" + id,
      params: {
        page: optionals?.page || 1,
        replyTo: optionals?.replyTo || undefined,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getSavedImageApi = async (
  token: string
): Promise<SavedImageApiResponseType[]> => {
  try {
    const { data } = await baseApi({
      method: "GET",
      url: "media/get-saved-medias",
      headers: {
        accessToken: token,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
