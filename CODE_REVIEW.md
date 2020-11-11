# CODE_REVIEW

# CODE PROBLEMS / SMELLING

# Task - 1

# 2
### libs/books/data-access/src/lib/+state/reading-list.reducer.spec.ts
* two tests failed

* it('failedAddToReadingList should undo book addition to the state', () => {
      const action = ReadingListActions.failedAddToReadingList({
        book: createBook('B')
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A']);
    });

*  it('failedRemoveFromReadingList should undo book removal from the state', () => {
      const action = ReadingListActions.failedRemoveFromReadingList({
        item: createReadingListItem('C')
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A', 'B', 'C']);
    });
  });

# 3 Lighthouse
* performance ----       39%
* Accessibility -------    87%
* Best Practices ------   93%
* SEO  -------            89%
* Progressive web App --- enabled
