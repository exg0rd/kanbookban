import React, { useState } from 'react';
import { Book } from '../components/Book';
import Button from '../components/Button';
import { Input } from '../components/Input';

interface BookType {
  id: string;
  title: string;
  author: string;
  category: 'want-to-read' | 'reading' | 'read';
  pagesTotal: number;
  pagesRead: number;
  bookCoverPath?: string; 
}

type SortingOrder = 'ascending' | 'descending';

type UpdatePagesReadFn = (id: string, newPagesRead: number) => void;
type MoveBookFn = (id: string, newCategory: BookType['category']) => void;
type DeleteBookFn = (id: string) => void;
type UpdateBookCoverFn = (id: string, newCoverPath: string) => void;

export const BoardLayout: React.FC = () => {
  const [books, setBooks] = useState<BookType[]>(() => {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  const [isAddingBook, setIsAddingBook] = useState<boolean>(false);
  const [newBookTitle, setNewBookTitle] = useState<string>('');
  const [newBookAuthor, setNewBookAuthor] = useState<string>('');
  const [newBookPagesTotal, setNewBookPagesTotal] = useState<string>('');
  const [sortingOrder, setSortingOrder] = useState<SortingOrder>('descending');

  const updateBooks = (updateFn: (prevBooks: BookType[]) => BookType[]): void => {
    const result = updateFn(books);
    localStorage.setItem("books", JSON.stringify(result));
    setBooks(result);
  };

  const addBook = (): void => {
    if (!newBookTitle || !newBookAuthor || !newBookPagesTotal) return;

    const newBook: BookType = {
      id: Date.now().toString(),
      title: newBookTitle,
      author: newBookAuthor,
      category: 'want-to-read',
      pagesTotal: parseInt(newBookPagesTotal, 10),
      pagesRead: 0,
    };

    updateBooks((prevBooks: BookType[]) => [...prevBooks, newBook]);
    resetForm();
    setIsAddingBook(false);
  };

  const updateBookCover: UpdateBookCoverFn = (id: string, newCoverPath: string): void => {
    updateBooks((prevBooks: BookType[]) =>
      prevBooks.map((book: BookType) =>
        book.id === id ? { ...book, bookCoverPath: newCoverPath } : book
      )
    );
  };

  const resetForm = (): void => {
    setNewBookTitle('');
    setNewBookAuthor('');
    setNewBookPagesTotal('');
  };

  const moveBook: MoveBookFn = (id: string, newCategory: BookType['category']): void => {
    updateBooks((prevBooks: BookType[]) =>
      prevBooks.map((book: BookType) =>
        book.id === id ? { ...book, category: newCategory } : book
      )
    );
  };

  const updatePagesRead: UpdatePagesReadFn = (id: string, newPagesRead: number): void => {
    updateBooks((prevBooks: BookType[]) =>
      prevBooks.map((book: BookType) =>
        book.id === id ? { ...book, pagesRead: newPagesRead } : book
      )
    );
  };

  const deleteBook: DeleteBookFn = (id: string): void => {
    updateBooks((prevBooks: BookType[]) =>
      prevBooks.filter((book: BookType) => book.id !== id)
    );
  };

  const sortBooksByPercentage = (): void => {
    updateBooks((prevBooks: BookType[]) => {
      const booksWithPercentage = prevBooks.map((book: BookType) => {
        if (book.category === 'reading') {
          const percentageRead = (book.pagesRead / book.pagesTotal) * 100 || 0;
          return { ...book, percentageRead };
        }
        return book;
      });

      const sortedBooks = booksWithPercentage.sort((a: any, b: any) => {
        if (a.category === 'reading' && b.category === 'reading') {
          return sortingOrder === 'ascending'
            ? (a.percentageRead || 0) - (b.percentageRead || 0) 
            : (b.percentageRead || 0) - (a.percentageRead || 0); 
        }
        return 0;
      });

      setSortingOrder((prevOrder: SortingOrder) => (prevOrder === 'ascending' ? 'descending' : 'ascending'));

      return sortedBooks.map((book: any) => {
        if (book.category === 'reading') {
          const { percentageRead, ...rest } = book;
          return rest;
        }
        return book;
      });
    });
  };

  return (
    <div className="flex flex-col w-full max-w-[1920px] gap-6 bg-white shadow-md p-6 rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800">Ваши книги</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* "Want to Read" Section */}
        <div className="flex flex-col gap-4 p-4 bg-red-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-red-700">Хочу прочитать</h2>
          {books
            .filter((book: BookType) => book.category === 'want-to-read')
            .map((book: BookType) => (
              <div key={book.id}>
                <Book
                  {...book}
                  onUpdatePagesRead={updatePagesRead}
                  onMoveBook={moveBook}
                  onDeleteBook={deleteBook}
                  onUpdateBookCover={updateBookCover}
                />
              </div>
            ))}
          {!isAddingBook && (
            <Button
              variant="default"
              label="+ Добавить книгу"
              type="button"
              onClick={() => setIsAddingBook(true)}
              className="self-center"
            />
          )}
          {isAddingBook && (
            <div className="flex flex-col gap-2 bg-white shadow-md p-3">
              <Input
                label="Название книги"
                variant="default"
                type="text"
                placeholder="Введите название"
                value={newBookTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewBookTitle(e.target.value)}
                width="w-full"
              />
              <Input
                label="Автор"
                variant="default"
                type="text"
                placeholder="Введите автора"
                value={newBookAuthor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewBookAuthor(e.target.value)}
                width="w-full"
              />
              <Input
                label="Количество страниц"
                variant="default"
                type="number"
                placeholder="Введите количество страниц"
                value={newBookPagesTotal}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewBookPagesTotal(e.target.value)}
                width="w-full"
              />
              <div className="flex gap-2 justify-center">
                <Button
                  variant="positive"
                  label="Добавить"
                  type="button"
                  onClick={addBook}
                />
                <Button
                  variant="danger"
                  label="Отмена"
                  type="button"
                  onClick={() => {
                    setIsAddingBook(false);
                    resetForm();
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* "Reading" Section */}
        <div className="flex flex-col gap-4 p-4 bg-yellow-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-yellow-700">Читаю</h2>
          {books
            .filter((book: BookType) => book.category === 'reading')
            .map((book: BookType) => (
              <div key={book.id}>
            <Book
                  {...book}
                  onUpdatePagesRead={updatePagesRead}
                  onMoveBook={moveBook}
                  onDeleteBook={deleteBook}
                  onUpdateBookCover={updateBookCover}
                />
              </div>
            ))}
          <Button
            variant="default"
            label={`Сортировка по % (${sortingOrder === 'ascending' ? 'Возрастанию' : 'Убыванию'})`}
            type="button"
            onClick={sortBooksByPercentage}
            className="self-center"
          />
        </div>

        {/* "Read" Section */}
        <div className="flex flex-col gap-4 p-4 bg-green-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-green-700">Прочитал</h2>
          {books
            .filter((book: BookType) => book.category === 'read')
            .map((book: BookType) => (
              <div key={book.id}>
                <Book
                  {...book}
                  onUpdatePagesRead={updatePagesRead}
                  onMoveBook={moveBook}
                  onDeleteBook={deleteBook}
                  onUpdateBookCover={updateBookCover}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};