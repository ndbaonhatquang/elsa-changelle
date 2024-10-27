import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientGrpcProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import {LEADERBOARDS_PACKAGE_NAME, LEADERBOARD_SERVICE_NAME} from "./protos/leaderboard";
import {LeaderboardController} from "./leaderboard.controller";
import {LeaderboardService} from "./leaderboard.service";
import {LeaderboardGateway} from "./leaderboard.gateway";


@Module({
    imports: [ConfigModule],
    controllers: [LeaderboardController],
    providers: [
        {
            provide: LEADERBOARD_SERVICE_NAME,
            useFactory: (configService: ConfigService): ClientGrpcProxy => {
                return ClientProxyFactory.create({
                    transport: Transport.GRPC,
                    options: {
                        url: configService.get<string>('LEADERBOARD_SERVICE_URL'),
                        package: LEADERBOARDS_PACKAGE_NAME,
                        protoPath: [join(__dirname, './protos/leaderboard.proto')]
                    }
                });
            },
            inject: [ConfigService]
        },
        LeaderboardService,
        LeaderboardGateway,
    ],
    exports: [
        LeaderboardService,
    ]
})
export class LeaderboardModule {}
