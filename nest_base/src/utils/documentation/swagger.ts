import { DocumentBuilder } from '@nestjs/swagger';

const swagger = new DocumentBuilder()
  .setTitle('Event')
  .setDescription('The event backend documentation')
  .setVersion('0.1')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
  .build();

export default swagger;
