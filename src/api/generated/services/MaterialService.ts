/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMaterialDto } from '../models/CreateMaterialDto';
import type { GetMaterialResponseDto } from '../models/GetMaterialResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MaterialService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public materialControllerCreateV1(
    requestBody: CreateMaterialDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/v1/material',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns GetMaterialResponseDto
   * @throws ApiError
   */
  public materialControllerFindAllV1(): CancelablePromise<GetMaterialResponseDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/material',
    });
  }
}
