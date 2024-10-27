import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {LeaderboardModule} from "./modules/leaderboards/leaderboard.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LeaderboardModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
