import React from 'react';
import styled from 'styled-components';

export default function Char({item, navigation}) {
  return (
    <Main
      onPress={() => {
        navigation.navigate('Character', {
          id: item.id,
        });
      }}>
      <Cover>
        <CoverPhoto
          source={{
            uri: item.image,
          }}
          resizeMode="cover"
        />
      </Cover>
      <Name>{item.name}</Name>
    </Main>
  );
}

const Main = styled.TouchableOpacity`
  flex-direction: column;
  width: 95px;
  align-content: space-between;
  align-items: center;
`;

const Cover = styled.View`
  width: 80px;
  height: 95px;
  border: 2px solid #222;
  border-radius: 16px;
  overflow: hidden;
`;

const CoverPhoto = styled.Image`
  width: 100%;
  height: 100%;
`;

const Name = styled.Text`
  font-size: 12px;
  color: #131006;
  margin-top: 8px;
  font-weight: bold;
  text-align: center;
`;
