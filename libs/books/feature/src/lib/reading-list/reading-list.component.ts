import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  removeFromReadingList,
  addToReadingList,
} from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  unDoRemovingFromReadingList(book: Book, action) {
    const snackBarRef = this.snackBar.open('book added reading list', action, {
      duration: 2000,
    });

    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({ book }));
      console.log('item tow');
    });
  }
}
