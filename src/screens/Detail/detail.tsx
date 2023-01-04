import dayjs from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import React, { useEffect, useState, useCallback } from "react";
import { View, SafeAreaView, Text, TouchableOpacity, ImageBackground } from "react-native";
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { isBookmarked } from "utils/helpers";
import { RootStackParamList } from "screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import GenreChip from "components/GenreChip";
import { addBookmark, removeBookmark } from "store/bookmarkSlice";
import { MovieDetail } from "types/movie";
import { RootState } from "store";
import api from "utils/api";

dayjs.extend(durationPlugin);

type Props = NativeStackScreenProps<RootStackParamList, "MovieDetail">;

export default function Detail({ route, navigation }: Props) {
  const id = route.params.id;
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmarks.data);
  const [detail, setDetail] = useState<MovieDetail | null>(null);

  useEffect(() => {
    fetchMovieDetail(route.params.id);
  }, []);

  const fetchMovieDetail = useCallback(async (id: number) => {
    const response = await api.get(`/movie/${id}`);
    setDetail(response.data);
  }, []);

  const toggleBookmark = useCallback(() => {
    if (detail) {
      const isBookmark = isBookmarked(id, bookmarks);
      if (isBookmark) {
        // remove bookmark
        dispatch(removeBookmark(id));
      } else {
        dispatch(addBookmark(detail));
      }
    }
  }, [id, detail, bookmarks]);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      <ImageBackground
        className="w-full h-80"
        source={{ uri: `https://image.tmdb.org/t/p/w500${detail?.poster_path}` }}
      >
        <SafeAreaView>
          <View className="mt-5 px-6">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesignIcon name="arrowleft" color="#fff" size={24} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View className="flex-1 bg-white p-6 mt-[-42px] rounded-t-lg">
        <View className="flex-row justify-between">
          <Text className="font-text-bold text-xl w-3/4">{detail?.title}</Text>
          <TouchableOpacity onPress={toggleBookmark}>
            <MaterialIcons name={isBookmarked(id, bookmarks) ? "bookmark" : "bookmark-outline"} size={32} />
          </TouchableOpacity>
        </View>
        <Text className="font-text-regular text-xs mt-3 text-gray-400">
          <AntDesignIcon name="star" color="#FFC319" /> {detail?.vote_average}/{detail?.vote_count}
        </Text>
        <View className="flex-row mt-3 flex-wrap w-3/4">
          {detail?.genres?.map((genre, id) => (
            <GenreChip key={id} name={genre.name} />
          ))}
        </View>
        <View className="mt-3 flex-row">
          <View className="flex-1">
            <Text className="font-text-regular text-xs text-gray-500">Length</Text>
            <Text className="font-text-medium text-xs mt-1">
              {detail?.runtime && dayjs.duration(192, "minutes").format("HH[h] mm[m]")}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="font-text-regular text-xs text-gray-500">Language</Text>
            <Text className="font-text-medium text-xs mt-1">
              {detail?.spoken_languages[0]?.english_name || ""}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="font-text-regular text-xs text-gray-500">Rating</Text>
            <Text className="font-text-medium text-xs mt-1">PG-13</Text>
          </View>
        </View>
        <View className="mt-6">
          <Text className="font-title-bold text-xl">Description</Text>
          <Text className="font-text-regular text-sm text-justify mt-2 text-gray-500">
            {detail?.overview}
          </Text>
        </View>
      </View>
    </View>
  );
}
