import React from 'react'
import { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { useContext } from 'react';
import { CatContext } from '../context/CatContext';
import { ProdContext } from '../context/ProdContext';
const Create = () => {
    const { addCat } = useContext(CatContext)
    const { addProd } = useContext(ProdContext)
    const [name, setName] = useState()
    const [qty, setqty] = useState()

    const [prodname,setprodname]=useState()
    const [prodQty,setproQty]=useState()

    const handleCat = () => {
        if (name.trim() !== "" && qty.trim() !== "") {
            addCat({ name, qty })
        } else {
            console.warn("fill all details");
        }
    }


   const handleProd=()=>{
    if (prodname.trim() !== "" && prodQty.trim() !== "") {
        addProd({ prodname, prodQty })
    } else {
        console.warn("fill all details");

    }
   }


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>ADD quantity</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Category Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Quantity"
                    value={qty}
                      keyboardType="numeric"
                    onChangeText={setqty}
                    maxLength={10}
                />



                <TouchableOpacity style={styles.button} onPress={handleCat} >
                    <Text style={styles.buttonText}>submit</Text>
                </TouchableOpacity>

                <Text style={styles.title}>ADD products</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Product Name"
                    value={prodname}
                    onChangeText={setprodname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Quantity"
                    value={prodQty}
                      keyboardType="numeric"
                    onChangeText={setproQty}
                    maxLength={10}
                />

                <TouchableOpacity style={styles.button} onPress={handleProd} >
                    <Text style={styles.buttonText}>submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        
    },
    button: {
        width: '50%',
        height: 50,
        backgroundColor: '#6EACDA',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    guestButton: {
        width: '100%',
        height: 50,
        borderColor: '#6EACDA',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guestButtonText: {
        color: '#6EACDA',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errror: {
        color: "red"
    },
    signup: {
        color: "blue",
    }
});

export default Create