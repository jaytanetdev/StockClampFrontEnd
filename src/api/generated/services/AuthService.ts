/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any
   * @throws ApiError
   */
  public authControllerLoginV1(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/auth/login',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public authControllerGoogleAuthV1(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/auth/google',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public authControllerGoogleAuthRedirectV1(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/auth/google/callback',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public authControllerLogoutV1(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/api/v1/auth/logout',
    });
  }
}
