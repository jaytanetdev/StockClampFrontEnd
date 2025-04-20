/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';
import { AppService } from './services/AppService';
import { AuthService } from './services/AuthService';
import { MaterialService } from './services/MaterialService';
import { ModelService } from './services/ModelService';
import { OptionService } from './services/OptionService';
import { OrderService } from './services/OrderService';
import { ProductService } from './services/ProductService';
import { UserService } from './services/UserService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class ApiClient {
  public readonly app: AppService;
  public readonly auth: AuthService;
  public readonly material: MaterialService;
  public readonly model: ModelService;
  public readonly option: OptionService;
  public readonly order: OrderService;
  public readonly product: ProductService;
  public readonly user: UserService;
  public readonly request: BaseHttpRequest;
  constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? '',
      VERSION: config?.VERSION ?? '1.0',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });
    this.app = new AppService(this.request);
    this.auth = new AuthService(this.request);
    this.material = new MaterialService(this.request);
    this.model = new ModelService(this.request);
    this.option = new OptionService(this.request);
    this.order = new OrderService(this.request);
    this.product = new ProductService(this.request);
    this.user = new UserService(this.request);
  }
}

