import baseApi from "./baseEndpoint";
import {
  ApiResponsePaginationType,
  ApiResponseType,
  GetCommentsByIdItemtype,
  MediaDetailResponseType,
  MediaItemType,
  MediaListResponse,
  SavedImageApiResponseType,
} from "./interfaces";

export const getListImagesApi = async (
  limit?: number,
  page?: number,
  id?: number,
  keyword?: string
): Promise<MediaListResponse> => {
  try {
    const idPath = id ? "/" + id : "";
    const { data } = await baseApi({
      method: "GET",
      url: "media/get-media-list" + idPath,
      params: {
        limit: limit || 30,
        page: page || 1,
        keyword: keyword || "",
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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
  optionals?: { page?: number; replyTo?: number; limit?: number }
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
        limit: optionals?.limit || 10,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getSavedImageApi = async (
  token?: string,
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
  id: number,
  content: string,
  replyToCommentId?: number
) => {
  try {
    await baseApi({
      method: "POST",
      url: "media/create-comment/" + id,
      headers: {},
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
  accessToken?: string
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
export const RemovePost = async (id: number) => {
  try {
    await baseApi({
      method: "DELETE",
      url: "/media/remove-media/" + id,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createMediaUploadApi = async (
  formData: FormData
): Promise<ApiResponseType<MediaItemType>> => {
  try {
    const { data } = await baseApi({
      url: "media/upload",
      method: "POST",
      data: formData,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getListMediaSavedByUserIdApi = async (
  id: number
): Promise<ApiResponseType<SavedImageApiResponseType[]>> => {
  try {
    const { data } = await baseApi({
      method: "GET",
      url: "media/get-saved-medias-user/" + id,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const AdminUpdatePinApi = async (
  {
    name,
    slug,
    description,
    isHidden,
  }: {
    name: string;
    slug: string;
    description: string;
    isHidden: number;
  },
  id: number
) => {
  try {
    await baseApi({
      method: "PUT",
      url: "media/update-media-admin/" + id,
      data: {
        name: name || "",
        slug: slug || "",
        description: description || "",
        isHidden: isHidden || "",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const adminDeleteCommentApi = async (id: number) => {
  try {
    await baseApi({
      method: "DELETE",
      url: "media/delete-comment/" + id,
    });
  } catch (error) {
    console.log(error);
  }
};
