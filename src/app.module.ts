import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { PartyModule } from './parties/party.module';
import { TypeModule } from './types_of/types.module';
import { UserModule } from './users/user.module';
import { WishlistModule } from './wishlists/whislist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'nextparty.mysql.database.azure.com',
      port: 3306,
      username: 'admin1',
      password: 'NextParty1',
      database: 'v1',
      autoLoadEntities: true,
    }),
    UserModule,
    PartyModule,
    WishlistModule,
    ItemsModule,
    TypeModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
