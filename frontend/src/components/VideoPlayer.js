import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

const VideoPlayer = () => (
  <Player playsInline poster="/assets/stream-poster.png" src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />
);

export default VideoPlayer;
