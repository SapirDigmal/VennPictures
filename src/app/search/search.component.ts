import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../images.service';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private images$: Observable<Object>;
  private searchTerms = new Subject<string>();
  private prevSearch;

  constructor(private imagesService: ImagesService) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
    this.saveSearch(term);
  }

  saveSearch (term: string): void {
    this.prevSearch.push(term);
    localStorage.setItem("prevSearch", JSON.stringify(this.prevSearch));
  }

  ngOnInit(): void {

    let storagePrevSearch = JSON.parse(localStorage.getItem("prevSearch"));
    this.prevSearch = storagePrevSearch ? storagePrevSearch : new Array<string>();

    this.images$ = this.searchTerms.pipe(
      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.imagesService.searchImages(term)),
    );
  }

}
