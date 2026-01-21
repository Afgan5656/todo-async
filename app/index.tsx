import { useEffect, useState } from "react";
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native"; // Tambah StyleSheet
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index(){
    const [Judul, setJudul] = useState("")
    const [taskItems, setTaskItems] = useState([]);

    const simpan = async () => {
        if (Judul.trim().length === 0) return;
        try{
            const updated = [...taskItems, Judul]
            setTaskItems(updated)
            await AsyncStorage.setItem("task", JSON.stringify(updated));
            setJudul("")
        }catch (e){
            console.error("Error reading data", e);
        }
    }
    
    const renderdata = async () => {
        try{
            const hasil1 = await AsyncStorage.getItem("task")
            if(hasil1 != null){
                setTaskItems(JSON.parse(hasil1))
            }
        }catch (e) {
            console.error("Error reading data", e);
        }
    }

    // --- TAMBAHAN FUNGSI HAPUS SEMUA ---
    const hapusSemua = async () => {
        setTaskItems([]); // Kosongkan list di layar
        await AsyncStorage.removeItem("task"); // Hapus data di storage
    }

    useEffect(() => {
        renderdata();
    }, [])

    return(
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>To Do List App</Text>
        
        {/* Tombol Hapus Semua */}
        <TouchableOpacity onPress={hapusSemua} style={{ marginTop: 10 }}>
            <Text style={{ color: 'red' }}>Hapus Semua</Text>
        </TouchableOpacity>

        <ScrollView style={{ marginTop: 20 }}>
            <View>
                {taskItems.map((item, index) => {
                    return(
                        <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
                            <Text>{item}</Text>
                        </View>
                    )
                })}
            </View>
        </ScrollView>

        <View style={{  alignItems: 'center', marginTop: 10 }}>
            <TextInput 
                placeholder="Masukan Tugas" 
                value={Judul} 
                onChangeText={setJudul} 
                style={{ flex: 1, borderWidth: 1, padding: 10, borderRadius: 5 }}
            />
            <TouchableOpacity onPress={() => simpan()} style={{ marginLeft: 10, backgroundColor: 'blue', padding: 15, borderRadius: 5 }}>
                <Text style={{ color: 'white' }}>+</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
)}