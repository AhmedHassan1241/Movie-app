import React from 'react';
import YouTube from 'react-youtube';

export const VideoPlayer = ({ videoUrl }) => {
    if (!videoUrl) {
        return <div style={{color:"#fff"}}>رابط الفيديو غير متوفر.</div>;
    }

    // استخراج معرف الفيديو من رابط اليوتيوب
    const videoId = videoUrl.split('/embed/')[1]?.split('?')[0];

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 0, 
            controls: 1, 
            modestbranding: 1,
            rel: 0 
        },
    };

    return <YouTube videoId={videoId} opts={opts} />;
};