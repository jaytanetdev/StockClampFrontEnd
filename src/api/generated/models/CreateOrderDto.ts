/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItemDto } from './OrderItemDto';
export type CreateOrderDto = {
  platform: string;
  tax: number;
  expenses: number;
  total: number;
  totalExpenses: number;
  profitNet: number;
  status: CreateOrderDto.status;
  orderList: Array<OrderItemDto>;
  active: boolean;
};
export namespace CreateOrderDto {
  export enum status {
    OPEN = 'OPEN',
    FINISH = 'FINISH',
    CANCEL = 'CANCEL',
  }
}

