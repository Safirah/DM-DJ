import { LOADIPHLPAPI } from "dns";
import { useState } from "react";
import { Card, CardBody, CardText, ButtonGroup, Button, Form, Col, CardTitle, CardHeader, FormSelect, CardImg, ListGroup } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { InputProps, Option } from "react-bootstrap-typeahead/types/types";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import { setOriginalNode } from "typescript";

export type MusicItem = {
    name: string;
    videoId: string;
    image?: string;
}

export function MusicBox(props: { items: MusicItem[] }) {
    const items = props.items;
    var [item, setItem] = useState<MusicItem>({ name: 'Select a sound to add', videoId: '' });
    var [loop, setLoop] = useState<boolean>(false);
    var [isPlaying, setIsPlaying] = useState<boolean>(false);
    var [isReady, setIsReady] = useState<boolean>(false);
    var [videoPlayer, setVideoPlayer] = useState<YouTubePlayer>();
    var [volume, setVolume] = useState<number>(0);
    //var videoPlayer: YouTubePlayer;
    var playButtonIcon = "bi bi-play-fill";


    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        setVideoPlayer(event.target);
    }

    const opts: YouTubeProps['opts'] = {

        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            // autoplay: 1,
            controls: 0,
            modestbranding: 1,
            playsinline: 1,

        },
    };

    function playPauseVideo(): void {
        if (isReady) {
            if (videoPlayer.getPlayerState() == 1) {
                videoPlayer.pauseVideo()
            } else {
                videoPlayer.playVideo()
            }
        }
    }

    function loopVideo(): void {
        setLoop(!loop);
    }

    const onVideoChange: YouTubeProps['onStateChange'] = (event) => {
        setVideoPlayer(event.target);
        const videoState = videoPlayer.getPlayerState();
        setIsPlaying(videoState == 1);
        if (videoState == 0) {
            videoPlayer.seekTo(0, false);
            if (loop) {
                videoPlayer.playVideo();
            }
        }
        setIsReady(videoState == 1 || videoState == 2 || videoState == 3 || videoState == 5);
        if (isReady) {
            videoPlayer.setVolume(volume);
        }
    }

    function volumeChange(event: { target: { value: any; }; }): void {
        console.log(isReady)
        setVolume(event.target.value);
        if (isReady) {
            videoPlayer.setVolume(event.target.value)
        }
    }

    function onSelectItem(selected: Option[]) {
        if (selected.length == 0) {
            setIsReady(false);
            setItem({ name: 'Select a sound to add', videoId: '' })
        }

        if (selected.length == 1) {
            setItem(selected[0] as MusicItem);
        }
    }

    var iFrameShow = isReady ? "" : " transparent";
    var loopVariant = loop ? "success" : "";
    var playButtonIcon = isPlaying ? "bi bi-pause-fill" : "bi bi-play-fill";
    return (
        <Col md={4} className="sound">
            <Card className='box-shadow text-center'>
                <CardHeader>
                    <Typeahead
                        inputProps={{ autoComplete: "nope" }}
                        clearButton
                        id="basic-typeahead-single"
                        labelKey="name"
                        onChange={onSelectItem}
                        options={items}
                        placeholder="Search..."
                    />
                </CardHeader>

                <CardBody>
                    <div className="cardIframe">
                        <YouTube id="youtube-audio" className={"iframe-yt-div" + iFrameShow} iframeClassName="embed-responsive-item iframe-yt"
                            videoId={item.videoId} opts={opts} onReady={onPlayerReady} onStateChange={onVideoChange} />
                        {/* <div className="musicImage">
                            <img src={item.image} />
                        </div> */}
                    </div>
                    <CardText>{item.name}</CardText>
                    <ListGroup.Item>
                        <Button variant="" className="btn-sm" id="button_play" onClick={playPauseVideo}>
                            <i className={playButtonIcon} />
                        </Button>
                        <Button variant={loopVariant} className="btn-sm" id="button_loop" onClick={loopVideo}>
                            <i className="bi bi-repeat" />
                        </Button>

                    </ListGroup.Item>
                    <div className="volume">
                        <i className="bi bi-volume-mute-fill"></i>
                        <Form.Range defaultValue={volume} onChange={volumeChange} />
                        <i className="bi bi-volume-up-fill"></i>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
}