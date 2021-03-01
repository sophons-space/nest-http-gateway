import { ProxyOptions } from '@common';

export interface Configs {
  name?: string;
  env?: string;
  port?: string| number;
  appname?: string;
  proxyOptions?: ProxyOptions[];
}
