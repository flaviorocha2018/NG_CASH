export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidPsId = 'InvalidPsId',
}
  
  type ErrorResponseObject = { 
    message: string;
    httpStatus: number
  };
  
export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
  InvalidPsId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
};