import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GeolocationService } from '../geolocation/geolocation.service';

@Injectable()
export class WeatherService {
  constructor(private readonly geolocationService: GeolocationService) {}

  async getTemperaturesForCities(citiesRequest: any): Promise<{ city: string, temperature: number }[]> {
    let cities = citiesRequest.cities;
    const temperatures = await Promise.all(cities.map(async (city) => {
      const geolocation = await this.geolocationService.getGeolocation(city);
      if (!geolocation) {
        return null;
      }
      let forecast = await this.getWeatherForecast(geolocation);
      console.log('forecast : ' + JSON.stringify(forecast));

      if (!forecast || !forecast.properties || !forecast.properties.forecast) {
        return null;
      }

      forecast = await this.getWeatherForecastInfo(forecast.properties.forecast);

      const currentTemperature = forecast.properties.periods[0]?.temperature;
      return { city, temperature: currentTemperature || null };
    }));

    return temperatures.filter(temp => temp !== null);
  }

  private async getWeatherForecast(geolocation: any) {
    const url = `https://api.weather.gov/points/${geolocation.lat},${geolocation.lon}`;
    const response = await axios.get(url);
    return response.data;
  }

  private async getWeatherForecastInfo(url: string) {
    const response = await axios.get(url);
    return response.data;
  }

}
