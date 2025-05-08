import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable cors
  app.enableCors({ origin: true, credentials: true });
  const port = process.env.PORT || 5000;
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}
bootstrap().catch((err) => {
  console.error('Failed to start the server:', err);
  process.exit(1);
});
