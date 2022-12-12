import React from 'react';

import { Icon } from '@chakra-ui/react';

const AddPlaylistIcon = () => {
    return (
        <svg
            width='17'
            height='17'
            viewBox='0 0 17 17'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            style={{marginLeft: '.6rem', cursor: 'pointer'}}
        >
            <circle
                cx='8.5'
                cy='8.5'
                r='8.5'
                fill='url(#paint0_linear_4052_36061)'
            />
            <path
                d='M4.25 8.5H12.75'
                stroke='#1E1E1E'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
            />
            <path
                d='M8.5 12.75V4.25'
                stroke='#1E1E1E'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
            />
            <defs>
                <linearGradient
                    id='paint0_linear_4052_36061'
                    x1='3.74'
                    y1='0.85'
                    x2='14.45'
                    y2='15.64'
                    gradientUnits='userSpaceOnUse'
                >
                    <stop stop-color='#892CDC' />
                    <stop offset='1' stop-color='#6E93F1' />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default AddPlaylistIcon;
