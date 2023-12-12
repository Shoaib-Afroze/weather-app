
import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { GeolocationModule } from '../geolocation/geolocation.module';

@Module({
  imports: [GeolocationModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
