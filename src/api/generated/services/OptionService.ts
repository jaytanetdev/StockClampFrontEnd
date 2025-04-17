/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOptionDto } from '../models/CreateOptionDto';
import type { GetOptionResponseDto } from '../models/GetOptionResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class OptionService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public optionControllerCreateV1(
    requestBody: CreateOptionDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/v1/option',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns GetOptionResponseDto
   * @throws ApiError
   */
  public optionControllerFindAllV1(): CancelablePromise<GetOptionResponseDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/option',
    });
  }
  /**
   * @param modalId
   * @returns GetOptionResponseDto
   * @throws ApiError
   */
  public optionControllerFindByModalIdV1(
    modalId: string,
  ): CancelablePromise<GetOptionResponseDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/option/{modalId}',
      path: {
        'modalId': modalId,
      },
    });
  }
}
