/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import TeyutoPlayerSdk from '@teyuto/react-native-player';
import * as React from 'react';
import {
  StyleSheet,
  Text, View, Button
} from 'react-native'; 

const VIDEOS = {
  id: "10912"
};

const App: () => React$Node = () => {
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [events, setEvents] = React.useState<string[]>([]);
  const [eventsCount, setEventsCount] = React.useState<number>(1);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);


  const [videoId, setVideoId] = React.useState<string>(VIDEOS.id);
  const player = React.useRef<TeyutoPlayerSdk | undefined>(undefined);


  // add a line to the list of events displayed in the app
  const logEvent = (event: string) => {
    const eventsCopy = [...events];
    if (eventsCopy.length > 5) eventsCopy.shift(); // we keep only the 6 last lines
    setEvents([...eventsCopy, `${eventsCount}. ${new Date().toLocaleTimeString()}: ${event}`]);
    setEventsCount(eventsCount + 1);
  } 
  
  return (
    <> 
      <View style={styles.view}>
        <TeyutoPlayerSdk
          // we keep a ref to be able to call the play() & pause() methods
          ref={(r) => (player.current = r)}
          id={videoId}
          controls='on'
          muted='off'
          autoplay='on'
          loop='on'
          playbackRates="off"
          low_latency="on"

          // update the current time displayed in the app 
          onTimeUpdate={(time) => setCurrentTime(time)}

          // on play/pause events, update the "isPlaying" state & log the event
          onPlay={() => { logEvent('play'); setIsPlaying(true) }}
          onPause={() => { logEvent('pause'); setIsPlaying(false); }}

          // when the following events are received, simply log them
          onControlsDisabled={() => logEvent('onControlsDisabled')}
          onControlsEnabled={() => logEvent('onControlsEnabled')}
          onEnded={() => logEvent('onEnded')}
          onError={() => logEvent('onError')}
          onFirstPlay={() => logEvent('onFirstPlay')}
          onFullScreenChange={() => logEvent('onFullScreenChange')}
          onPlayerResize={() => logEvent('onPlayerResize')}
          onQualityChange={() => logEvent('onQualityChange')}
          onRateChange={() => logEvent('onRateChange')}
          onReady={() => { setIsPlaying(false); logEvent('onReady'); }}
          onResize={() => logEvent('onResize')}
          onSeeking={() => logEvent('onSeeking')}
          onUserActive={() => logEvent('onUserActive')}
          onUserInactive={() => logEvent('onUserInactive')}
          onVolumeChange={() => logEvent('onVolumeChange')}
        />

      </View>

      <View style={styles.columnsContainer}>
        <Button
          title='mute'
          onPress={() => player.current.mute()}
        />
        <Button
          title='unmute'
          onPress={() => player.current.unmute()}
        />
        <Button
          title='seek 5 sec'
          onPress={() => player.current.seek(5)}
        />
      </View>
        
      <View style={styles.columnsContainer}>
         <Button
          title='set time 10 sec'
          onPress={() => player.current.setCurrentTime(1)} />
        <Button
          title='play'
          onPress={() => { player.current.play() }} />
        <Button
        title='stop'
        onPress={() => { player.current.pause() }} />
      </View>

      <View style={styles.columnsContainer}>
         <Button
          title='set loop'
          onPress={() => player.current.setLoop(true)} />
        <Button
          title='set loop false'
          onPress={() => player.current.setLoop(false)} />
         <Button
          title='set playback 0.5'
          onPress={() => player.current.setPlaybackRate(0.5)} />
        <Button
          title='full screen'
          onPress={() => { player.current.requestFullscreen() }} />
      </View>

      <View
        style={{
          flex: 3,
          padding: 8,
          backgroundColor: '#fff',
        }}
      >
        <Text style={{ color: 'black' }}>{`Current time: ${parseInt(`${currentTime * 100}`, 10) / 100}s`}</Text>

        <Text style={{ color: 'black', fontWeight: 'bold', marginTop: 20 }}>{`Events:`}</Text>
        {events.map(event => <Text key={event} style={{ color: 'black', fontSize: 12 }}>{event}</Text>)}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 2,
  },
  columnsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  }
});

export default App;
