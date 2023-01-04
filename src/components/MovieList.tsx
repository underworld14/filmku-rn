import { TouchableOpacity, Image, Text, View, TouchableOpacityProps } from "react-native";
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import GenreChip from "components/GenreChip";
import { getGenresByIds } from "utils/helpers";

type Props = TouchableOpacityProps & {
  poster_path?: string;
  title?: string;
  vote_average?: number;
  vote_count?: number;
  genre_ids?: number[];
};

export default function MovieList({
  poster_path,
  title,
  vote_average,
  vote_count,
  genre_ids,
  ...props
}: Props) {
  return (
    <TouchableOpacity className="flex-row w-full mb-4" {...props}>
      <Image className="w-24 h-32" source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }} />
      <View className="ml-4 w-3/4">
        <Text className="font-text-bold text-base">{title}</Text>
        <Text className="font-text-regular text-xs mt-2 text-gray-400">
          <AntDesignIcon name="star" color="#FFC319" /> {vote_average}/{vote_count}
        </Text>
        <View className="flex-row mt-3 flex-wrap w-4/5">
          {getGenresByIds(genre_ids || []).map((genre, index) => (
            <GenreChip key={index} name={genre.name} />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}
