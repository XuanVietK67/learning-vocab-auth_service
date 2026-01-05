import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserGrpcModule } from 'src/modules/grpc/user-grpc.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserGrpcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
