/*import ChatScreen from "../screens/TobTab/GrupalChat/ChatScreen";
import { render, screen } from "@testing-library/react-native"

test('test01', () => {
	render(<ChatScreen />)
	const allQuestions = screen.queryAllByRole('header');

	expect(allQuestions).toHaveLength(2);
})*/

import React from 'react';
import renderer from 'react-test-renderer';
//import ChatScreen from "../screens/TobTab/GrupalChat/ChatScreen";
import CreateChat from "../screens/TobTab/GrupalChat/CreateChat";

test('renders correctly', () => {
	const tree = renderer.create(<CreateChat />).toJSON();
	expect(tree).toMatchSnapshot();
});