/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateModelDto } from '../models/CreateModelDto';
import type { GetModelResponseDto } from '../models/GetModelResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ModelService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public modelControllerCreateV1(
    requestBody: CreateModelDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/v1/model',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param materialId
   * @returns GetModelResponseDto
   * @throws ApiError
   */
  public modelControllerFindByMaterialIdV1(
    materialId: string,
  ): CancelablePromise<GetModelResponseDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/model/{materialId}',
      path: {
        'materialId': materialId,
      },
    });
  }
}
