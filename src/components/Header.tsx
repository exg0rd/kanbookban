import { Link } from 'react-router';
import src from '../assets/logo.png' //removed import since it's never read
import { MdInfoOutline } from 'react-icons/md'; //removed MdBookOnline since it's never read

export function Header() {
    return (
        <header className='no-print'>
            <div className="flex flex-row w-full bg-blue-400 text-white items-center p-5">
                <div className="flex flex-row items-center gap-3">
                    <h1 className='text-xl md:text-4xl font-extrabold'>kanBOOKban</h1>
                </div>
                <Link to={{ pathname: '/about' }}>                   
                 <MdInfoOutline className='w-[32px] h-[32px] ml-auto' href='\about' /></Link>
            </div>
        </header>
    );
}