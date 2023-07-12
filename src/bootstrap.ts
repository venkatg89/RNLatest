import {AppRegistry} from 'react-native';
import {ScriptManager, Script} from '@callstack/repack/client';
import App from './App';
import {name as appName, localChunks} from '../app.json';

ScriptManager.shared.addResolver(async scriptId => {
  if (__DEV__) {
    return {
      url: Script.getDevServerURL(scriptId),
      cache: false,
    };
  }

  if (localChunks.includes(scriptId)) {
    return {
      url: Script.getFileSystemURL(scriptId),
    };
  }
  return {
    url: Script.getRemoteURL(`https://in-coreoms.ingrnet.com/oms/async_body.js`, {excludeExtension: true}),
  };
});

AppRegistry.registerComponent(appName, () => App);
