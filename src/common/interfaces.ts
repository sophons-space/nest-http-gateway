import * as http from 'http';
import { Env } from './types';

/**
 * Gateway options
 */
export interface GatewayOptions {
  env: string | Env;
  port: number;
  name: string;
}

/**
 * Proxy options
 */
export interface ProxyOptions extends http.RequestOptions {
  isRewrite: boolean;
  rewriteUrl: string;
}
