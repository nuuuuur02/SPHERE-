import React from 'react';
import { render } from '@testing-library/react-native';
import ChatScreen from '../screens/TobTab/GrupalChat/ChatScreen';

describe('ChatScreen', () => {
    test('postMessage should update messages correctly', async () => {
        const message = {
            _id: '1',
            text: 'Hello, testing!',
            createdAt: new Date(),
            user: {
                _id: 'user1',
                name: 'John Doe',
                avatar: 'https://example.com/avatar.jpg',
            },
        };

        // Mock Firebase functions
        const getDoc = jest.fn(() => ({
            exists: jest.fn(() => true),
            data: jest.fn(() => ({
                _messages: [],
            })),
        }));
        const updateDoc = jest.fn();

        jest.mock('firebase/firestore', () => ({
            doc: jest.fn(),
            getDoc,
            updateDoc,
        }));

        // Render the component
        const { getByText } = render(<ChatScreen route={{ params: { item: { id: 'postId' } } }} />);

        // Call postMessage
        await ChatScreen.prototype.postMessage(message);

        // Assertions
        expect(getDoc).toHaveBeenCalledWith(expect.anything(), 'postId');
        expect(updateDoc).toHaveBeenCalledWith(expect.anything(), {
            _messages: [message],
            messageTime: expect.any(Date),
        });
    });
});