import { View, ViewProps, Text } from "react-native";

type Props = ViewProps & {
  name: string;
};

export default function GenreChip({ name, ...props }: Props) {
  return (
    <View className="px-3 py-1 bg-blue-400 rounded-xl mr-1 mb-1" {...props}>
      <Text className="font-text-bold uppercase text-blue-700" style={{ fontSize: 9 }}>
        {name}
      </Text>
    </View>
  );
}
