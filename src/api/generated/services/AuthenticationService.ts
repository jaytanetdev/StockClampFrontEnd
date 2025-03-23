/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthDto } from '../models/AuthDto';
import type { LoginRequestDto } from '../models/LoginRequestDto';
import type { LoginResponseDto } from '../models/LoginResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthenticationService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Register a new user
   * @param requestBody
   * @returns any User successfully registered
   * @throws ApiError
   */
  public authControllerRegisterPasswordV1(
    requestBody: AuthDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/v1/auth/register',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid input data`,
      },
    });
  }
  /**
   * User login with email/password
   * @param requestBody
   * @returns LoginResponseDto User successfully logged in
   * @throws ApiError
   */
  public authControllerLoginPasswordV1(
    requestBody: LoginRequestDto,
  ): CancelablePromise<LoginResponseDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/v1/auth/login',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `Invalid credentials`,
      },
    });
  }
  /**
   * Refresh access token
   * @returns any Tokens successfully refreshed
   * @throws ApiError
   */
  public authControllerRefreshV1(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/v1/auth/refresh',
    });
  }
  /**
   * Logout
   * @returns any Logout
   * @throws ApiError
   */
  public authControllerLogoutV1(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/api/v1/auth/logout',
    });
  }
}
