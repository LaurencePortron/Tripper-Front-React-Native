import React, { useState } from 'react';
import { Calendar } from 'react-native-calendario';
import { View, StyleSheet } from 'react-native';

export default function CalendarExample({ dateRange, onChange }) {
  return (
    <View style={styles.calendarContainer}>
      <Calendar
        onChange={onChange}
        // minDate={new Date(2018, 3, 20)}
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        theme={{
          activeDayColor: {},
          monthTitleTextStyle: {
            color: '#6d95da',
            fontWeight: '300',
            fontSize: 16,
          },
          emptyMonthContainerStyle: {},
          emptyMonthTextStyle: {
            fontWeight: '200',
          },
          weekColumnsContainerStyle: {},
          weekColumnStyle: {
            paddingVertical: 10,
          },
          weekColumnTextStyle: {
            color: '#b6c1cd',
            fontSize: 13,
          },
          nonTouchableDayContainerStyle: {},
          nonTouchableDayTextStyle: {},
          startDateContainerStyle: {},
          endDateContainerStyle: {},
          dayContainerStyle: {},
          dayTextStyle: {
            color: '#2d4150',
            fontWeight: '200',
            fontSize: 15,
          },
          dayOutOfRangeContainerStyle: {},
          dayOutOfRangeTextStyle: {},
          todayContainerStyle: {},
          todayTextStyle: {
            color: '#6d95da',
          },
          activeDayContainerStyle: {
            backgroundColor: '#6d95da',
          },
          activeDayTextStyle: {
            color: 'white',
          },
          nonTouchableLastMonthDayTextStyle: {},
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({ calendarContainer: { height: 200 } });
