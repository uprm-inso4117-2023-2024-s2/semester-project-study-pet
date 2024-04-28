import {Button, View} from "react-native";
import {
    KITCHEN_BACKGROUND,
    LIVING_ROOM_BACKGROUND,
    saveBackground,
    YARD_BACKGROUND
} from "../components/SettingsManagement";

const Settings = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button title="kitchen" onPress={() => saveBackground(KITCHEN_BACKGROUND)}></Button>
            <Button title="living room" onPress={() => saveBackground(LIVING_ROOM_BACKGROUND)}></Button>
            <Button title="yard" onPress={() => saveBackground(YARD_BACKGROUND)}></Button>
        </View>
    );
};


export default Settings