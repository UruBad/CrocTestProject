export interface IType extends ApiResponse {
  id: number;
  name: string;
}

export type ApiResponse = Record<string, any>;


export enum TypesActionTypes {
  REQUEST = 'TYPES_REQUEST',
  ERROR = 'TYPES_ERROR',
  GET_ALL = 'TYPES_GET_ALL'
}

export interface ITypesState {
  readonly data: IType[]
  readonly errors?: string
}