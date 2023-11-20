import React, { Component } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';

const PLAYER_HOST = 'https://teyuto.tv/video/player?w=';
const DEFAULT_STYLE = { width: '100%', height: '100%' };

export type PlayerProps = {
  id: string;
  autoplay?: string;
  muted?: string;
  controls?: string;
  playbackRates?: string;
  qualitySelector?: string;
  seekButtons?: string;
  playerColor?: string;
  loop?: string;
  captions?: string;
  lowLatency?: string;
  style?: StyleProp<ViewStyle>;
  token?: string;

  onControlsDisabled?: () => void;
  onControlsEnabled?: () => void;
  onEnded?: () => void;
  onError?: () => void;
  onFirstPlay?: () => void;
  onFullScreenChange?: () => void;
  onPause?: () => void;
  onPlay?: () => void;
  onPlayerResize?: () => void;
  onQualityChange?: (resolution: { height: number; width: number }) => void;
  onRateChange?: () => void;
  onReady?: () => void;
  onResize?: () => void;
  onSeeking?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onUserActive?: () => void;
  onUserInactive?: () => void;
  onVolumeChange?: (volume: number) => void;
};



export default class TeyutoPlayerSdk extends Component<PlayerProps, {}> {
  webref?: WebView;
  playerUrl: string;
  token: string;

  play() {
    this.webref?.injectJavaScript(`player.play(); true;`);
  }
  pause() {
    this.webref?.injectJavaScript(`player.pause(); true;`);
  }
  requestFullscreen() {
    this.webref?.injectJavaScript(`player.requestFullscreen(); true;`);
  }
  mute() {
    this.webref?.injectJavaScript(`player.muted(true); true;`);
  }
  unmute() {
    this.webref?.injectJavaScript(`player.muted(false); true;`);
  }
  seek(time: number) {
    if (isNaN(time)) throw new Error('Invalid time');

    this.webref?.injectJavaScript(
      `player.currentTime(player.currentTime() + ${time}); true;`
    );
  }
  setCurrentTime(time: number) {
    if (isNaN(time)) throw new Error('Invalid time');

    this.webref?.injectJavaScript(`player.currentTime(${time}); true;`);
  }
  setLoop(loop: boolean) {
    this.webref?.injectJavaScript(`player.loop(${!!loop}); true;`);
  }
  setPlaybackRate(rate: number) {
    if (isNaN(rate)) throw new Error('Invalid rate');

    this.webref?.injectJavaScript(`player.playbackRate(${rate}); true;`);
  }
  setVolume(volume: number) {
    if (isNaN(volume)) throw new Error('Invalid volume');

    this.webref?.injectJavaScript(`player.volume(${volume}); true;`);
  }

  constructor(props: PlayerProps) {
    super(props);
    this.playerUrl = this.buildEmbedUrl(props);
    this.token = this.buildToken(props);
  }

  private onMessage(message: any) {
    
    console.log(message);
    
    if (!message.type) {
      return;
    }
    switch (message.type) {
      case 'controlsdisabled':
        if (this.props.onControlsDisabled) this.props.onControlsDisabled();
        break;
      case 'controlsenabled':
        if (this.props.onControlsEnabled) this.props.onControlsEnabled();
        break;
      case 'ended':
        if (this.props.onEnded) this.props.onEnded();
        break;
      case 'error':
        if (this.props.onError) this.props.onError();
        break;
      case 'firstplay':
        if (this.props.onFirstPlay) this.props.onFirstPlay();
        break;
      case 'fullscreenchange':
        if (this.props.onFullScreenChange) this.props.onFullScreenChange();
        break;
      case 'pause':
        if (this.props.onPause) this.props.onPause();
        break;
      case 'play':
        if (this.props.onPlay) this.props.onPlay();
        break;
      case 'playerresize':
        if (this.props.onPlayerResize) this.props.onPlayerResize();
        break;
      case 'qualitychange':
        if (this.props.onQualityChange)
          this.props.onQualityChange(message.resolution);
        break;
      case 'ratechange':
        if (this.props.onRateChange) this.props.onRateChange();
        break;
      case 'ready':
        if (this.props.onReady) this.props.onReady();
        break;
      case 'resize':
        if (this.props.onResize) this.props.onResize();
        break;
      case 'seeking':
        if (this.props.onSeeking) this.props.onSeeking();
        break;
      case 'timeupdate':
        if (this.props.onTimeUpdate)
          this.props.onTimeUpdate(message.currentTime);
        break;
      case 'useractive':
        if (this.props.onUserActive) this.props.onUserActive();
        break;
      case 'userinactive':
        if (this.props.onUserInactive) this.props.onUserInactive();
        break;
      case 'volumechange':
        if (this.props.onVolumeChange)
          this.props.onVolumeChange(message.volume);
        break;
    }
  }

  buildQueryParameters(originalProps: any): string {

      let query = '&pip=off';
      const keyToQueryParameMap: any = {
        autoplay: 'auto',
        muted: 'muted',
        controls: 'controls',
        playbackRates: 'playbackRates',
        qualitySelector: 'qualitySelector',
        seekButtons: 'seekButtons',
        playerColor: 'playerColor',
        loop: 'loop',
        captions: 'captions',
        lowLatency: 'lowLatency'
      };
      for (const key in originalProps) {
        if (
          key === 'autoplay' ||
          key === 'muted' ||
          key === 'controls' ||
          key === 'playbackRates' ||
          key === 'qualitySelector' ||
          key === 'seekButtons' ||
          key === 'playerColor' ||
          key === 'loop' ||
          key === 'captions' ||
          key === 'lowLatency'
        ) {
          query += `&${keyToQueryParameMap[key]}=${originalProps[key]}`;
        }
      }
      return query;
  }

  buildEmbedUrl(props: PlayerProps) {
    let url = `${PLAYER_HOST}${props.id}`;

    url += this.buildQueryParameters(props);

    return url;
  }

  buildToken(props: PlayerProps) {
    let token = '';
    token += props.token;
    return token;
  }


  render() {
    return (
      <WebView
        ref={(r: any) => (this.webref = r)}
        source={{
          uri: this.playerUrl,
          headers: {
            Authorization: 'Bearer '+this.token,
          },
        }}
        style={this.props.style || DEFAULT_STYLE}
        scrollEnabled={false}
        onMessage={(msg: any) =>
          this.onMessage(JSON.parse(msg.nativeEvent))
        }
        allowsInlineMediaPlayback={true}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
        injectedJavaScriptBeforeContentLoaded={`window.addEventListener('message', (m) => window.ReactNativeWebView.postMessage(JSON.stringify(m.data)))`}
      />
    );
  }
}