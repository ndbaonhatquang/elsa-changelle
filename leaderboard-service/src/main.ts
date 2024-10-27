// main.ts (Leaderboard Microservice)
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {AppModule} from "./app.module";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.GRPC,
            options: {
                package: 'leaderboards',
                protoPath: [join(__dirname, 'modules/leaderboards/protos/leaderboard.proto')],
                url: process.env.GRPC_URL || 'localhost:50051',  // get from env or use default
            },
        },
    );

    await app.listen();
  console.log('Leaderboard Microservice is running with gRPC');
}
bootstrap();
