import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SimpleLineIcon from "@expo/vector-icons/SimpleLineIcons";
import FeatherIcon from "@expo/vector-icons/Feather";

// screen
import HomeScreen from "./Home/home";
import DetailScreen from "./Detail/detail";
import BookmarkScreen from "./Bookmark/bookmark";
import MoviesScreen from "./Movies/movies";

export type AppTabParamList = {
  Home: undefined;
  Movies: undefined;
  Bookmark: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

function AppTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => <FeatherIcon name="home" size={props.size} color={props.color} />,
        }}
      />
      <Tab.Screen
        name="Movies"
        component={MoviesScreen}
        options={{
          tabBarIcon: (props) => <SimpleLineIcon name="film" size={props.size} color={props.color} />,
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={BookmarkScreen}
        options={{
          tabBarIcon: (props) => <FeatherIcon name="bookmark" size={props.size} color={props.color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export type RootStackParamList = {
  AppTab: undefined;
  MovieDetail: { id: number };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function Index() {
  return (
    <RootStack.Navigator initialRouteName="AppTab" screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="AppTab" component={AppTab} />
      <RootStack.Screen name="MovieDetail" component={DetailScreen} />
    </RootStack.Navigator>
  );
}

export default Index;
