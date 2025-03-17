import React from 'react';
import burgerInside from '@/public/burgerInside.svg';

import { Box, InputAdornment, TextField } from '@mui/material';
import Image from 'next/image';
import { SearchIcon } from '../icons/index';


export default function MobileInput() {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                gap: '10px',
                alignSelf: 'center',
            }}
        >
            <Box sx={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                <TextField
                    sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '15px',
                            height: '50px',
                            backgroundColor: '#F8F8F8',
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                            '&:hover fieldset': {
                                borderColor: 'transparent',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'transparent',
                            },
                            '& .MuiOutlinedInput-input': {
                                borderRadius: '15px',
                                width: '100%',
                            },
                        },
                    }}
                    variant='outlined'
                    placeholder='Find your plants...'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box
                sx={{
                    background: '#46A358',
                    borderRadius: '14px',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image src={burgerInside} width={30} height={30} alt={'filter button inside'} />
            </Box>
        </Box>
    );
}
