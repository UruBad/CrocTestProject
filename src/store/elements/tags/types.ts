export interface ITag extends ApiResponse {
  id: number;
  name: string;
}

export type ApiResponse = Record<string, any>;

export enum TagsActionTypes {
  REQUEST = 'TAGS_REQUEST',
  ERROR = 'TAGS_ERROR',
  GET_ALL = 'TAGS_GET_ALL'
}

export interface ITagsState {
  readonly data: ITag[]
  readonly errors?: string
}