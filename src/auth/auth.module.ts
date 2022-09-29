import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/items/entity/item.entity';
import { Party } from 'src/parties/entity/party.entity';
import { PartyService } from 'src/parties/service/party.service';
import { User } from 'src/users/entity/user.entity';
import { UserService } from 'src/users/service/user.service';
import { Wishlist } from 'src/wishlists/entity/whislist.entity';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './service/auth.service';


@Module({
  imports : [TypeOrmModule.forFeature([
    User,
    Party,
    Wishlist,
    Item
  ]),
  JwtModule.register({
    secret: 'SECRETE_KEY',
    signOptions: {expiresIn: '1d'}
  }),
  PassportModule.register({ defaultStrategy: 'jwt' })
],
  providers: [AuthService, UserService,PartyService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
