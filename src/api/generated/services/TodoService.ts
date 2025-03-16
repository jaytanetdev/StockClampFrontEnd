/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTodoRequestDto } from '../models/CreateTodoRequestDto';
import type { CreateTodoResponseDto } from '../models/CreateTodoResponseDto';
import type { UpdateTodoDto } from '../models/UpdateTodoDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TodoService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * add todolist
   * @param requestBody
   * @returns CreateTodoResponseDto Todo Created Successfully
   * @throws ApiError
   */
  public todoControllerCreateV1(
    requestBody: CreateTodoRequestDto,
  ): CancelablePromise<CreateTodoResponseDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/v1/todo',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Get all todos with pagination
   * @param page
   * @param limit
   * @returns any
   * @throws ApiError
   */
  public todoControllerFindAllV1(
    page?: number,
    limit?: number,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/todo',
      query: {
        'page': page,
        'limit': limit,
      },
    });
  }
  /**
   * Get  todos by ID
   * @param id
   * @returns any
   * @throws ApiError
   */
  public todoControllerFindOneV1(
    id: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/todo/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public todoControllerUpdateV1(
    id: string,
    requestBody: UpdateTodoDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/api/v1/todo/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id
   * @returns any
   * @throws ApiError
   */
  public todoControllerRemoveV1(
    id: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/api/v1/todo/{id}',
      path: {
        'id': id,
      },
    });
  }
}
