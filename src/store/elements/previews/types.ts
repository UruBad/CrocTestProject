export interface IPreview extends ApiResponse {
  id: number;
  url: string;
}

export type ApiResponse = Record<string, any>;

export enum PreviewsActionTypes {
  REQUEST = 'PREVIEWS_REQUEST',
  ERROR = 'PREVIEWS_ERROR',
  GET_ALL = 'PREVIEWS_GET_ALL'
}

export interface IPreviewsState {
  readonly data: IPreview[]
  readonly errors?: string
}