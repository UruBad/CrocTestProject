export interface ITag {
  id: number;
  name: string;
}

export interface IType {
  id: number;
  name: string;
}

export interface IPreview {
  id: number;
  url: string;
}

export interface IAuthor {
  id: number;
  username: string;
}

export interface IElement {
  id: number;
  name: string;
  desc: string;
  downloads: number;
  author: number,
  type: number,
  tags: number[],
  previews: number[]
}

interface Payload {
  authors: IAuthor[]
  types: IType[]
  tags: ITag[]
  previews: IPreview[]
}

export interface ElementsPayload extends Payload {
  elements: IElement[]
}

export interface ElementPayload extends Payload {
  element: IElement
}

export enum ElementActionTypes {
  REQUEST = 'ELEMENTS_REQUEST',
  ERROR = 'ELEMENETS_ERROR',
  GET_ALL = 'ELEMENTS_GET_ALL',
  SELECT_ELEMENT = 'ELEMENTS_SELECT',
  SELECTED = 'ELEMENTS_SELECTED',
  CLEAR_SELECTED = 'ELEMENTS_SELECT_CLEAR_SELECTED'
}

export interface IElementState {
  readonly loading: boolean
  readonly data?: ElementsPayload
  readonly selected?: ElementPayload
  readonly errors?: string
}