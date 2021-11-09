import React, {useState} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components';
import {ScrollView} from 'react-native-gesture-handler';
import {gql, useQuery} from '@apollo/client';
import * as ImagePicker from 'react-native-image-picker';

import Episode from '../components/Episode';

const DETAILS_QUERY = gql`
  query Characters($id: ID!) {
    character(id: $id) {
      name
      status
      type
      species
      gender
      image
      location {
        name
      }
      origin {
        name
      }
      episode {
        id
        episode
        name
      }
    }
  }
`;
export default function CharacterDetails({route, navigation}) {
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
          <BtnBack onPress={() => navigation.goBack()}>
            <BtnTxt>{'< Back'}</BtnTxt>
          </BtnBack>
          <Cover>
            <CoverPhoto
              source={{
                uri: photo || data.character.image,
              }}
              resizeMode="cover"
            />
          </Cover>
          <BtnUpload onPress={selectPhotoTapped}>
            <BtnTxt>Upload new image</BtnTxt>
          </BtnUpload>
          <Name>{data.character.name}</Name>
          <Row>
            <InfoContainer>
              <Label>Status</Label>
              <Info>{data.character.status}</Info>
            </InfoContainer>
            <InfoContainer>
              <Label>Species</Label>
              <Info>{data.character.species}</Info>
            </InfoContainer>
            <InfoContainer>
              <Label>Gender</Label>
              <Info>{data.character.gender}</Info>
            </InfoContainer>
          </Row>
          <Row>
            <InfoContainer>
              <Label>Location</Label>
              <Info>{data.character.location.name || '---'}</Info>
            </InfoContainer>
          </Row>
          <Row>
            <InfoContainer>
              <Label>Origin</Label>
              <Info>{data.character.origin.name}</Info>
            </InfoContainer>
          </Row>
          <Title>EPISODES</Title>
          <EpisodesList>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingVertical: 10}}>
              {data.character.episode.map((item, index) => (
                <Episode key={index} item={item} navigation={navigation} />
              ))}
            </ScrollView>
          </EpisodesList>
        </>
      )}
    </Main>
  );
}

const Main = styled.SafeAreaView`
  flex: 1;
  background: #f5efdf;
  padding-top: 20px;
`;
const BtnBack = styled.TouchableOpacity`
  border-radius: 30px;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  top: 10px;
  left: 15px;
  background-color: #1a0300;
`;
const BtnTxt = styled.Text`
  font-size: 12px;
  color: #fff;
  text-align: center;
  font-weight: bold;
`;
const Cover = styled.View`
  width: 150px;
  height: 160px;
  border-radius: 16px;
  overflow: hidden;
  align-self: center;
`;

const CoverPhoto = styled.Image`
  width: 100%;
  height: 100%;
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
const Name = styled.Text`
  font-size: 28px;
  color: #131006;
  font-weight: bold;
  text-align: center;
  padding: 8px 25px;
`;
const Row = styled.View`
  flex-direction: row;
  padding: 8px 16px;
  justify-content: space-around;
`;
const InfoContainer = styled.View`
  padding: 4px 16px;
  align-items: center;
`;
const Label = styled.Text`
  font-size: 12px;
  color: #131006;
  text-align: center;
  font-weight: bold;
`;
const Info = styled.Text`
  font-size: 18px;
  color: #4da6d1;
  text-align: center;
  font-weight: bold;
`;

const EpisodesList = styled.View`
  padding: 8px 0px;
  max-height: 310px;
`;

const Title = styled.Text`
  font-size: 18px;
  color: #131006;
  font-weight: bold;
  padding: 25px 25px 0;
`;
