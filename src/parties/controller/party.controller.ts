import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Party } from "../entity/party.entity";
import { PartyService } from "../service/party.service";


@ApiTags('Parties')
@Controller('parties')
export class PartyController {
  constructor(private readonly partyService: PartyService){
  }
  @Get()
  async getAll() : Promise<Party[]>{
    return await this.partyService.getAll();
  }
  @Get(':id')
  async getById(@Param('id')id: number) : Promise<Party>{
    return await this.partyService.getById(id);
  }

  @Post()
  async create(@Body() party: Party) {
    return await this.partyService.create(party);
  }

  @Put(':id')
  async update(@Param('id')id: number,@Body() party:Party){
    return await this.partyService.update(id,party);
  }

  @Delete(':id')
  async delete(@Param('id')id: number){
    return await this.partyService.delete(id);
  }
}
