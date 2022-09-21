import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const options = new DocumentBuilder()
    .setTitle('NextParty API')
    .setDescription('Documentation for NextParty RESTfull API')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api/docs/', app, document ,{
      explorer: true,
      swaggerOptions: {
        filter : true,
        showRequestDuration: true,
        defaultModelsExpandDepth: -1,
      }
    });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
