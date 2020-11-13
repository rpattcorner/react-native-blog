import React, {useContext, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ( {navigation} ) => {
    // console.log( {navigation} );
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

    useEffect(() => {
        getBlogPosts();
        navigation.addListener('didFocus', () => {
            getBlogPosts();
        }); 
        return () => {
            listener.remove();
        }

    },[]);

    return (
        <View>
            <FlatList 
                data={state}
                keyExtractor={blogPost => blogPost.title }
                renderItem={({ item }) => {
                    return (
                    <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id} )}>
                        <View style={styles.row}>
                            <Text style={ styles.title}>{item.title} - {item.id}</Text>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                <Feather name='trash-2' style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

IndexScreen.navigationOptions = ( {navigation} ) => {
    // console.log({navigation})
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create') }>
                <Feather name="plus" size={30}/>
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 18
    }
})

export default IndexScreen;
