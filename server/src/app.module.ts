import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpFilter } from './common/http.filter';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<string>('DB_TYPE') as 'mysql' | 'postgres' | 'sqlite',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'development' ? 'silly' : 'info',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(
              ({
                timestamp,
                level,
                message,
              }: {
                timestamp: string;
                level: string;
                message: string;
              }) => {
                return `${timestamp} [${level}]: ${message}`;
              },
            ),
          ),
        }),
        new winston.transports.File({
          filename: 'backend.log',
          level: 'warn',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(
              ({
                timestamp,
                level,
                message,
              }: {
                timestamp: string;
                level: string;
                message: string;
              }) => {
                return `${timestamp} [${level}]: ${message}`;
              },
            ),
          ),
        }),
      ],
    }),
    UserModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpFilter,
    },
  ],
})
export class AppModule {}
