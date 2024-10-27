// leaderboards.gateway.ts
import {WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Server} from 'socket.io';
import {Injectable} from '@nestjs/common';
import {LeaderboardService} from './leaderboard.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
@Injectable()
export class LeaderboardGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly leaderboardService: LeaderboardService) {}

    async broadcastLeaderboard() {
        const data = await this.leaderboardService.getLeaderboard();

        this.server.emit('leaderboard', data);
    }
}
