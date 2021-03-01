import * as http from 'http';
import { ProxyOptions, GatewayRequest } from '@common';

/**
 * Rewrite originalUrl, for example：rewrite `/example` or `/example/` as `/`
 */
export const rewrite = (originalUrl: string, rewriteUrl: string) => {
  if (!rewriteUrl) return originalUrl;
  else if (originalUrl.indexOf(`${rewriteUrl}/`) === 0) return originalUrl.replace(`${rewriteUrl}/`, '/');
  else if (originalUrl.indexOf(rewriteUrl) === 0) return originalUrl.replace(rewriteUrl, '/');
};

/**
 * Compare the current URL to the forwarding address in the configuration
 */
export const match = (originalUrl: string, configs: ProxyOptions[]): ProxyOptions => {
  return configs.find(item => originalUrl.indexOf(item.rewriteUrl) === 0) || null;
};

/**
 * The proxy forwarding is done by overwriting the HTTP.IncomingMessage
 */
export const proxy = async (request: GatewayRequest, options: ProxyOptions) => {
  try {
    // proxy options
    options.method = request.method;
    options.headers = request.headers;

    // proxy rewrite
    options.path = options.isRewrite
      ? rewrite(request.originalUrl, options.rewriteUrl)
      : request.originalUrl;

    // proxy forwarding
    await new Promise((resolve, rejected) => {
      request.pipe(
        http
          .request(
            options,
            (proxyHandle: GatewayRequest) => {
              request.res.writeHead(proxyHandle.statusCode, proxyHandle.headers);
              proxyHandle.pipe(request.res);
            }
          )
          .once('error', err => rejected(err))
      );
    });
  } catch (error) {
    throw new Error(error);
  }
};
