export interface ApiResponseType<DataResponseType> {
  statusCode: number;
  message: string;
  data: DataResponseType;
  date: string;
}

export interface ApiResponsePaginationType<ItemDataType> {
  currentPage: number;
  totalPage: number;
  totalItems: number;
  items: ItemDataType[];
}
//  medialist type
export interface MediaListResponse {
  currentPage: number;
  totalPage: number;
  totalItems: number;
  items: MediaItemType[];
}

export interface MediaItemType {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
  type: string;
  user: UserType;
  image: MediaItemImageType[];
}

export interface MediaItemImageType {
  id: number;
  img_name: string;
  url: string;
  created_at: string;
}

interface UserType {
  id: number;
  username: string;
  full_name: string;
  age: number;
  avatar: string;
  user_type: TypeUserType;
  created_at: string;
  updated_at: string;
  is_ban: number;
}

interface TypeUserType {
  id: number;
  type_name: string;
}
//  user login type
export interface UserLoginResponeType {
  id: number;
  username: string;
  email: string;
  full_name: string;
  avatar: string;
  age: number;
  created_at: string;
  updated_at: string;
  is_hidden: number;
  user_type: TypeUserType;
  accessToken: string;
}
// mediadetail type get by id
export interface MediaDetailResponseType {
  id: number;
  name: string;
  slug: string;
  description: string;
  type: string;
  created_at: string;
  updated_at: string;
  image: MediaDetailImagetype[];
  user: MediaDetailUserType;
}

export interface MediaDetailUserType {
  id: number;
  username: string;
  full_name: string;
  age: number;
  avatar: string;
  user_type: MediaDetailUserTypetype;
  created_at: string;
  updated_at: string;
  is_ban: number;
}

interface MediaDetailUserTypetype {
  id: number;
  type_name: string;
}

export interface MediaDetailImagetype {
  id: number;
  img_name: string;
  url: string;
  created_at: string;
}

export interface GetCommentsByIdItemtype {
  id: number;
  content: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  level: number;
  reply_to: null | number;
  media_id: number;
  user: UserType;
}

export interface SavedImageApiResponseType {
  id: number;
  created_at: string;
  media: ImageResponseType;
}

interface ImageResponseType {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
  type: string;
  user: User;
  image: Image[];
}

interface Image {
  id: number;
  img_name: string;
  url: string;
  created_at: string;
}

export interface User {
  id: number;
  username: string;
  full_name: string;
  age: number;
  avatar: string;
  email: string;
  password: string;
  user_type: Usertype;
  created_at: string;
  updated_at: string;
  is_ban: number;
}

interface Usertype {
  id: number;
  type_name: string;
}

export interface UserInfomationType {
  id: number;
  username: string;
  email: string;
  full_name: string;
  avatar: null;
  age: number;
  created_at: string;
  updated_at: string;
  is_hidden: number;
  user_type: Usertype;
}
