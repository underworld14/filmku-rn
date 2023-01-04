import { View, SafeAreaView, Text, Pressable, ScrollView, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootStackParamList } from "screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootState } from "store";
import MovieList from "components/MovieList";

type Props = NativeStackScreenProps<RootStackParamList, "AppTab", "Bookmark">;

export default function Bookmark({ navigation }: Props) {
  const bookmarks = useSelector((state: RootState) => state.bookmarks.data);

  return (
    <View className="relative flex-1 bg-white">
      <View className="absolute left-0 top-0 w-5/12 h-full bg-gray-100" />
      <SafeAreaView className="flex-1">
        <View className="flex-row my-4 px-6 justify-center">
          <Text className="font-title-bold text-xl">Filmku</Text>
        </View>
        <View className="flex-row justify-between items-center px-6 mt-6">
          <Text className="font-title-bold text-lg">My Bookmarks</Text>
          <Pressable className="border border-gray-300 rounded-xl p-1">
            <Text className="text-gray-300 text-xs">See more</Text>
          </Pressable>
        </View>
        <View className="mt-4 px-6 flex-1">
          <FlatList
            data={bookmarks}
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
                genre_ids={item?.genres?.map((genre) => genre.id) || []}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
