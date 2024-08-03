import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CatContext = createContext();


export const CatProvider = ({ children }) => {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    // Load product from AsyncStorage when component mounts
    const loadcat = async () => {
      try {
        const storedcat = await AsyncStorage.getItem('cat');
        if (storedcat) {
            setCat(JSON.parse(storedcat));
        }
      } catch (error) {
        console.warn('Failed to load cat:', error);
      }
    };

    loadcat();
  }, []);

  // Add item to product
  const addCat = (item) => {
    setCat((prevCat) => {
      const existingItem = prevCat.find((catItem) => catItem.name === item.name);
      if (existingItem) {
       
        console.warn("already included category");
      }else{
        console.warn("susessfully added");
         return [...prevCat,  item ];
      }
    });
  };


  useEffect(() => {
    // Save product to AsyncStorage whenever product changes
    const savecat = async () => {
      try {
        await AsyncStorage.setItem('cat', JSON.stringify(cat));
      } catch (error) {
        console.error('Failed to save cat:', error);
      }
    };

    savecat();
  }, [cat]);

  return (
    <CatContext.Provider value={{ cat, addCat}}>
      {children}
    </CatContext.Provider>
  );
};