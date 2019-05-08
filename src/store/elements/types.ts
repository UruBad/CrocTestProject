import { IAuthor } from './authors/types'
import { IType } from './types/types'
import { ITag } from './tags/types'
import { IPreview } from './previews/types'

export interface IElement extends ApiResponse {
  id: number;
  name: string;
  desc: string;
  downloads: number;

  Author: IAuthor
  Type: IType,
  Tags: ITag[],
  Previews: IPreview[]
}

export type ApiResponse = Record<string, any>;

export enum ElementActionTypes {
  REQUEST = 'ELEMENTS_REQUEST',
  ERROR = 'ELEMENETS_ERROR',
  GET_ALL = 'ELEMENTS_GET_ALL'
}

export interface IElementState {
  readonly loading: boolean
  readonly data: IElement[]
  readonly errors?: string
}