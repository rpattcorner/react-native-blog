import React, {useContext, useState } from 'react';
import {View, Text, TextInput, StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext.js';
import { EvilIcons } from '@expo/vector-icons';

const EditScreen = ( {navigation} ) => {
    const { state } = useContext(Context);

    const blogPost = state.find (blogPost => blogPost.id === navigation.getParam('id'));

    const [title, setTitle] = useState( blogPost.title);
    const [content, setContent] = useState(blogPost.content);

return <View>
        <Text>Edit Screen - { navigation.getParam('id') }</Text>
        <Text>Edit Title</Text>
        <TextInput value = {title} onChangeText={(newTitle) => setTitle(newTitle)} />
        <Text>Edit Title</Text>
        <TextInput value = {content} onChangeText={(newContent) => setContent(newContent)} />
        </View>
}


const styles = StyleSheet.create ( {} ) 


export default EditScreen 
