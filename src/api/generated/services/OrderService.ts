/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrderDto } from '../models/CreateOrderDto';
import type { GetOrderResDto } from '../models/GetOrderResDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class OrderService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public orderControllerCreateV1(
    requestBody: CreateOrderDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/v1/order',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param page Page number
   * @param pageSize Items per page
   * @returns GetOrderResDto
   * @throws ApiError
   */
  public orderControllerFindAllV1(
    page: number,
    pageSize: number,
  ): CancelablePromise<GetOrderResDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/order',
      query: {
        'page': page,
        'pageSize': pageSize,
      },
    });
  }
}
