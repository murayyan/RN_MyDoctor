import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {DummyHospital, ILHospitalBG} from '../../assets';
import {ListHospital} from '../../components';
import {colors, fonts} from '../../utils';

const Hospitals = () => {
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Nearby Hospital</Text>
        <Text style={styles.desc}>3 available</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ListHospital
          type="Rumah Sakit"
          name="Mitra Keluarga"
          address="Jl. Soekarno Hatta"
          pic={DummyHospital}
        />
        <ListHospital
          type="Rumah Sakit"
          name="Mitra Keluarga"
          address="Jl. Soekarno Hatta"
          pic={DummyHospital}
        />
        <ListHospital
          type="Rumah Sakit"
          name="Mitra Keluarga"
          address="Jl. Soekarno Hatta"
          pic={DummyHospital}
        />
      </View>
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    paddingTop: 14,
  },
});
