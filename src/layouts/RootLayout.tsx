import React from 'react';
// import '@fontsource-variable/inter';
import { Header } from '../components/Header';


interface Props {
    children: React.ReactNode;
}

export const RootLayout: React.FC<Props> = ({ children }) => {
  if (!localStorage.getItem("books")) localStorage.setItem("books", '[]');
  return (
    <div>
        <Header/>
        <main className="flex flex-col items-center min-h-screen">
        {children}
        </main>
        <footer className='mt-4 items-center p-2 bg-blue-400 text-white no-print'>текст текст текст</footer>
    </div>
  );
};

export default RootLayout;