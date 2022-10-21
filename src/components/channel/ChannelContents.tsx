import React, { useState } from 'react';

import { Box, SimpleGrid, TabPanels, Tabs, Text } from '@chakra-ui/react';
import VideoGrid from '@components/home/VideoGrid';
import EventModal from '@components/liveevents/eventCard/EventModal';
import Playlists from '@components/profile/Playlists';
import CliqueTabPanel from '@components/widgets/CliqueTabPanel';
import { channelNav } from '@constants/utils';

const Contents = () => {
    const [route, setRoute] = useState('upload');

    return (
        <>
            <Box
                borderBottom={'1px solid rgba(255, 255, 255, 0.1)'}
                display='flex'
            >
                {channelNav.map(({title, name}) => (
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

            {route === 'playlist' && (
                <Box mt={'2.5rem'}>
                    <Playlists newPlaylist={false} />
                </Box>
            )}

            {route === 'live' && (
                <Box mt={'2.3rem'}>
                    <VideoGrid
                        columns={4}
                        width={'100%'}
                        videos={[
                            'videoImage',
                            'videoImage1',
                            'videoImage2',
                            'videoImage3',
                        ]}
                    />
                </Box>
            )}

            {route === 'upload' && (
                <Box mt={'2.3rem'}>
                    <VideoGrid
                        columns={4}
                        width={'100%'}
                        videos={[
                            'videoImage',
                            'videoImage1',
                            'videoImage2',
                            'videoImage3',
                        ]}
                    />
                </Box>
            )}
        </>
    );
};

export default Contents;
