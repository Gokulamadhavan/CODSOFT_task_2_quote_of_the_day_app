import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const quotes = [
  "The best way to get started is to quit talking and begin doing.",
  "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
  "Don't let yesterday take up too much of today.",
  // Add more quotes here...
];

const getQuoteOfTheDay = () => {
  const today = new Date().toDateString();
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const HomeScreen = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      const savedDate = await AsyncStorage.getItem('quoteDate');
      const savedQuote = await AsyncStorage.getItem('quote');

      const today = new Date().toDateString();
      if (savedDate === today && savedQuote) {
        setQuote(savedQuote);
      } else {
        const newQuote = getQuoteOfTheDay();
        setQuote(newQuote);
        await AsyncStorage.setItem('quoteDate', today);
        await AsyncStorage.setItem('quote', newQuote);
      }
    };

    fetchQuote();
  }, []);

  const shareQuote = async () => {
    try {
      await Share.share({
        message: quote,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const saveFavorite = async () => {
    try {
      let favorites = await AsyncStorage.getItem('favorites');
      favorites = favorites ? JSON.parse(favorites) : [];
      if (!favorites.includes(quote)) {
        favorites.push(quote);
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.quote}>{quote}</Text>
      <Button title="Share Quote" onPress={shareQuote} />
      <Button title="Save to Favorites" onPress={saveFavorite} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  quote: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black', // Change text color to black
  },
});

export default HomeScreen;
