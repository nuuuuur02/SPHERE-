import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddUser from '../screens/RegisterScreen';
import { createUserWithEmailAndPassword, updateProfile } from '@react-native-firebase/auth';

// Mock de Firebase
jest.mock('@react-native-firebase/auth', () => ({
    auth: jest.fn(() => ({
        createUserWithEmailAndPassword,
        updateProfile,
    })),
}));

jest.mock('AddParametersUser', () => ({
    AddParametersUser: jest.fn(),
}));

describe('AddUser', () => {
    it('registers a user in Firebase and navigates to HomeMain', async () => {
        //Usuario de prueba
        const email = 'test@example.com';
        const password = 'testpassword';
        const repeatPassword = 'testpassword';
        const nick = 'Test Nick';

        createUserWithEmailAndPassword.mockResolvedValueOnce({
            user: {
                email,
                uid: 'uid',
            },
        });

        updateProfile.mockResolvedValueOnce();

        AddParametersUser.mockResolvedValueOnce();

        // Renderiza el componente
        const { getByPlaceholderText, getByText } = render(<AddUser />);

        // Simula la interacción del usuario
        fireEvent.changeText(getByPlaceholderText('Email'), email);
        fireEvent.changeText(getByPlaceholderText('Password'), password);
        fireEvent.changeText(getByPlaceholderText('Repeat Password'), repeatPassword);
        fireEvent.changeText(getByPlaceholderText('Nick'), nick);
        fireEvent.changeText(getByPlaceholderText('Photo'), photo);

        fireEvent.press(getByText('Register'));

        await Promise.resolve();

        // Verifica que se hayan llamado correctamente
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
        expect(updateProfile).toHaveBeenCalledWith(expect.objectContaining({
            displayName: nick,
            photoURL: photo,
        }));

        expect(AddParametersUser).toHaveBeenCalled();
    });
});