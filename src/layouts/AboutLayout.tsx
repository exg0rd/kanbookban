import React from 'react';

export const AboutLayout: React.FC = () => {
  return (
    <div className='flex flex-col w-full max-w-[1280px] gap-4 bg-white shadow-md p-6' >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          О приложении
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Это небольшое приложение Kanban предназначено для управления списком
          читаемых книг. Вы можете легко отслеживать свой прогресс, организовывать
          книги по категориям ("Хочу прочитать", "Читаю сейчас",
          "Прочитано") и сохранять данные в локальном хранилище браузера.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Основные функции:</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-8">
          <li>Добавление новых книг с указанием названия, автора и категории.</li>
          <li>Перемещение книг между категориями с помощью drag-and-drop.</li>
          <li>Удаление книг из списка.</li>
          <li>Сохранение данных в localStorage для постоянного хранения.</li>
        </ul>
        <p className="text-gray-600 italic text-center">
          Приложение разработано с использованием React, TypeScript и современных
          технологий для обеспечения удобства использования и надежности.
        </p>
      </div>
  );
};