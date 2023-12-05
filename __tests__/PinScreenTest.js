import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Principal from './Principal';

// Mocks
jest.mock('@react-native-firebase/auth', () => ({
  currentUser: {
    displayName: 'TestUser',
    photoURL: 'https://https://media.licdn.com/dms/image/D4E03AQFfxLOdeC7DuQ/profile-displayphoto-shrink_400_400/0/1682706569822?e=1703116800&v=beta&t=852VlgPDbMXRP_Lv-xF2rjKU-3GWIepCD1DbHUYa6_g.com/avatar.jpg',
    pin: '1234',
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

describe('Principal Screen', () => {
  test('Handle Image Click with correct PIN', () => {
    const { getByText, getByPlaceholderText } = render(<Principal navigation={{ navigate: jest.fn() }} />);
    
    fireEvent.changeText(getByPlaceholderText('Ingrese el PIN:'), '1234');
    
    fireEvent.press(getByText('Enviar'));
    
    expect(navigation.navigate).toHaveBeenCalledWith('PrincipalEvento');
  });

  test('Handle Image Click with incorrect PIN', () => {
    const { getByText, getByPlaceholderText } = render(<Principal navigation={{ navigate: jest.fn() }} />);
    
    fireEvent.changeText(getByPlaceholderText('Ingrese el PIN:'), '0000'); 
    
    fireEvent.press(getByText('Enviar'));
    
    expect(navigation.navigate).not.toHaveBeenCalledWith('PrincipalEvento');
    
    expect(console.warn).toHaveBeenCalledWith('PIN incorrecto');
  });

});