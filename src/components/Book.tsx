import React, { useState } from 'react';
import Button from './Button';
import { MdCheck, MdDeleteForever, MdEdit, MdStart } from 'react-icons/md';
import { Input } from './Input';

interface Props {
    className?: string;
    id: string;
    title: string;
    author: string;
    category: 'want-to-read' | 'reading' | 'read';
    pagesTotal: number;
    pagesRead: number;
    onUpdatePagesRead: (id: string, newPagesRead: number) => void; // Callback for updating pagesRead
    onMoveBook: (id: string, newCategory: 'want-to-read' | 'reading' | 'read') => void; // Callback for moving books
    onDeleteBook: (id: string) => void;
}

export const Book: React.FC<Props> = ({
    className,
    id,
    title,
    author,
    category,
    pagesTotal,
    pagesRead,
    onUpdatePagesRead,
    onMoveBook,
    onDeleteBook
}) => {
    const [recentPages, setRecentPages] = useState(0);
    const [isEdit, setIsEdit] = useState(false); 

    console.log(pagesTotal, pagesRead)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!isNaN(parseInt(value)) && parseInt(value) >= 0 && parseInt(value) <= pagesTotal - pagesRead) {
            setRecentPages(parseInt(value));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            saveChanges();
        }
    };

    const handleBlur = () => {
        saveChanges();
    };

    const saveChanges = () => {
        if (recentPages > 0) {
            const updatedPagesRead = pagesRead + recentPages; 
            onUpdatePagesRead(id, updatedPagesRead); 
        }
        setIsEdit(false);
        setRecentPages(0); 
    };

    return (
        <div
            className={`flex flex-col bg-white shadow-md rounded-lg p-4 gap-6 min-h-[200px] text-lg ${className}`}
        >
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
                    <Button
                        variant="danger"
                        type="button"
                        label=""
                        className="ml-auto"
                        onClick={() => onDeleteBook(id)} 
                    >
                        <MdDeleteForever />
                    </Button>
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
        </div>
    );
};