import React from 'react';
import styled from 'styled-components';

export default function Episode({item, navigation}) {
  return (
    <Main
      onPress={() => {
        navigation.navigate('Episode', {
          id: item.id,
        });
      }}>
      <Title>
        {item.episode} - {item.name}
      </Title>
    </Main>
  );
}

const Main = styled.TouchableOpacity`
  flex-direction: column;
  width: 100%;
  align-content: space-between;
  padding-left: 25px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #131006;
  margin-bottom: 16px;
`;
