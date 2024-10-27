// leaderboard.controller.ts
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LeaderboardService } from './leaderboard.service';
import {
  LeaderboardRequest, LeaderboardResponse,
  LeaderboardServiceController,
  LeaderboardServiceControllerMethods, ScoreUpdateRequest, ScoreUpdateResponse
} from "./protos/leaderboard";
import {Metadata} from "@grpc/grpc-js";


@Controller()
@LeaderboardServiceControllerMethods()
export class LeaderboardController implements LeaderboardServiceController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  getLeaderboard(): LeaderboardResponse {
    const entries = this.leaderboardService.getLeaderboard();
    return { entries };
  }

  updateScore({ score }: ScoreUpdateRequest, metadata: Metadata): ScoreUpdateResponse {
    const userId = metadata.get('userId')[0] as string;
    const success = this.leaderboardService.updateScore(userId, score);
    return { success };
  }
}
