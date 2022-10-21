import React from 'react';

import { SimpleGrid } from '@chakra-ui/react';

import VideoThumb from './VideoThumb';

function VideoGrid({
    columns,
    width,
    videos,
}: {
    columns: number;
    width: string;
    videos: string[];
}) {
    return (
        <SimpleGrid
            autoColumns={'300px'}
            mt='20px'
            columns={columns}
            w={width}
            spacing={'30px'}
        >
            {[...videos, ...videos].map((video, i) => (
                <VideoThumb
                    id={`${i + 1}`}
                    imgUrl={`/${video}.png`}
                    key={video}
                    length={videos.length}
                />
            ))}
        </SimpleGrid>
    );
}

export default VideoGrid;
