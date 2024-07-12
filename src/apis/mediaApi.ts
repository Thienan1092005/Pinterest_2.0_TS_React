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
        limit: limit || 30,
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

export const getCommentsByImageIdApi = async (
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
  token: string,
  id?: number
): Promise<SavedImageApiResponseType[]> => {
  try {
    const { data } = await baseApi({
      method: "GET",
      url: "media/get-saved-medias",
      headers: {
        accessToken: token,
      },
      params: {
        id,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const savedImageApi = async (
  id: number | undefined,
  token: string | undefined
) => {
  try {
    await baseApi({
      method: "POST",
      url: "media/save-media/" + id,
      headers: {
        accessToken: token,
      },
    });
    console.log("saved");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createCommentApi = async (
  token: string,
  id: number,
  content: string,
  replyToCommentId?: number
) => {
  try {
    await baseApi({
      method: "POST",
      url: "media/create-comment/" + id,
      headers: {
        accessToken: token,
      },
      data: {
        content,
        replyToCommentId,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const handleDeleteCommentApi = async (
  CommentId: number,
  accessToken: string
) => {
  try {
    await baseApi({
      method: "DELETE",
      url: "media/remove-comment/" + CommentId,
      headers: {
        accessToken,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
