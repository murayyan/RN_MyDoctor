import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DummyDoctor} from '../../assets';
import {Header, ListDoctor} from '../../components';
import {colors} from '../../utils';

const ChooseDoctor = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Pilih Dokter"
        type="dark"
        onPress={() => navigation.goBack()}
      />
      <ListDoctor
        profile={DummyDoctor}
        name="dr. Tamara"
        msg="Wanita"
        type="next"
        onPress={() => navigation.navigate('Chat')}
      />
      <ListDoctor
        profile={DummyDoctor}
        name="dr. Tamara"
        msg="Wanita"
        type="next"
        onPress={() => navigation.navigate('Chat')}
      />
      <ListDoctor
        profile={DummyDoctor}
        name="dr. Tamara"
        msg="Wanita"
        type="next"
        onPress={() => navigation.navigate('Chat')}
      />
      <ListDoctor
        profile={DummyDoctor}
        name="dr. Tamara"
        msg="Wanita"
        type="next"
        onPress={() => navigation.navigate('Chat')}
      />
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
});
