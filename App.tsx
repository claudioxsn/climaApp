import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

function App(): React.JSX.Element {

  const [city, setCity] = useState<string>('');
  const [humidity, setHumidity] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [rainProbability, setRainProbability] = useState<string>('');
  const [feelsLike, setFeelsLike] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [night, setNight] = useState<boolean>(false);

  function isNight(hour: number) {
    //  console.log(hour)
    if (hour >= 18 || hour < 6) {
      setNight(true)
    } else {
      setNight(false)
    }
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.137.11.202:8000/api/weather/now/info');
        setCity(response.data.city)
        setHumidity(response.data.humidity)
        setCondition(response.data.condition)
        setRainProbability(response.data.rainProbability)
        setFeelsLike(response.data.feelsLike)
        setTemperature(response.data.temperature)
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    // verifica as horas dentro do intervalo de tempo para alterar a cor e ícones da tela
    const intervalId = setInterval(() => {
      const hour = new Date().getHours();
      isNight(hour);
    }, 6000)
  }, []);

  return (
    <View style={[styles.container, night == false ? styles.containerBgDay : styles.containerBgNight]}>
      <View style={styles.header}>
        <Text style={styles.city}>{city}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.temperature}>{temperature} ºC</Text>
        <Image source={night ? require('./src/assets/images/noite.png') : require('./src/assets/images/icon3.png')} style={styles.weatherIcon} />
      </View>
      <View>
        <Text style={styles.weatherCondition}> {condition}</Text>
        <Text style={styles.text}>Sensação Térmica: {feelsLike} ºC</Text>
        <Text style={styles.text}>Probabilidade de Chuva: {rainProbability}%</Text>
        <Text style={styles.text}>Umidade: {humidity}%</Text>
      </View>
      <Image source={require('./src/assets/images/cidade.png')} style={styles.bottomgImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomgImage: {
    width: '115%',
    height: '57%',
    position: 'absolute',
    bottom: 0,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },

  city: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#fff'
  },

  weatherIcon: {
    width: 100,
    height: 100,
    alignSelf: 'flex-end',
    marginBottom: 20,
    flexDirection: 'row'
  },

  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  weatherCondition: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginBottom: 20,
    color: '#fff'
  },

  temperature: {
    fontSize: 55,
    marginBottom: 20,
    color: '#fff'
  },

  container: {
    flex: 1,
    padding: 20,
  },

  containerBgDay: {
    backgroundColor: '#09d3f3'
  },

  containerBgNight: {
    backgroundColor: '#333'
  },

  text: {
    fontSize: 17,
    color: '#fff',
    marginBottom: 10,
    fontStyle: 'italic'
  },

});

export default App;
