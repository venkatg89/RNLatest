import { ScriptManager } from '@callstack/repack/client';
import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const AsyncBody = React.lazy(
  () => import(/* webpackChunkName: "async_body" */ './AsyncBody'),
);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isPrefetched, setIsPrefetched] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        {isLoaded ? (
        <React.Suspense fallback={<Text>Loading...</Text>}>
          <AsyncBody />
        </React.Suspense>
      ) : (
        <>
        <Button
          title={isPrefetched ? 'Prefetched' : 'Prefetch chunk'}
          disabled={isPrefetched}
          onPress={async () => {
            await ScriptManager.shared.prefetchScript('async_body');
            setIsPrefetched(true);
          }}
        />

        <Button title="Load chunk" onPress={() => setIsLoaded(true)} />
      </>
      )}
       <Button
        title={'Invalidate'}
        onPress={async () => {
          await ScriptManager.shared.invalidateScripts(['async_body']);
          if (isLoaded) {
            setIsLoaded(false);
          } else {
            setIsPrefetched(false);
          }
        }}
      />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
