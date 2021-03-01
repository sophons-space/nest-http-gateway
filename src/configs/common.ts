import { Configs } from './interface';

export const common: Configs = {
  proxyOptions: [
    {
      isRewrite: true,
      port: 3001,
      host: 'localhost',
      rewriteUrl: '/order',
    },
    {
      isRewrite: true,
      port: 3002,
      host: 'localhost',
      rewriteUrl: '/user',
    },
  ],
};
