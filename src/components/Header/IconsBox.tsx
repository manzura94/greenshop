import { Badge } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CustomButton from '../CustomDesigns/CustomButton';
import { LogOut, SearchIcon, ShoppingCartIcon } from '../icons/index';
import { useRouter } from 'next/navigation';
import { Login } from './Login';

export default function Icons() {
    const [search, setSearch] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <Box sx={{ cursor: 'pointer' }} onClick={() => setSearch(!search)}>
                <SearchIcon />
            </Box>
            <Box sx={{ cursor: 'pointer' }} onClick={() => router.push('/home/shoppingcart')}>
                <Badge badgeContent={6} color='success'>
                    <ShoppingCartIcon />
                </Badge>
            </Box>
            <Box>
                <CustomButton label='Login' leftIcon={<LogOut />} onClick={() => setOpen(true)} />
                <Login open={open} setOpen={setOpen} />
            </Box>
        </Box>
    );
}
