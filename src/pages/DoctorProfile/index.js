import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Profile, ProfileItem, Button, Gap} from '../../components';
import {colors} from '../../utils';

const DoctorProfile = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
      <Profile name="dr.tamara" desc="sex" />
      <Gap height={10} />
      <ProfileItem label="Alumnus" value="Universitas Indonesia 2005" />
      <ProfileItem label="Tempat Praktik" value="RSU Saiful Anwar, Malang" />
      <ProfileItem label="No. STR" value="0000912912800" />
      <View style={styles.action}>
        <Button
          title="Start Consultation"
          onPress={() => navigation.navigate('Chat')}
        />
      </View>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
});
