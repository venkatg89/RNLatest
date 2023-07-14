import {AppRegistry} from 'react-native';
import {ScriptManager, Script} from '@callstack/repack/client';
import App from './App';
import {name as appName, localChunks} from '../app.json';
import { Provider } from 'react-redux';
import configureStore from '../store';
const store = configureStore()

ScriptManager.shared.addResolver(async scriptId => {
  if (__DEV__) {
    return {
      url: Script.getRemoteURL(`https://in-coreoms.ingrnet.com/oms/async_body.js`, {excludeExtension: true}),
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

const RNRedux = () => (
  <Provider store={ store }>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
