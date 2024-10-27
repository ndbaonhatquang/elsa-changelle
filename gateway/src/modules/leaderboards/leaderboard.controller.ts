// leaderboards.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardGateway } from './leaderboard.gateway';

@Controller('leaderboards')
export class LeaderboardController {
    constructor(
        private readonly leaderboardService: LeaderboardService,
        private readonly leaderboardGateway: LeaderboardGateway,
    ) {}

    @Post('update')
    async updateScore(@Body() body: { userId: string; score: number }) {
        const { userId, score } = body;
        const success = await this.leaderboardService.updateScore(userId, score);
        if (success) {
            await this.leaderboardGateway.broadcastLeaderboard();
        }
        return { success };
    }
}
