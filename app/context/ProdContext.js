import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProdContext = createContext();


export const ProdProvider = ({ children }) => {
  const [Prod, setProd] = useState([]);

  useEffect(() => {
    // Load product from AsyncStorage when component mounts
    const loadProd = async () => {
      try {
        const storedProd = await AsyncStorage.getItem('Prod');
        if (storedProd) {
            setProd(JSON.parse(storedProd));
        }
      } catch (error) {
        console.warn('Failed to load Prod:', error);
      }
    };

    loadProd();
  }, []);

  // Add item to product
  const addProd = (item) => {
    setProd((prevProd) => {
      const existingItem = prevProd.find((ProdItem) => ProdItem.prodname === item.prodname);
      if (existingItem) {
        console.warn("already included Prodegory");
      }else{
        console.warn("susessfully added");
         return [...prevProd,  item ];
      }
    });
  };

//   delete product
  const deleteProd = (Prodname) => {
    setProd((prevProd) => prevProd.filter((ProdItem) => ProdItem.prodname !== Prodname));
  };


  useEffect(() => {
    // Save product to AsyncStorage whenever product changes
    const saveProd = async () => {
      try {
        await AsyncStorage.setItem('Prod', JSON.stringify(Prod));
      } catch (error) {
        console.error('Failed to save Prod:', error);
      }
    };

    saveProd();
  }, [Prod]);

  return (
    <ProdContext.Provider value={{ Prod, addProd, deleteProd}}>
      {children}
    </ProdContext.Provider>
  );
};