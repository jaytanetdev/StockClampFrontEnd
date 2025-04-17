/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectId } from './ObjectId';
export type CreateOrderDto = {
  productId: ObjectId;
  amount: number;
  status: CreateOrderDto.status;
  cost: number;
  sellingPrice: number;
  expenses: number;
  profit: number;
};
export namespace CreateOrderDto {
  export enum status {
    OPEN = 'OPEN',
    FINISH = 'FINISH',
    CANCEL = 'CANCEL',
  }
}

