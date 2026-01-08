import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserGrpcClient } from './user-grpc.client';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_PACKAGE',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          const protoPath = join(__dirname, '../../proto/user.proto');

          return {
            transport: Transport.GRPC,
            options: {
              url: config.get<string>('USER_SERVICE_URL'),
              package: 'user',
              protoPath,
            },
          };
        },
      },
    ]),
  ],
  providers: [UserGrpcClient],
  exports: [UserGrpcClient],
})
export class UserGrpcModule {}

