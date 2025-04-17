/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductResultDto } from './ProductResultDto';
export type GetOrderResultDto = {
  _id: string;
  status: GetOrderResultDto.status;
  cost: number;
  sellingPrice: number;
  expenses: number;
  profit: number;
  active: boolean;
  createBy: string;
  createAt: string;
  ProductId: ProductResultDto;
};
export namespace GetOrderResultDto {
  export enum status {
    OPEN = 'OPEN',
    FINISH = 'FINISH',
    CANCEL = 'CANCEL',
  }
}

