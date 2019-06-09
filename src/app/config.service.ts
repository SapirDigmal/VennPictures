import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configUrl = '/assets/config.json';

  constructor(private http: HttpClient) {
  }

  // GET config file's content
  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }
}

export interface Config {
  imagesUrl: string;
}

