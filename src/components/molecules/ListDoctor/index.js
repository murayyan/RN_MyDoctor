import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {IconNext} from '../../../assets';
import {colors, fonts} from '../../../utils';

const ListDoctor = ({profile, name, msg, type}) => {
  return (
    <View style={styles.container}>
      <Image source={profile} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.msg}>{msg}</Text>
      </View>
      {type === 'next' && <IconNext />}
    </View>
  );
};

export default ListDoctor;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {flex: 1},
  avatar: {width: 46, height: 46, borderRadius: 46 / 2, marginRight: 12},
  name: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  msg: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
  },
});
