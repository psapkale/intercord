import { Outlet } from 'react-router-dom';

const SearchOutlet = () => {
   return (
      <div className='w-full h-fit pl-[1.5rem] sm:pl-[2rem] md:pl-[6rem] pt-[2rem] overflow-y-scroll py-8'>
         <Outlet />
      </div>
   );
};

export default SearchOutlet;
