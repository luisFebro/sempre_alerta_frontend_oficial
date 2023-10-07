// doc: https://cranom.vercel.app/reactjs-media
import { ReactVideo } from "reactjs-media/video";

// demo video
export default function VideoPlayer({
    videoUrl = "https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4",
    thumbnailUrl = null,
    autoPlay = true,
    className,
    onTimeUpdateCallback = () => null,
}) {
    const onPlay = () => {};

    const onPause = () => {};

    // It is triggered when the video is playing. It passes in 3 arguments. An event, currentTime, and the percentage finished.
    const onTimeUpdate = (ev, currentTime, videoDurBySeconds) => {
        const vDur = videoDurBySeconds ? Math.floor(videoDurBySeconds) : 0;

        onTimeUpdateCallback(vDur);
    };

    // This is fired when the user hit the forward button
    const onRewind = () => {};
    const onForward = () => {};

    // This is fired when the user seeks a certain point i the video
    const onSeek = () => {};

    // This is fired when the volume of the player is muted
    const onMute = () => {};

    // This is fired when the Player is playing in Picture in Picture. More: https://w3c.github.io/picture-in-picture/
    const onRequestPictureInPicture = () => {};

    const onEnterFullScreen = () => {};

    return (
        <>
            <div>
                <ReactVideo
                    src={videoUrl}
                    type="video/mp4"
                    poster={thumbnailUrl}
                    className={className}
                    primaryColor="blue"
                    autoPlay={autoPlay}
                    onPlay={onPlay}
                    onPause={onPause}
                    onTimeUpdate={onTimeUpdate}
                    onRewind={onRewind}
                    onForward={onForward}
                    onSeek={onSeek}
                    onMute={onMute}
                    onRequestPictureInPicture={onRequestPictureInPicture}
                    onEnterFullScreen={onEnterFullScreen}
                />
                <style global>
                    {`
                        .video-react-controls {
                            min-height: 50px;
                        }
                        
                        /* remove thumbnail because glitch when video gets finished */
                        div.poster {
                            display: none;
                        }

                        section.one___flkjsjJJNJnn_nANN8hG_YG7GY7g7BH9, section.undefined {
                            height: 350px;
                            background: var(--themeS);
                        }
                    `}
                </style>
            </div>
        </>
    );
}
