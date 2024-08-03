

import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button, ScrollView } from 'react-native';
import { ProdContext } from '../context/ProdContext';
import { useContext } from 'react';
import { CatContext } from '../context/CatContext';
import { useNavigation } from '@react-navigation/native';
import MyChart from '../component/MyChart';

const Stats = () => {
  const navigation = useNavigation()
  const { cat } = useContext(CatContext)
  const { Prod,deleteProd } = useContext(ProdContext)

  const productWithLowestQty = Prod.reduce((lowest, product) => {
    return product.prodQty < lowest.prodQty ? product : lowest;
  }, Prod[0]);

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.prodname}</Text>
      <Text style={styles.productQty}>Qty: {item.prodQty}</Text>
      <TouchableOpacity style={styles.deleteButton}  onPress={() => deleteProd(item.prodname)} >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Inventry Status</Text>
       <MyChart/>
        <TouchableOpacity onPress={() => navigation.navigate("create")} style={styles.statusContainer}  >
          <Text style={styles.statusText}>Categories Available</Text>
          <Text style={styles.statusNumber}>{cat.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("create")} style={styles.statusContainer}>
          <Text style={styles.statusText}>Prodcts Available</Text>
          <Text style={styles.statusNumber}>{Prod.length}</Text>
        </TouchableOpacity>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Less Quantity Product</Text>
          {
            Prod.length === 0 ? <Text style={styles.statusNumber}>None</Text> : <Text style={styles.statusNumber}>{productWithLowestQty.prodname}</Text>
          }
        </View>

        <View style={styles.statusContainer}>
        <Text style={styles.statusText}>All Products</Text>
          <FlatList
            data={Prod}
            renderItem={renderItem}
            keyExtractor={item => item.prodname}
          />
        </View>
      </View>
    </ScrollView>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  statusNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
  },
  productContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  productName: {
    fontSize: 12,
    color: '#555',
  },
  productQty: {
    fontSize: 12,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 4,
    borderRadius: 2,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  // newcontain:{
  //   maxHeight:350,
  //   minHeight:50,

  // }
});
export default Stats
