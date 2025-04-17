/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { GetUserResponseDto } from '../models/GetUserResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UserService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public userControllerRegisterV1(
    requestBody: CreateUserDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/v1/users/register',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns GetUserResponseDto
   * @throws ApiError
   */
  public userControllerGetProfileV1(): CancelablePromise<GetUserResponseDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/users/profile',
    });
  }
}
