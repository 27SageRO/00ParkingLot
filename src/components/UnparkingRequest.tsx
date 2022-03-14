import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import R from 'res/R';

type Props = {
  entry?: Slot;
  onRequestClose: () => void;
  onPressUnpark: (entry: Slot) => void;
};

export default memo(({entry, onRequestClose, onPressUnpark}: Props) => {
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
          <Text style={styles.h1}>
            Are you sure you want to unpark this vehicle?
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              android_ripple={{color: R.colors.color3}}
              onPress={() => entry && onPressUnpark(entry)}>
              <Text style={styles.buttonText}>Yes</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              android_ripple={{color: R.colors.color3}}
              onPress={onRequestClose}>
              <Text style={styles.buttonText}>No</Text>
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
    marginHorizontal: 8,
    marginVertical: 16,
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: R.colors.black,
    borderWidth: StyleSheet.hairlineWidth,
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
