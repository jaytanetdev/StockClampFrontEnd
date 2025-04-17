/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { CreateProductDto } from '../models/CreateProductDto';
import type { CreateProductResponseDto } from '../models/CreateProductResponseDto';
import type { GetProductBaseResponseDto } from '../models/GetProductBaseResponseDto';
import type { GetProductResponseDto } from '../models/GetProductResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ProductService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @param requestBody
   * @returns CreateProductResponseDto The product has been successfully created.
   * @throws ApiError
   */
  public productControllerCreateV1(
    requestBody: CreateProductDto,
  ): CancelablePromise<CreateProductResponseDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/v1/product',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param page Page number
   * @param pageSize Items per page
   * @returns GetProductResponseDto
   * @throws ApiError
   */
  public productControllerFindAllV1(
    page: number,
    pageSize: number,
  ): CancelablePromise<GetProductResponseDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/product',
      query: {
        'page': page,
        'pageSize': pageSize,
      },
    });
  }
  /**
   * @param optionId
   * @returns GetProductBaseResponseDto
   * @throws ApiError
   */
  public productControllerFindByOptionIdV1(
    optionId: string,
  ): CancelablePromise<GetProductBaseResponseDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/product/{optionId}',
      path: {
        'optionId': optionId,
      },
    });
  }
}
