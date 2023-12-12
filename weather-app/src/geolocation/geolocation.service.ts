
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeolocationService {
  async getGeolocation(city: string): Promise<any> {
    const url = `https://nominatim.openstreetmap.org/search?city=${city}&format=json&state=california`;
    const response = await axios.get(url);
    return response.data[0];
  }
}
