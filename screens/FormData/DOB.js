import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DOB = () => {
  const [selectedDay, setSelectedDay] = useState();

  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  useEffect(() => {
    setSelectedDay(1);
    setSelectedMonth(1);
    setSelectedYear(2022);
  }, []);

  const handleValueChange = (value, setValue) => {
    setValue(value);
  };

  const days = Array.from(new Array(31), (val, index) => index + 1);
  const dayItems = days.map(day => ({label: day.toString(), value: day}));

  const months = [
    {label: 'January', value: 1},
    {label: 'February', value: 2},
    {label: 'March', value: 3},
    {label: 'April', value: 4},
    {label: 'May', value: 5},
    {label: 'June', value: 6},
    {label: 'July', value: 7},
    {label: 'August', value: 8},
    {label: 'September', value: 9},
    {label: 'October', value: 10},
    {label: 'November', value: 11},
    {label: 'December', value: 12},
  ];

  const year = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => year - index);
  const yearItems = years.map(year => ({label: year.toString(), value: year}));

  return (
    <View>
      <Text style={styles.label}>Date of Birth</Text>

      <View style={styles.container}>
        <DropDownPicker
          open={open}
          setOpen={setOpen}
          items={dayItems}
          value={selectedDay}
          placeholder="Day"
          placeholderStyle={{color: '#FFFFFF'}}
          containerStyle={styles.dropdown}
          style={styles.dropdownContainer}
          itemStyle={styles.item}
          labelStyle={styles.label}
          arrowStyle={styles.arrow}
          dropDownStyle={styles.dropDown}
          onChangeItem={item => handleValueChange(item.value, setSelectedDay)}
        />
        <DropDownPicker
          open={open2}
          setOpen={setOpen2}
          items={months}
          defaultValue={selectedMonth}
          placeholder="Month"
          placeholderStyle={{color: '#FFFFFF'}}
          containerStyle={styles.dropdown}
          style={styles.dropdownContainer}
          itemStyle={styles.item}
          labelStyle={styles.label}
          arrowStyle={styles.arrow}
          dropDownStyle={styles.dropDown}
          onChangeItem={item => setSelectedMonth(item.value)}
        />
        <DropDownPicker
          open={open3}
          setOpen={setOpen3}
          items={yearItems}
          defaultValue={selectedYear}
          placeholder="Year"
          placeholderStyle={{color: '#FFFFFF'}}
          containerStyle={styles.dropdown}
          style={styles.dropdownContainer}
          itemStyle={styles.item}
          labelStyle={styles.label}
          arrowStyle={styles.arrow}
          dropDownStyle={styles.dropDown}
          onChangeItem={item => setSelectedYear(item.value)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 800,
    marginLeft: 4,
    marginTop: 10,
  },
  dropdown: {
    width: 100,
    height: 10,
    zIndex: 1000,
    backgroundColor: '#1A2134',
    borderRadius: 8,
    // fontWeight: 'bold',
    // color: '#FFFFFF',
    // fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 6,
  },
  dropdownContainer: {
    borderWidth: 2,
    justifyContent: 'space-between',
    backgroundColor: '#0E111B',
    borderColor: '#556080',
    fontWeight: 'bold',
    color: '#FFFFFF',
    height: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  item: {
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  arrow: {
    color: '#000',
  },
  dropDown: {
    backgroundColor: '#0E111B',
    borderRadius: 8,
    borderWidth: 10,
    borderColor: '#556080',
    borderWidth: 2,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    zIndex: 1000,
  },
});
export default DOB;
