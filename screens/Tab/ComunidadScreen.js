import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

//Icons
import { FontAwesome } from '@expo/vector-icons';

export default function ComunidadScreen() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable onPress={() => navigation.openDrawer()}>
                    <Image
                        source={require("../../assets/user.png")}
                        style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }}
                    />
                </Pressable>
            ),
        });
    }, []);

    return (
        <View>
            <Text>ComunidadScreen</Text>
        </View>
    );
}