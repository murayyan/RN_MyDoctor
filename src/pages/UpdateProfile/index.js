import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {colors, getData, storeData} from '../../utils';
import {Fire} from '../../config';
import {showMessage} from 'react-native-flash-message';
import ImagePicker from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      console.log('storage', data);
      setPhoto({uri: res.photo});
      setPhotoForDB(res.photo);
      setProfile(data);
      // console.log(data.photo);
    });
  }, []);

  const update = () => {
    const data = profile;
    data.photo = photoForDB;
    console.log('update', data.photo);
    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: 'Password kurang dari 6 karakter',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        Fire.auth().onAuthStateChanged((user) => {
          if (user) {
            user.updatePassword(password).catch((err) => {
              showMessage({
                message: err.message,
                type: 'default',
                backgroundColor: colors.error,
                color: colors.white,
              });
            });
          }
        });
      }
    }
    Fire.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        console.log('success update', data);
        storeData('user', data);
      })
      .catch((err) => {
        showMessage({
          message: err.message,
          type: 'default',
          color: colors.error,
        });
      });
    navigation.replace('MainApp');
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
    console.log('change', profile);
    console.log('photoForDB', photoForDB);
    // console.log('changeText', profile.photo.uri);
  };

  const getImage = () => {
    ImagePicker.launchImageLibrary(
      {quality: 0.2, maxWidth: 200, maxHeight: 200},
      (response) => {
        console.log('response', response);
        if (response.didCancel || response.error) {
          showMessage({
            message: "Oops, you didn't select the photo",
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          const source = {uri: response.uri};
          console.log(source);
          setPhotoForDB(`data:${response.type};base64, ${response.data}`);
          setPhoto(source);
        }
      },
    );
  };
  return (
    <View style={styles.page}>
      <Header
        title="Edit Profile"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={(value) => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Job"
            value={profile.profession}
            onChangeText={(value) => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="password"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
