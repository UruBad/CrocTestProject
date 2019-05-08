export interface IAuthor extends ApiResponse {
  id: number;
  username: string;
}

export type ApiResponse = Record<string, any>;

export enum AuthorsActionTypes {
  REQUEST = 'AUTHOR_REQUEST',
  ERROR = 'AUTHOR_ERROR',
  GET_ALL = 'AUTHOR_GET_ALL'
}

export interface IAuthorsState {
  readonly data: IAuthor[]
  readonly errors?: string
}