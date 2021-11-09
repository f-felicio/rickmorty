import React, {useState} from 'react';
import {Alert, Dimensions, Image} from 'react-native';
import styled from 'styled-components';
import {ScrollView} from 'react-native-gesture-handler';
import {gql, useQuery} from '@apollo/client';
import * as ImagePicker from 'react-native-image-picker';

import Char from '../components/Char';

const {width} = Dimensions.get('window');

const DETAILS_QUERY = gql`
  query Episodes($id: ID!) {
    episode(id: $id) {
      episode
      name
      air_date
      characters {
        id
        name
        image
      }
    }
  }
`;

export default function EpisodeDetails({route, navigation}) {
  const [photo, setPhoto] = useState(null);
  const {data, loading} = useQuery(DETAILS_QUERY, {
    variables: {id: route.params?.id},
  });
  const selectPhotoTapped = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        const type = response.assets[0].type;
        const name = response.assets[0].fileName;
        const source = {
          uri,
          type,
          name,
        };
        cloudinaryUpload(source);
      }
    });
  };

  const cloudinaryUpload = photo => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'mnomlvpb');
    data.append('cloud_name', 'mnomlvpb');
    fetch('https://api.cloudinary.com/v1_1/rejogue/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        setPhoto(data.secure_url);
      })
      .catch(err => {
        Alert.alert(`An Error Occured While Uploading: ${err}`);
      });
  };

  return (
    <Main>
      {!loading && (
        <>
          <Image
            source={{
              uri:
                photo ||
                'https://cdn.bhdw.net/im/rick-and-morty-breaking-bad-papel-de-parede-55019_L.jpg',
            }}
            style={{width, height: 260}}
          />
          <BtnUpload onPress={selectPhotoTapped}>
            <BtnTxt>Upload new image</BtnTxt>
          </BtnUpload>
          <Row>
            <Btn onPress={() => navigation.goBack()}>
              <BtnTxt>{'< Back'}</BtnTxt>
            </Btn>
            <Btn onPress={() => navigation.navigate('Home')}>
              <BtnTxt>{'HOME'}</BtnTxt>
            </Btn>
          </Row>
          <Row>
            <CodeContainer>
              <Code>{data.episode.episode}</Code>
            </CodeContainer>
          </Row>
          <Row>
            <InfoContainer>
              <Info>{data.episode.air_date}</Info>
            </InfoContainer>
          </Row>
          <Name>{data.episode.name}</Name>
          <Label>Characters</Label>
          <CharsList>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingLeft: 10}}>
              {data.episode.characters.map((item, index) => (
                <Char key={index} item={item} navigation={navigation} />
              ))}
            </ScrollView>
          </CharsList>
        </>
      )}
    </Main>
  );
}

const Main = styled.View`
  background: #f5efdf;
  flex: 1;
`;
const Btn = styled.TouchableOpacity`
  border-radius: 30px;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  background-color: #1a0300;
`;
const BtnTxt = styled.Text`
  font-size: 12px;
  color: #fff;
  text-align: center;
  font-weight: bold;
`;
const BtnUpload = styled.TouchableOpacity`
  border-radius: 30px;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: #309975;
  margin: 16px 0;
`;
const Row = styled.View`
  flex-direction: row;
  padding: 0px 15px;
  margin-bottom: 8px;
  justify-content: space-between;
`;

const CodeContainer = styled.View`
  padding: 4px 16px;
  align-items: center;
  background-color: #ff6150;
  border-radius: 16px;
  margin-top: 30px;
`;
const Code = styled.Text`
  font-size: 12px;
  color: #fff;
  font-weight: bold;
`;
const InfoContainer = styled.View`
  padding: 4px 16px;
  align-items: center;
  background-color: #4da6d1;
  border-radius: 16px;
`;
const Info = styled.Text`
  font-size: 12px;
  color: #fff;
  font-weight: bold;
`;

const Name = styled.Text`
  font-size: 24px;
  color: #131006;
  font-weight: 800;
  padding: 20px 0 5px 20px;
`;

const Label = styled.Text`
  font-size: 18px;
  color: #131006;
  font-weight: bold;
  padding-left: 20px;
  margin-top: 30px;
`;

const CharsList = styled.View`
  padding: 8px 0px;
`;
