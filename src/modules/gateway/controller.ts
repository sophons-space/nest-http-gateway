import { Configs } from '@configs';
import { match, proxy } from '@lib';
import { StoreProvider } from '@sophons/nest-tools';
import { GatewayRequest, StoreKeys } from '@common';
import { Controller, Req, All, InternalServerErrorException, NotFoundException } from '@nestjs/common';

@Controller()
export class GatewayController {

  constructor(private readonly store: StoreProvider<StoreKeys>) {}
  /**
   * Compare the current URL to the forwarding address in the configuration
   * @param originalUrl
   */
  private getProxyOptions(originalUrl: string) {
    const config = match(originalUrl, this.store.get<Configs>('configs').proxyOptions);
    if (!config) throw new NotFoundException();
    return config;
  }

  /**
   * Gateway
   * @param request GatewayRequest (http.IncomingMessage)
   */
  @All()
  async all(@Req() request: GatewayRequest) {
    try {
      await proxy(
        request,
        this.getProxyOptions(request.originalUrl),
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
