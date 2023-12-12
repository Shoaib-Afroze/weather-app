
import { Controller, Post, Body } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';

@Controller('geolocation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Post()
  async getGeolocations(@Body() cities: string[]): Promise<{ city: string, geolocation: any }[]> {
    const geolocations = await Promise.all(cities.map(async (city) => ({
      city,
      geolocation: await this.geolocationService.getGeolocation(city),
    })));

    return geolocations.filter(geo => geo.geolocation !== null);
  }
}
