import React, { useState } from 'react';
import Button from './Button';
import { MdCheck, MdDeleteForever, MdEdit, MdStart } from 'react-icons/md';
import { Input } from './Input';
import { IoMdReturnLeft } from 'react-icons/io';

 interface Props {
    className?: string;
    id: string;
    title: string;
    author: string;
    category: 'want-to-read' | 'reading' | 'read';
    pagesTotal: number;
    pagesRead: number;
    bookCoverPath?: string | undefined;  
    onUpdatePagesRead: (id: string, newPagesRead: number) => void;
    onMoveBook: (id: string, newCategory: 'want-to-read' | 'reading' | 'read') => void;
    onDeleteBook: (id: string) => void;
    onUpdateBookCover: (id: string, newCoverPath: string) => void;
  }
  
  export const Book: React.FC<Props> = ({
    id,
    title,
    author,
    category,
    pagesTotal,
    pagesRead,
    bookCoverPath,
    onUpdatePagesRead,
    onMoveBook,
    onDeleteBook,
    onUpdateBookCover,
  }) => {
    const [recentPages, setRecentPages] = useState<number>(0);
    const [isEdit, setIsEdit] = useState<boolean>(false); 
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      const parsedValue = value === '' ? 0 : parseInt(value, 10);
      if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= pagesTotal - pagesRead) {
        setRecentPages(parsedValue);
      }
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        saveChanges();
      }
    };
  
    const handleBlur = (): void => {
      saveChanges();
    };
  
    const saveChanges = (): void => {
      if (recentPages > 0) {
        const updatedPagesRead = pagesRead + recentPages;
        onUpdatePagesRead(id, updatedPagesRead);
      }
      setIsEdit(false);
      setRecentPages(0);
    };
  
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const fileURL = reader.result as string; 
          onUpdateBookCover(id, fileURL);
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className={`flex flex-col bg-white shadow-md rounded-lg p-4 gap-6 min-h-[200px] text-lg`}>
        <div className="flex flex-row gap-3">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          {category === 'want-to-read' && (
            <Button
              variant="warning"
              type="button"
              label=""
              className="ml-auto"
              onClick={() => onMoveBook(id, 'reading')}
            >
              <MdStart />
            </Button>
          )}
          {category === 'reading' && (
            <>
              <Button
                variant="positive"
                type="button"
                label=""
                className="ml-auto"
                onClick={() => setIsEdit(true)}
              >
                <MdEdit />
              </Button>
              <Button
                variant="positive"
                type="button"
                label=""
                className=""
                onClick={() => onMoveBook(id, 'read')}
              >
                <MdCheck />
              </Button>
            </>
          )}
          {category === 'read' && (
            <>
              <Button
                variant="warning"
                type="button"
                label=""
                className="ml-auto"
                onClick={() => onMoveBook(id, 'reading')}
              >
                <IoMdReturnLeft />
              </Button>
              <Button
                variant="danger"
                type="button"
                label=""
                className=""
                onClick={() => onDeleteBook(id)}
              >
                <MdDeleteForever />
              </Button>
            </>
          )}
        </div>
  
        <p>Автор: {author}</p>
  
        {(category === 'want-to-read' || category === 'read') && (
          <p>Страниц всего: {pagesTotal}</p>
        )}
        {category === 'reading' && (
          <div>
            {!isEdit ? (
              <p>Страниц прочитано: {pagesRead ? pagesRead : 0} из {pagesTotal}</p>
            ) : (
              <Input
                label="Сколько страниц вы прочитали недавно?"
                variant="default"
                type="number"
                value={recentPages.toString()}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                autoFocus
                min={0}
                max={pagesTotal - pagesRead}
                className="w-24"
              />
            )}
          </div>
        )}
  
        {bookCoverPath ? (
          <div className="flex flex-col items-center justify-center">
            <img
              src={bookCoverPath}
              className="object-cover aspect-auto max-h-[256px] max-w-[256px]"
              alt="Book Cover"
            />
          </div>
        ) : (
          <div className="flex flex-col mt-auto shadow-md p-2">
            <label htmlFor="fileinput" className="mt-auto cursor-pointer">
              Загрузите обложку
            </label>
            <input
              type="file"
              id="fileinput"
              accept=".jpg, .png, .jpeg"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>
        )}
      </div>
    );
  };