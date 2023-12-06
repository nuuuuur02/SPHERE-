import styled from 'styled-components';

export const Container = styled.View`
  flex:1;
  align-items: center;
  
  background-color: #fff;  
`;

export const Card = styled.View`
    background-color: #f8f8f8;
    border-radius: 25px;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
`;

export const CardCom = styled.View`
    
    background-color: grey;
    margin-top: 20px;
    border-radius: 25px;
    margin-left: 10px;
    margin-right: 10px;
`;

export const CardDiary = styled.View`
    flex: 1;    
    background-color: f8f8f8;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    margin-top: 10px;

`;

export const CardDiaryCom = styled.View`
    background-color: #DACEFC;
    border-radius: 25px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    
`;

export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: 15px;
    
`;

export const UserImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;

export const UserInfoText = styled.View`
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
`;

export const UserName = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

export const UserNameDiary = styled.Text`
    font-size: 20px;
    font-weight: bold;
    align-self: center;
    margin-top: 10px;
`;

export const PostTime = styled.Text`
    font-size: 12px;
    color: #666;
`;

export const PostText = styled.Text`
    font-size: 13px;
    padding-right: 15px;
    margin-bottom: 15px;
    padding-left: 75px;
`;

export const DiaryText = styled.Text`
    font-size: 13px;
    padding-right: 15px;
    margin-bottom: 15px;
    margin-top: 15px;
    padding-left: 25px;
    padding-right: 25px;
`;

export const PostImg = styled.Image`
    width: 100%;
    height: 250px;
    /* margin-top: 15px; */
`;

export const UserImgDiary = styled.Image`
    margin-top: 40px;
    align-self: center;
    width: 125px;
    height: 125px;
    border-radius: 25px;
`;

export const userFeelingImg = styled.Image`
    
`;

export const Divider = styled.View`
    border-bottom-color: #dddddd;
    border-bottom-width: 1px;
    width: 92%;
    align-self: center;
    margin-top: 15px;
`;

export const InteractionWrapper = styled.View`
    flex-direction: row;
    justify-content: flex-end; 
    padding: 15px;
    width: 95%; 
    align-self: stretch;
`;

export const Interaction = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    border-radius: 5px;
    padding: 2px 5px;
    background-color: ${props => props.active ? '#2e64e515' : 'transparent'}
`;

export const InteractionText = styled.Text`
    font-size: 12px;
    
    font-weight: bold;
    color: ${props => props.active ? '#2e64e5' : '#333'};
    margin-top: 5px;
    margin-left: 5px;
`;

export const AddDiaryBar = styled.View`
    flexDirection: row;
    justifyContent: space-between;
    paddingHorizontal: 16px;
    paddingVertical: 8px;
    margin-top: 20px;
`;

export const NoteButton = styled.TouchableOpacity`
  
  height: 40px;
  width: 140px;
  borderRadius: 20px;
  backgroundColor: #FFD37E;
  justifyContent: center;
  alignItems: center;
`;
