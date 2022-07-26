import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
        .setTitle('Chat Application')
        .setDescription('The chat API description')
        .setVersion('1.0')
        .addTag('chat')
        .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api',app,document);
        /* bootstrap the validationPipe in the bootstrap function available in main.ts */
        /* call the useGlobalPipes() method. Basically, we pass it an instance of the ValidationPipe class. 
          Notice here that ValidationPipe is part of the @nestjs/common package. */

        /* https://www.youtube.com/watch?v=GYZhmAp_U18 */
        /* https://dev.to/webeleon/cursus-nestjs-validation-via-les-dto-2h25 */
        app.useGlobalPipes(new ValidationPipe({
            transform : true,

            // retire tout les champs qui ne sont pas declare dans la dto 
            whitelist : true,

            // rejette les requetes qui contiennent des champs non declare  dans la dto 
            forbidNonWhitelisted : true,
          }));
        await app.listen(3000);
}
bootstrap();
