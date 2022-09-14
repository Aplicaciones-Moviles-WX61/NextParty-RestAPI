import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseController } from "src/common/controler.common";
import { BaseService } from "src/common/service.common";
import { Whislist } from "../entity/whislist.entity";
import { WishlitService } from "../service/whislist.service";


@ApiTags('Whislists')
@Controller('whislists')
export class WishlitController extends BaseController<Whislist> {
  constructor(private readonly listService: WishlitService){
    super();
  }
  getService(): BaseService<Whislist>{
    return this.listService;
  }

  @Get(':id')
  async findOne(@Param('id') id:number): Promise<Whislist> {
    return await this.listService.getById(id);
  }

  @Post()
  async create(@Body() list: Whislist) {
    return await this.listService.create(list);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() list: Whislist) {
    return await this.listService.update(id, list);
  }

}
