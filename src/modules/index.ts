import { Module } from '@nestjs/common';
import { HealthModule, StoreModule } from '@sophons/nest-tools';

import { GatewayModule } from './gateway';

@Module({
  imports: [
    /**
     * The common modules
     */
    StoreModule,
    HealthModule,

    /**
     * The business logic modules
     */
    GatewayModule,
  ],
})

export class CoreModule {}
