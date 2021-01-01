import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DummyDoctor} from '../../assets';
import {Header, ListDoctor} from '../../components';
import {colors} from '../../utils';

const ChooseDoctor = () => {
  return (
    <View style={styles.page}>
      <Header title="Pilih Dokter" type="dark" />
      <ListDoctor
        profile={DummyDoctor}
        name="dr. Tamara"
        msg="Wanita"
        type="next"
      />
      <ListDoctor
        profile={DummyDoctor}
        name="dr. Tamara"
        msg="Wanita"
        type="next"
      />
      <ListDoctor
        profile={DummyDoctor}
        name="dr. Tamara"
        msg="Wanita"
        type="next"
      />
      <ListDoctor
        profile={DummyDoctor}
        name="dr. Tamara"
        msg="Wanita"
        type="next"
      />
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
});
