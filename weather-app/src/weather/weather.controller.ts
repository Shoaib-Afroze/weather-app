
import { Controller, Post, Body } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('temperatures')
  async getTemperatures(@Body() cities: string[]): Promise<{ city: string, temperature: number }[]> {
    return this.weatherService.getTemperaturesForCities(cities);
  }
}
