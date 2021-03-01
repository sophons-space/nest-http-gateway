import { Request } from 'express';

/**
 * In the current file, declare type
 */
export type Env = 'dev' | 'test' | 'pre' | 'prod';

/**
 * Only declared variables can be used
 */
export type StoreKeys = 'configs' | 'logger';

/**
 * Gatseway env
 */
export type GatewayEnv = 'dev' | 'test' | 'pre' | 'prod';

/**
 * Gateway request (http.IncomingMessage)
 */
export type GatewayRequest = Request;
