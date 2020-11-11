import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
  removeFromReadingList,
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];

  searchForm = this.fb.group({
    term: '',
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe((books) => {
      this.books = books;
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    console.log(book, 'add');
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    setTimeout(()=>{
      if (this.searchForm.value.term) {
        this.store.dispatch(searchBooks({ term: this.searchTerm }));
      } else {
        this.store.dispatch(clearSearch());
      }
    },500)
  }

  unDoAddingToList(bo: Book, action) {
    const snackBarRef = this.snackBar.open('book added reading list', action, {
      duration: 2000,
    });

    const item = { bookId: bo.id, ...bo };
    //console.log(bo, 'undo');
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(removeFromReadingList({ item }));
      //console.log('item tow');
    });
  }
}
