import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import CreateChat from './CreateChat';
import * as firebase from 'firebase'; 

jest.mock('firebase', () => ({
  ...jest.requireActual('firebase'),
  auth: {
    currentUser: {
      email: 'testuser@example.com',
    },
  },
  db: {
    collection: jest.fn(() => ({
      addDoc: jest.fn(),
    })),
  },
  fetchSignInMethodsForEmail: jest.fn(() => []),
}));

describe('CreateChat component', () => {
  test('adds group when button is pressed with valid data', () => {
    const { getByPlaceholderText, getByText } = render(<CreateChat />);
    
    fireEvent.changeText(getByPlaceholderText('Nombre'), 'Test Group');
    fireEvent.changeText(getByPlaceholderText('Descripción'), 'Test Description');
    fireEvent.changeText(getByPlaceholderText('Foto'), 'https://picsum.photos/id/1084/536/354?grayscale');
    fireEvent.changeText(getByPlaceholderText('Usuarios'), 'user1@example.com user2@example.com');

    fireEvent.press(getByText('plus-circle'));

    expect(firebase.db.collection).toHaveBeenCalledWith('groups');
    expect(firebase.db.collection().addDoc).toHaveBeenCalledWith({
      userName: 'Test Group',
      messageText: 'Test Description',
      userImg: 'https://example.com/image.jpg',
      messageTime: expect.any(Date),
      usersInGroup: ['testuser@example.com', 'user1@example.com', 'user2@example.com'],
    });
  });
});
