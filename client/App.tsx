import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
// import { MD3LightTheme as DefaultTheme,  Provider as PaperProvider } from "react-native-paper";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import rootReducer from "./redux/reducers";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

// const theme = {
//   ...DefaultTheme,
//   roundness: 2,
//   version: 3,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#3498db',
//     secondary: '#f1c40f',
//     tertiary: '#a1b2c3'
//   },
// };

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        {/* <PaperProvider> */}
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        {/* </PaperProvider> */}
      </Provider>
    );
  }
}
