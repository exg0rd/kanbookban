import React from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router';

import image from '../assets/image.png' 

export const NotFound: React.FC = () => {

    const navigate = useNavigate();
 
  return (
    <div className='flex flex-col w-full max-w-[1280px] text-center items-center justify-center m-auto gap-3 p-3'>
        <span className='font-bold text-xl md:text-4xl'>Вы сделали что - то не то или зашли куда - то не туда...</span>
        <img src={image} className='mix-blend-multiply max-h-[400px]'></img>
        <Button onClick={() => navigate('/')} label='На главную' type='button'/>
    </div>
  );
};