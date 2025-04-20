import React, { useState } from 'react';
import { Book } from '../components/Book'; // Import the Book component
import Button from '../components/Button';
import { Input } from '../components/Input';

export const BoardLayout: React.FC = () => {
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  const updateBooks = (updateFn: (prevBooks: typeof books) => typeof books) => {
    const result = updateFn(books);
    console.log(result);
    localStorage.setItem("books", JSON.stringify(result));
    setBooks(result);
};

  const [isAddingBook, setIsAddingBook] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [newBookPagesTotal, setNewBookPagesTotal] = useState('');

  const addBook = () => {
    if (!newBookTitle || !newBookAuthor || !newBookPagesTotal) return;

    const newBook = {
      id: Date.now().toString(),
      title: newBookTitle,
      author: newBookAuthor,
      category: 'want-to-read',
      pagesTotal: parseInt(newBookPagesTotal, 10),
      pagesRead: 0,
    };

    console.log(newBook)
    updateBooks((prevBooks) => [...prevBooks, newBook]);
    resetForm();
    setIsAddingBook(false);
  };

  const resetForm = () => {
    setNewBookTitle('');
    setNewBookAuthor('');
    setNewBookPagesTotal('');
  };

  const moveBook = (id: string, newCategory: 'want-to-read' | 'reading' | 'read') => {
    updateBooks((prevBooks) =>
      prevBooks.map((book: { id: string; }) =>
        book.id === id ? { ...book, category: newCategory } : book
      )
    );
  };

  const updatePagesRead = (id: string, newPagesRead: number) => {
    updateBooks((prevBooks) =>
      prevBooks.map((book: { id: string; }) =>
        book.id === id ? { ...book, pagesRead: newPagesRead } : book
      )
    );
  };

  const deleteBook = (id: string) => {
    updateBooks((prevBooks) => prevBooks.filter((book: { id: string; }) => book.id !== id));
  };

  return (
    <div className="flex flex-col w-full max-w-[1920px] gap-6 bg-white shadow-md p-6 rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800">Ваши книги</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-4 p-4 bg-red-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-red-700">Хочу прочитать</h2>
          {books
            .filter((book: { category: string; }) => book.category === 'want-to-read')
            .map((book: { id: string; }) => (
              <div key={book.id}>
                <Book
                title={''} author={''} category={'want-to-read'} pagesTotal={0} pagesRead={0} onDeleteBook={function (_id: string): void {
                  throw new Error('Function not implemented.');
                } } {...book}
                onUpdatePagesRead={(id, newPagesRead) => updatePagesRead(id, newPagesRead)}
                onMoveBook={(id, newCategory) => moveBook(id, newCategory)}                />
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

        <div className="flex flex-col gap-4 p-4 bg-yellow-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-yellow-700">Читаю</h2>
          {books
            .filter((book: { category: string; }) => book.category === 'reading')
            .map((book: { id: string; }) => (
              <div key={book.id}>
                <Book
                title={''} author={''} category={'want-to-read'} pagesTotal={0} pagesRead={0} onDeleteBook={function (_id: string): void {
                  throw new Error('Function not implemented.');
                } } {...book}
                onUpdatePagesRead={(id, newPagesRead) => updatePagesRead(id, newPagesRead)}
                onMoveBook={(id, newCategory) => moveBook(id, newCategory)}                />
              </div>
            ))}
        </div>

        <div className="flex flex-col gap-4 p-4 bg-green-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-green-700">Прочитал</h2>
          {books
            .filter((book: { category: string; }) => book.category === 'read')
            .map((book: { id: string; }) => (
              <div key={book.id}>
                <Book
                title={''} author={''} category={'want-to-read'} pagesTotal={0} pagesRead={0} {...book}
                onUpdatePagesRead={(id, newPagesRead) => updatePagesRead(id, newPagesRead)}
                onMoveBook={(id, newCategory) => moveBook(id, newCategory)}
                onDeleteBook={(id) => deleteBook(id)}                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};