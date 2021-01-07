import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ILNullPhoto} from '../../assets';
import {Gap, Header, List, Profile} from '../../components';
import {colors, getData} from '../../utils';
import {Fire} from '../../config';
import {showMessage} from 'react-native-flash-message';

const UserProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: ILNullPhoto,
  });
  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(data);
    });
  }, []);

  const signOut = () => {
    Fire.auth()
      .signOut()
      .then((res) => {
        navigation.replace('GetStarted');
      })
      .catch((err) => {
        showMessage({
          message: err.message,
          type: 'default',
          color: colors.error,
        });
      });
  };
  return (
    <View style={styles.page}>
      <Header
        title="Profile"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile
          name={profile.fullName}
          desc={profile.profession}
          photo={profile.photo}
        />
      )}
      <Gap height={14} />
      <List
        name="Edit Profile"
        msg="Last Update Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Language"
        msg="Last Update Yesterday"
        type="next"
        icon="language"
      />
      <List name="Rate" msg="Last Update Yesterday" type="next" icon="rate" />
      <List
        name="Sign Out"
        msg="Last Update Yesterday"
        type="next"
        icon="help"
        onPress={signOut}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
