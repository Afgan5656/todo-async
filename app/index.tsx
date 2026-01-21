import { useState } from "react";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");

  const Tambah = () => {
    if (inputText.trim() !== "") {
      setTodos([...todos, inputText.trim()]);
      setInputText("");
    }
  };

  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>
        To-Do List
      </Text>
      
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TextInput
          style={{ flex: 1,  borderWidth: 1,  borderColor: '#8F0B13',  padding: 10,  marginRight: 10 
          , borderRadius: 5}}
          placeholder="Tambah todo..."
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Tambah" onPress={Tambah} />
      </View>

      {todos.map((todo, index) => (
        <View key={index} style={{  flexDirection: 'row',  padding: 10,  backgroundColor: '#f0f0f0',  marginBottom: 5 
        }}>
          <Text style={{ flex: 1, fontSize: 16 }}>{todo}</Text>
          <TouchableOpacity onPress={() => deleteTodo(index)}>
            <Text style={{ color: 'white', fontSize: 16 ,flex: 1,  borderWidth: 1,  borderColor: '#8F0B13',  padding: 10,  marginRight: 10 
          , borderRadius: 5, backgroundColor: 'red'}}>Hapus</Text>
          </TouchableOpacity>
        </View>
      ))}
    </SafeAreaView>
  );
}