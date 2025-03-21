import React from 'react';
import Categories from './Categories';
import Pagination from './Pagination';
import Plants from './Plants';
import Sorting from './Sorting';

// type Props = {};

const ProductHome = () => {
    return (
        <div className='flex gap-[10px] w-full'>
            <div className='bg-[#f5f5f5] w-[25%] h-full hidden min-[870px]:block'>
                <Categories />
            </div>
            <div className='flex w-[75%] flex-col gap-[31px] max-[870px]:w-full'>
                <Sorting />
                <Plants />
                <Pagination />
            </div>
        </div>
    );
};

export default ProductHome;
