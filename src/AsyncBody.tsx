import React from 'react';
import {FlatList, StyleSheet, Text, useColorScheme, View, AccessibilityInfo} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { useSelector } from 'react-redux';
import {Section} from './Section';

function AsyncBody() {
  const isDarkMode = useColorScheme() === 'dark';
  const places = useSelector((state: any) => state.places.places);
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}>
      <FlatList
        data={places}
        renderItem={({item}) => {
          return <Text key={item.key}>{item.value}</Text>
        }}
      />
      <Section title="Step One">
        Edit <Text style={styles.highlight}>App.tsx</Text> to change screen
        and then come back to see your edits.
      </Section>
      <Section title="See Your Changes">
        <ReloadInstructions />
      </Section>
      <Section title="Debug">
        <DebugInstructions />
      </Section>
      <Section title="Learn More">
        Read the docs to discover what to do next:
      </Section>
      <LearnMoreLinks />
    </View>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default AsyncBody;
