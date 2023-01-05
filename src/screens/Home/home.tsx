import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import api from "utils/api";
import { useDispatch } from "react-redux";
import { setGenres } from "store/genreSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "screens";
import MovieList from "components/MovieList";

type Props = NativeStackScreenProps<RootStackParamList, "AppTab", "Home">;

export default function Home({ navigation }: Props) {
  const dispatch = useDispatch();
  const [showingData, setShowingData] = useState<Record<string, any>[]>([]);
  const [popularData, setPopularData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    Promise.all([fetchShowingMovie(), fetchPopularMovie(), fetchMovieGenres()]);
  }, []);

  const fetchShowingMovie = useCallback(async () => {
    const response = await api.get("/movie/now_playing");
    setShowingData(response.data.results);
  }, []);

  const fetchPopularMovie = useCallback(async () => {
    const response = await api.get("/movie/popular");
    setPopularData(response.data.results);
  }, []);

  const fetchMovieGenres = useCallback(async () => {
    const response = await api.get("/genre/movie/list");
    dispatch(setGenres({ data: response.data.genres }));
  }, []);

  return (
    <View className="relative flex-1 bg-white">
      <View className="absolute left-0 top-0 w-5/12 h-full bg-gray-100" />
      <SafeAreaView className="flex-1">
        <View className="flex-row my-4 px-6 justify-center">
          <Text className="font-title-bold text-xl">Filmku</Text>
        </View>
        <ScrollView>
          <View className="flex-row justify-between items-center px-6 mt-3">
            <Text className="font-title-bold text-lg">Now Showing</Text>
            <Pressable className="border border-gray-300 rounded-xl p-1">
              <Text className="text-gray-300 text-xs">See more</Text>
            </Pressable>
          </View>
          <FlatList
            horizontal
            className="mt-6"
            data={showingData}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                className={`w-36 rounded-md ${index > 1 ? "ml-3" : "ml-6"}`}
                onPress={() => navigation.navigate("MovieDetail", { id: item.id })}
              >
                <Image
                  className="w-36 h-52 rounded-md"
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                />
                <Text className="font-text-bold text-base mt-3">{item.title}</Text>
                <Text className="font-text-regular text-xs mt-3 text-gray-400">
                  <AntDesignIcon name="star" color="#FFC319" /> {item.vote_average}/{item.vote_count}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View className="flex-row justify-between items-center px-6 mt-6">
            <Text className="font-title-bold text-lg">Popular</Text>
            <Pressable className="border border-gray-300 rounded-xl p-1">
              <Text className="text-gray-300 text-xs">See more</Text>
            </Pressable>
          </View>
          <View className="mt-4 px-6">
            <FlatList
              data={popularData}
              className="mt-1"
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <MovieList
                  key={index}
                  onPress={() => navigation.navigate("MovieDetail", { id: item.id })}
                  poster_path={item?.poster_path}
                  title={item?.title}
                  vote_average={item?.vote_average}
                  vote_count={item?.vote_count}
                  genre_ids={item?.genreIds}
                />
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
