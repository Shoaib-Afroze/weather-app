import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { GeolocationModule } from './geolocation/geolocation.module';

@Module({
  imports: [WeatherModule, GeolocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
