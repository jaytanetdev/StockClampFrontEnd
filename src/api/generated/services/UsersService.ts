/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { CreatUserResponseDto } from '../models/CreatUserResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UsersService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Register User
   * @param requestBody
   * @returns CreatUserResponseDto User Created Successfully
   * @throws ApiError
   */
  public usersControllerCreateV1(
    requestBody: CreateUserDto,
  ): CancelablePromise<CreatUserResponseDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/v1/users',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid input data`,
      },
    });
  }
  /**
   * Get all users with pagination
   * @param page
   * @param limit
   * @returns any
   * @throws ApiError
   */
  public usersControllerFindAllV1(
    page: number,
    limit: number,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/users',
      query: {
        'page': page,
        'limit': limit,
      },
    });
  }
  /**
   * Get User by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public usersControllerFindOneV1(
    id: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/users/{id}',
      path: {
        'id': id,
      },
    });
  }
}
