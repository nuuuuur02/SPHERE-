import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddPostScreen from './AddPostScreen';

// Mocks
jest.mock('@react-native-firebase/auth', () => ({
  currentUser: {
    displayName: 'TestUser',
    photoURL: 'https://example.com/avatar.jpg',
  },
}));

jest.mock('@react-native-firebase/storage', () => ({
  ref: jest.fn(),
  uploadBytesResumable: jest.fn(),
  getDownloadURL: jest.fn().mockResolvedValue('https://example.com/post.jpg'),
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
    assets: [{ uri: 'file://path/to/image.jpg' }],
  }),
  launchCameraAsync: jest.fn().mockResolvedValue({
    cancelled: false,
    assets: [{ uri: 'file://path/to/image.jpg' }],
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
      postImg: 'https://example.com/post.jpg', 
      userName: 'TestUser',
      userImg: 'https://example.com/avatar.jpg', 
    });
  });
});