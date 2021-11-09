import React from 'react';
import styled from 'styled-components';
import {ScrollView} from 'react-native-gesture-handler';
import {gql, useQuery} from '@apollo/client';

import Char from '../components/Char';

const CHARS_QUERY = gql`
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;
export default function Home({navigation}) {
  const {data, loading} = useQuery(CHARS_QUERY);
  return (
    <MainContainer>
      <LogoContainer>
        <LogoImage source={require('../assets/main-logo.png')} />
      </LogoContainer>

      <Label>ABOUT</Label>
      <AboutText>
        An animated series on adult-swim about the infinite adventures of Rick,
        a genius alcoholic and careless scientist, with his grandson Morty, a 14
        year-old anxious boy who is not so smart. Together, they explore the
        infinite universes; causing mayhem and running into trouble.
      </AboutText>
      <Label>STARS</Label>
      {!loading && (
        <CharList>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingLeft: 10}}>
            {data.characters.results.map((item, index) => (
              <Char key={index} item={item} navigation={navigation} />
            ))}
          </ScrollView>
        </CharList>
      )}
    </MainContainer>
  );
}

const MainContainer = styled.SafeAreaView`
  background: #f5efdf;
  flex: 1;
`;

const LogoContainer = styled.View`
  width: 272px;
  height: 195px;
  margin-top: 30px;
  align-self: center;
`;
const LogoImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const Label = styled.Text`
  font-size: 26px;
  color: #131006;
  font-weight: 800;
  padding: 20px 0 5px 20px;
`;

const AboutText = styled.Text`
  font-size: 16px;
  color: #131006;
  font-weight: 500;
  padding: 0px 20px 20px;
  opacity: 0.6;
  line-height: 20px;
`;

const CharList = styled.View`
  padding: 8px 0px;
`;
