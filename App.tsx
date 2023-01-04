import { useCallback } from "react";
import AppScreen from "screens/index";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "store";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { Merriweather_400Regular, Merriweather_700Bold } from "@expo-google-fonts/merriweather";
import {
  Mulish_300Light,
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    Merriweather_400Regular,
    Merriweather_700Bold,
    Mulish_300Light,
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View className="flex-1" onLayout={onLayoutRootView}>
          <NavigationContainer>
            <AppScreen />
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
