import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, ToastAndroid} from 'react-native';
import Slot from 'components/Slot';
import helpers from './helpers';
import ParkingRequest from 'components/ParkingRequest';
import UnparkingRequest from 'components/UnparkingRequest';

const SLOT_SIZE = 60;

StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor('transparent');
StatusBar.setBarStyle('light-content');

const Root = () => {
  const [slots, setSlots] = useState<Slot[][]>(helpers.initSlots());
  const [park, setPark] = useState<Slot | undefined>();
  const [unpark, setUnpark] = useState<Slot | undefined>();

  return (
    <View style={styles.container}>
      {slots.map((row, rk) => (
        <View key={rk.toString()} style={styles.row}>
          {row.map((col, ck) => {
            return (
              <Slot
                key={ck.toString()}
                {...col}
                size={SLOT_SIZE}
                onPressEntry={slot => setPark(slot)}
                onPressUnpark={slot => setUnpark(slot)}
              />
            );
          })}
        </View>
      ))}
      <ParkingRequest
        entry={park}
        onRequestClose={() => setPark(undefined)}
        onPressParking={(entry, vehicleSize) => {
          const newSlots = helpers.park(entry, vehicleSize, slots);
          if (!newSlots) {
            ToastAndroid.show('No available slot', ToastAndroid.SHORT);
          } else {
            setSlots(newSlots);
          }
          setPark(undefined);
        }}
      />
      <UnparkingRequest
        entry={unpark}
        onRequestClose={() => setUnpark(undefined)}
        onPressUnpark={entry => {
          const newSlots = helpers.unpark(entry, slots);
          setSlots(newSlots);
          setUnpark(undefined);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});

export default Root;
