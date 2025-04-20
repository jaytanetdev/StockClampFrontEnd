import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { v4 as uuid } from "uuid";

import { ApiRequestOptions } from "./generated/core/ApiRequestOptions";
import { request as __request } from "./generated/core/request";
import {
  CORRElATION_HEADER_NAME,
  INIT_ID_HEADER_NAME,
  LOCALE,
  TIMEZONE,
} from "@/constants/request-header.constant";
import { ApiClient, BaseHttpRequest, CancelablePromise, OpenAPIConfig } from "./generated/index";
// Define the structure of a retry queue item
interface RetryQueueItem {
  resolve: (value: AxiosResponse) => void;
  reject: (error?: unknown) => void;
  config: InternalAxiosRequestConfig | undefined;
}


export class CustomAxios extends BaseHttpRequest {
  private readonly initId = uuid();
  private readonly axiosPublicInstance = axios.create({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",

      [INIT_ID_HEADER_NAME]: this.initId,
    },
  });
  private readonly axiosAuthorizedInstance = axios.create({
    withCredentials: true, 
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      [INIT_ID_HEADER_NAME]: this.initId,
    },
    maxContentLength: 300000,
  });
  private refreshAndRetryQueue: RetryQueueItem[] = [];
  private isRefreshing = false;

  constructor(config: OpenAPIConfig) {
    super(config);
    this.axiosPublicInstance.interceptors.request.use(
      this._requestInterceptor()
    );
    this.axiosPublicInstance.interceptors.response.use(
      this._responseInterceptor(),
      this._publicInstanceErrorHandler()
    );

    this.axiosAuthorizedInstance.interceptors.request.use(
      this._requestInterceptor()
    );
    this.axiosAuthorizedInstance.interceptors.response.use(
      this._responseInterceptor(),
      this._authorizedInstanceErrorHandler(this)
    );
  }

  private _requestInterceptor() {
    return function (config: InternalAxiosRequestConfig) {
      config.headers[CORRElATION_HEADER_NAME] = uuid();
      config.headers[TIMEZONE] =
        Intl.DateTimeFormat().resolvedOptions().timeZone;
      config.headers["Accept-Language"] = "th";
      config.headers[LOCALE] = "th";
      return config;
    };
  }
  private _responseInterceptor() {
    return function (response: AxiosResponse) {
      return response;
    };
  }
  

  private async _refreshToken() {
    window.location.href = "/login";
  }

  private _authorizedInstanceErrorHandler(that: CustomAxios) {
    return async function (error: AxiosError) {
      const originalRequest = error.config;
      console.log("[Authorized axios] error.response", error.response?.data);
      if (error?.response?.status === 401) {
        const cause = (error?.response?.data as { cause?: string })?.cause;
        if (cause === "TokenExpiredError" || cause === "JsonWebTokenError") {
          if (!that.isRefreshing) {
            that.isRefreshing = true;
            await that._refreshToken();

            // Retry all requests in the queue with the new token
            that.refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              that.axiosAuthorizedInstance
                .request(config!)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
            });

            // Clear the queue
            that.refreshAndRetryQueue.length = 0;
            that.isRefreshing = false;

            // Retry the original request
            return that.axiosAuthorizedInstance(originalRequest!);
          }
          // that.isRefreshing = false

          return new Promise<AxiosResponse>((resolve, reject) => {
            that.refreshAndRetryQueue.push({
              config: originalRequest,
              resolve,
              reject,
            });
          });
        }

        if (cause === "JsonWebTokenError") {
          window.location.href = "/login";
        }
      }

      throw error;
    };
  }

  private _publicInstanceErrorHandler() {
    return function (error: AxiosError) {
      console.log("[Public axios] error.response", error.response?.data);
      if (error?.response?.status === 401) {
        if (
          typeof window !== "undefined" &&
          (error.response?.data as { path?: string })?.path?.startsWith(
            "/api/v1/auth/refresh"
          )
        
        ) {
          // const locale = extractPathnameAsList(window.location.pathname).at(0)
          // window.location.href = ${locale ? '/' + locale : ''}/login
          window.location.href = "/login";
        }
      }
      if (error?.response?.data) {
        throw error.response.data;
      }
      throw new Error("Unknown error");
    };
  }

  public override request<T>(options: ApiRequestOptions): CancelablePromise<T> {
    if (
      options?.url === "/api/v1/auth/login-password" ||
      options?.url === "/api/v1/auth/refresh" ||
      options?.url === "/api/v1/auth/reset-password" ||
      options?.url === "/api/v1/auth/forgot-password"
    ) {
      return __request(this.config, options, this.axiosPublicInstance);
    }
    return __request(this.config, options, this.axiosAuthorizedInstance);
  }
}

const apiClient = new ApiClient(
  { BASE: process.env.NEXT_PUBLIC_API ?? "", WITH_CREDENTIALS: true },
  CustomAxios
);

export default apiClient;
