import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Wishlist } from "../entity/whislist.entity";
import { WishlistService } from "../service/whislist.service";

@ApiBearerAuth()
@ApiTags('Wishlists')
@Controller('party')
export class WishlistController{
  constructor(private readonly listService: WishlistService){
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/wishlist')
  async getWishlist(@Param('id')id: number){
    return await this.listService.getWishlist(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/wishlist/create')
  async createWishlist(@Param('id')id: number, @Body() wishlist: Wishlist){
    return await this.listService.createWishlist(id,wishlist);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/wishlist/edit')
  async updateWishlist(@Param('id')id: number, @Body() wishlist: Wishlist){
    return await this.listService.updateWishlist(id,wishlist);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/wishlist/delete')
  async deleteWishlist(@Param('id')id: number){
    return await this.listService.deleteWishlist(id);
  }
}
