import { Injectable } from '@nestjs/common';

@Injectable()
export class LeaderboardService {
    private leaderboard = new Map<string, number>();
    // TODO: redis - postgreSQL

    getLeaderboard() {
        return Array.from(this.leaderboard.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([userId, score]) => ({ userId, score }));
    }

    updateScore(userId: string, score: number): boolean {
        this.leaderboard.set(userId, score);

        console.log(this.leaderboard)
        return true;
    }
}
