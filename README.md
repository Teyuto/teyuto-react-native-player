[![badge](https://img.shields.io/twitter/follow/teyuto?style=social)](https://twitter.com/intent/follow?screen_name=teyuto) &nbsp; [![badge](https://img.shields.io/github/stars/Teyuto/teyuto-player-sdk?style=social)](https://github.com/Teyuto/teyuto-player-sdk)
![](https://github.com/Teyuto/.github/blob/production/assets/img/banner.png)
<h1 align="center">Teyuto Player SDK for React Native</h1>

[Teyuto](https://teyuto.com) provides a seamless solution for managing all your video distribution needs. Whether you require video distribution in the cloud, on OTT platforms, storage, public OTT platform distribution, or secure intranet distribution, Teyuto puts everything at your fingertips, making the management of your video content effortless.

`TeyutoPlayerSdk` is a React Native library that allows you to embed a Teyuto video player in a React Native app using `react-native-webview`.

## Installation

Make sure you have `react-native-webview` installed in your React Native project.

```bash
npm install react-native-webview
```

Then, install TeyutoPlayerSdk:
```
npm install @teyuto/react-native-player
```

# Usage
```jsx
import React, { Component } from 'react';
import TeyutoPlayerSdk from '@teyuto/react-native-player;
import { Button, View } from 'react-native';

export default class App extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TeyutoPlayerSdk
          ref={(r) => (this.player = r)}
          id="<VIDEO_ID>"
          controls='on'
          muted='off'
          autoplay='on'
          loop='on'
          playbackRates="off"
          qualitySelector="on"
          captions="on"
          seekButtons="on"
          playerColor="#000"
          lowLatency="on"
          token=''
         />

        <Button onPress={() => this.player.play()} title="Play" />
        <Button onPress={() => this.player.pause()} title="Pause" />

      </View>
    )
  }
}
```

Replace <VIDEO_ID> with your Teyuto video ID.