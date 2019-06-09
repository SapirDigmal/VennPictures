import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService, Config} from './config.service';

import {Flicker, Photo, Image} from './flicker';

import {Observable, of} from 'rxjs';
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private config: Config;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.getUrl();
  }

  // GET image's url from config
  getUrl(): void {
    this.configService.getConfig()
      .subscribe((config: Config) => {

        this.config = config;
        console.log(this.config);
      });
  }

  // GET images whose text contains search term
  searchImages(term: string): Observable<Object> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const url = `${this.config.imagesUrl}&text=${term}`;
    let results = this.http.get<Flicker>(url).pipe(map(data => data.photos.photo));

    return results;
  }
}
