import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { inviteDto } from "../dtos/invite.dto";
import { Party } from "../entity/party.entity";
import { PartyService } from "../service/party.service";

@ApiBearerAuth()
@ApiTags('Parties')
@Controller('parties')
export class PartyController {
  constructor(private readonly partyService: PartyService){
  }
  @Get()
  async getAll() : Promise<Party[]>{
    return await this.partyService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id')id: number) : Promise<Party>{
    return await this.partyService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/invite')
  async invite(@Param('id') id: number, @Body() email: inviteDto){
    return await this.partyService.invite(id,email);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id')id: number,@Body() party:Party){
    return await this.partyService.update(id,party);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id')id: number){
    return await this.partyService.delete(id);
  }


  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async getByUserId(@Param('id')id: number) : Promise<any[]>{
    return await this.partyService.listUserParties(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/guests')
  async getGuests(@Param('id')id: number) : Promise<any[]>{
    return await this.partyService.listPartyGuests(id);
  }
}
