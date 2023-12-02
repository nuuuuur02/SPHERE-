import styled from 'styled-components';


export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #2e64e515;
`;

export const Card = styled.View`
    background-color: #f8f8f8;
    border-radius: 25px;
    margin-top: 20px;
    width: 100%;
    align-ttems:center;
`;

export const InputField = styled.TextInput`
    justify-content: center;
    align-items: center;
    font-size: 24px;
    text-align: center;
    width:90%;
    margin-bottom: 15px;
`;

export const AddImage = styled.Image`
    width:95%;
    height: 250px;
    margin-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius:25px;
`;

export const StatusWrapper = styled.View`
    justify-content: center;
    align-items: center;
`;

export const SubmitBtn = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    background-color: #d9cffb;
    border-radius: 50px;
    padding: 10px 25px;
`;

export const SubmitBtnText = styled.Text`
    font-size: 18px; 
    font-weight: bold;
    color: black;
`;