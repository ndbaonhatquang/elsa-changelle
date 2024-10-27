// leaderboards-client.service.ts
import {Injectable, Inject, OnModuleInit} from '@nestjs/common';
import {
    LEADERBOARD_SERVICE_NAME,
    LeaderboardResponse,
    LeaderboardServiceClient,
    ScoreUpdateResponse
} from "./protos/leaderboard";
import {ClientGrpcProxy} from "@nestjs/microservices";
import {lastValueFrom, Observable} from "rxjs";
import {Metadata} from "@grpc/grpc-js";


@Injectable()
export class LeaderboardService implements OnModuleInit {
    private leaderboardServiceClient: LeaderboardServiceClient;

    constructor(@Inject(LEADERBOARD_SERVICE_NAME) private client: ClientGrpcProxy) {}

    onModuleInit() {
        this.leaderboardServiceClient = this.client.getService<LeaderboardServiceClient>(LEADERBOARD_SERVICE_NAME);
    }

    async getLeaderboard() {
        const metadata = new Metadata();

        const { entries } = await lastValueFrom(this.leaderboardServiceClient.getLeaderboard({}, metadata));
        return entries;
    }

    async updateScore(userId: string, score: number) {
        const metadata = new Metadata();
        metadata.add('userId', userId);

        const response = await lastValueFrom(this.leaderboardServiceClient.updateScore({ score }, metadata));
        return response.success;
    }
}
