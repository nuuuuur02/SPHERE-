import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import ResourcesList from '../components/ResourcesList';
import PictosScreen from './Tab/PictosScreen';

const RecursosPictosScreen = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <ResourcesList />
                <PictosScreen />
            </ScrollView>
        </SafeAreaView>
    );
};

export default RecursosPictosScreen;