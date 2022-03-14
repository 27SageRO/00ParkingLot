import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import R from 'res/R';
import helpers from '../helpers';

type Props = {
  entry?: Slot;
  onRequestClose: () => void;
  onPressParking: (entry: Slot, vehicleSize: number) => void;
};

export default memo(({entry, onRequestClose, onPressParking}: Props) => {
  return (
    <Modal
      style={{margin: 0}}
      swipeDirection="down"
      isVisible={entry !== undefined}
      onSwipeComplete={onRequestClose}
      hardwareAccelerated
      useNativeDriverForBackdrop>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.h1}>Choose the size of vehicle to park</Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              android_ripple={{color: R.colors.color3}}
              onPress={() =>
                entry && onPressParking(entry, helpers.SMALL_VEHICLE)
              }>
              <Text style={styles.buttonEmoji}>
                {helpers.VEHICLE_EMOJIS[helpers.SMALL_VEHICLE]}
              </Text>
              <Text style={styles.buttonText}>Small</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              android_ripple={{color: R.colors.color3}}
              onPress={() =>
                entry && onPressParking(entry, helpers.MEDIUM_VEHICLE)
              }>
              <Text style={styles.buttonEmoji}>
                {helpers.VEHICLE_EMOJIS[helpers.MEDIUM_VEHICLE]}
              </Text>
              <Text style={styles.buttonText}>Medium</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              android_ripple={{color: R.colors.color3}}
              onPress={() =>
                entry && onPressParking(entry, helpers.LARGE_VEHICLE)
              }>
              <Text style={styles.buttonEmoji}>
                {helpers.VEHICLE_EMOJIS[helpers.LARGE_VEHICLE]}
              </Text>
              <Text style={styles.buttonText}>Large</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 200,
    backgroundColor: R.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    color: R.colors.black,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 4,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonEmoji: {
    fontSize: 40,
  },
  buttonText: {
    color: R.colors.black,
    fontSize: 11,
    marginTop: 2,
  },
});
