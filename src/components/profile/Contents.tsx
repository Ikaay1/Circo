import React, { useState } from 'react';

import { Box, Text } from '@chakra-ui/react';
import { profileNav } from '@constants/utils';

import Playlists from './Playlists';

const Contents = () => {
    const [route, setRoute] = useState('paid');

    return (
        <>
            <Box
                borderBottom={'1px solid rgba(255, 255, 255, 0.1)'}
                display='flex'
            >
                {profileNav.map(({title, name}) => (
                    <Text
                        mr={'3rem'}
                        lineHeight='24px'
                        color='clique.white'
                        pb={'.8rem'}
                        borderBottom={
                            route === name ? '4px solid #892CDC' : 'none'
                        }
                        cursor={'pointer'}
                        key={'name'}
                        onClick={() => setRoute(name)}
                        transition='all .8s ease'
                    >
                        {title}
                    </Text>
                ))}
            </Box>
            <Box mt={'2.5rem'}>
                <Playlists />
            </Box>
        </>
    );
};

export default Contents;
