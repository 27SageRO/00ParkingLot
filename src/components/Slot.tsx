import React, {memo, useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import helpers from '../helpers';
import R from 'res/R';

type Props = {
  size: number;
  onPressEntry: (slot: Slot) => void;
  onPressUnpark: (slot: Slot) => void;
} & Slot;

export default memo(({size, onPressEntry, onPressUnpark, ...slot}: Props) => {
  const [fee, setFee] = useState(helpers.FLAT_RATE);
  const sizes = {height: size, width: size};
  const timer = useRef<any>();
  const hour = useRef(0);

  useEffect(() => {
    // Calculate fee based on constraint
    // parking size and 24 hour basis
    if (slot.available) {
      timer.current = setInterval(() => {
        // Increment hour
        hour.current += 1;
        // 24 hour basis
        if (hour.current % 24 === 0) {
          setFee(fee + helpers.RATE_PER_24_HOURS);
        }
        // Hourly
        else if (hour.current >= helpers.HOURLY_RATE_CONSTRAINT) {
          setFee(fee + helpers.RATE_PER_SIZE[slot.slotSize]);
        }
      }, 1000 * 60 * 60); // Timer will tick every hour
    } else if (!slot.available && timer.current) {
      clearInterval(timer.current);
      hour.current = 0;
    }
  }, [slot.available]);

  const renderInfo = () => {
    return (
      <Text style={styles.info}>
        {helpers.SLOT_SIZES[slot.slotSize]}
        {!slot.available ? ` - P${fee}` : null}
      </Text>
    );
  };

  if (slot.isEntry) {
    return (
      <Pressable
        style={[sizes, styles.card, styles.entry]}
        onPress={() => onPressEntry(slot)}
        android_ripple={{color: R.colors.white}}>
        <Text style={styles.info}>Entry</Text>
      </Pressable>
    );
  } else if (slot.available) {
    return (
      <View style={[sizes, styles.card, styles.available]}>{renderInfo()}</View>
    );
  }

  return (
    <Pressable
      style={[sizes, styles.card, styles.unavailable]}
      android_ripple={{color: R.colors.white}}
      onPress={() => onPressUnpark(slot)}>
      <Text style={styles.vehicleEmoji}>
        {helpers.VEHICLE_EMOJIS[slot.vehicleSize]}
      </Text>
      {renderInfo()}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    padding: 4,
  },
  entry: {
    backgroundColor: R.colors.color1,
    margin: 2.5,
  },
  available: {
    backgroundColor: R.colors.color2,
    margin: 2.5,
  },
  unavailable: {
    backgroundColor: R.colors.color3,
    margin: 2.5,
  },
  vehicleEmoji: {
    fontSize: 17,
  },
  info: {
    color: R.colors.white,
    fontSize: 11,
    position: 'absolute',
    bottom: 4,
    left: 4,
  },
});
