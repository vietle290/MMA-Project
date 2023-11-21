import React, { useState } from "react";
import { View, Text, Button, TextInput, Image, ScrollView, TouchableOpacity, Pressable } from "react-native";
import fetchMeals from "../../helpers/fetchSearchMeal";
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


// import Recipes from "../components/recipes";

const SearchScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState([]);

  const handleSearch = async () => {
    const data = await fetchMeals(searchTerm);

    if (data) {
      setMeals(data.meals);
    }
  };

  return (
    <ScrollView style={{marginTop:60}}>
      <View>

        {/* <Text>Search for Meals</Text>
        <TextInput
          placeholder="Enter a meal name"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Button title="Search" onPress={handleSearch} /> */}
        <View className="mx-4 space-y-2 mb-2" style={{marginLeft:20, marginBottom:20}}>
          <View>
            <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">Search any food,</Text>
          </View>
          <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">
            cook at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor={'gray'}
            style={{fontSize: hp(2.2)}}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
          <View className="bg-white rounded-full p-3">
            <TouchableOpacity onPress={handleSearch} >
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />

            </TouchableOpacity>
          </View>
        </View>

        {meals === null ? (
          <Text style={{ fontSize:20, fontWeight:"bold", textAlign:"center"}}>No search results yet.</Text>
        ) : meals.length === 0 ? (
          <Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", paddingTop:300}}>No meals found.</Text>
        ) : (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent:"center", marginTop:10}}>
            {meals.map((meal) => (
                <Pressable style={{width:"95%", marginLeft:20}} onPress={()=> navigation.navigate('RecipeDetail', {...meal})}>
              <View key={meal.idMeal} style={{ width: '95%', marginBottom:10 }}>
                <View style={{ padding: 10 , alignItems:"center", backgroundColor:"white", justifyContent:"center", borderRadius:15 }}>
                  <Image
                    source={{ uri: meal.strMealThumb }}
                    style={{ width: "100%", height:200, borderRadius:15 }}
                  />
                  <Text style={{fontSize:24, fontWeight:"bold", alignSelf:"flex-start", marginLeft:10}}>{meal.strMeal}</Text>
                  <Text style={{alignSelf:"flex-start", marginLeft:10, fontSize:16}}>{meal.strCategory}</Text>
                  {/* Add more meal details here */}
                </View>
              </View>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SearchScreen;
