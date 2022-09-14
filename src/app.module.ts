import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartyModule } from './parties/party.module';
import { UserModule } from './users/user.module';
import { WhislistModule } from './whislists/whislist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      autoLoadEntities: true,
    }),
    UserModule,
    PartyModule,
    WhislistModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
