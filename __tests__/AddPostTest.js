import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddPostScreen from './AddPostScreen';

// Mocks
jest.mock('@react-native-firebase/auth', () => ({
  currentUser: {
    displayName: 'TestUser',
    photoURL: 'https://https://media.licdn.com/dms/image/D4E03AQFfxLOdeC7DuQ/profile-displayphoto-shrink_400_400/0/1682706569822?e=1703116800&v=beta&t=852VlgPDbMXRP_Lv-xF2rjKU-3GWIepCD1DbHUYa6_g.com/avatar.jpg',
  },
}));

jest.mock('@react-native-firebase/storage', () => ({
  ref: jest.fn(),
  uploadBytesResumable: jest.fn(),
  getDownloadURL: jest.fn().mockResolvedValue('https://firebasestorage.googleapis.com/v0/b/niideapepe-45402.appspot.com/o/Images%2F1701364928237?alt=media&token=7327ae8f-c52b-4c46-b416-ad94df39c6bd'),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
  Timestamp: {
    fromDate: jest.fn(),
  },
}));

// Mock ImagePicker
jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn().mockResolvedValue({
    cancelled: false,
    assets: [{ uri: 'https://media.licdn.com/dms/image/D4E03AQFfxLOdeC7DuQ/profile-displayphoto-shrink_400_400/0/1682706569822?e=1703116800&v=beta&t=852VlgPDbMXRP_Lv-xF2rjKU-3GWIepCD1DbHUYa6_g' }],
  }),
  launchCameraAsync: jest.fn().mockResolvedValue({
    cancelled: false,
    assets: [{ uri: 'https://media.licdn.com/dms/image/D4E03AQFfxLOdeC7DuQ/profile-displayphoto-shrink_400_400/0/1682706569822?e=1703116800&v=beta&t=852VlgPDbMXRP_Lv-xF2rjKU-3GWIepCD1DbHUYa6_g' }],
  }),
}));

describe('AddPostScreen', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText } = render(<AddPostScreen />);
    const inputField = getByPlaceholderText('Buen dia');
    expect(inputField).toBeTruthy();
  });

  test('crea post al pulsar boton', async () => {
    const { getByText, getByPlaceholderText } = render(<AddPostScreen />);

    // Ver text
    const inputField = getByPlaceholderText('Buen dia');
    fireEvent.changeText(inputField, 'This is a test post');

    // Mock img 
    await fireEvent.press(getByText('Galería'));

    // button press
    await fireEvent.press(getByText('Post'));

    expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
      post: 'This is a test post',
      postImg: 'https://firebasestorage.googleapis.com/v0/b/niideapepe-45402.appspot.com/o/Images%2F1701364928237?alt=media&token=7327ae8f-c52b-4c46-b416-ad94df39c6bd', 
      userName: 'TestUser',
      userImg: 'https://media.licdn.com/dms/image/D4E03AQFfxLOdeC7DuQ/profile-displayphoto-shrink_400_400/0/1682706569822?e=1703116800&v=beta&t=852VlgPDbMXRP_Lv-xF2rjKU-3GWIepCD1DbHUYa6_g', 
    });
  });
});