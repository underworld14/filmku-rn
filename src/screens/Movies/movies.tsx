import { useState, useEffect } from "react";
import { View, SafeAreaView, Text, Pressable, ScrollView, FlatList, TextInput } from "react-native";
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import { RootStackParamList } from "screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useDebounce from "hooks/useDebounce";
import MovieList from "components/MovieList";
import api from "utils/api";

type Props = NativeStackScreenProps<RootStackParamList, "AppTab", "Movies">;

export default function Movie({ navigation }: Props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      fetchSearchMovieByTitle(debouncedSearch);
    }
  }, [debouncedSearch]);

  const fetchSearchMovieByTitle = async (search: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/search/movie?query=${search}`);
      setData(response.data.results);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="relative flex-1 bg-white">
      <View className="absolute left-0 top-0 w-5/12 h-full bg-gray-100" />
      <SafeAreaView className="flex-1">
        <View className="flex-row my-4 px-6 justify-center">
          <Text className="font-title-bold text-xl">Filmku</Text>
        </View>
        <View className="flex-row justify-between items-center px-6 mt-6">
          <Text className="font-title-bold text-lg">Search Movies</Text>
          <AntDesignIcon name="search1" size={24} />
        </View>
        <View className="mt-3 px-6">
          <TextInput
            autoFocus
            onChangeText={(text) => setSearch(text)}
            className="font-text-regular text-sm px-4 py-3 border border-gray-300 rounded-md"
            placeholder="Search ..."
          />
        </View>
        <View className="mt-5 px-6 flex-1">
          <FlatList
            data={data}
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
                genre_ids={item?.genre_ids || []}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
