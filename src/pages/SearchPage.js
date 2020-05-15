import React, {Component} from 'react';
import * as API from '../api/Api';
import {FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            loading: false,
            data: [],
            text: '',
        };

        this.handleChangeText = (function(text) {
            this.setState({
                text: text,
            });
            if(this.state.text.length !== 0){
                API.searchTvShow(this.state.text)
                    .then(res => {
                        this.setState({
                            data: [...res.results],
                            loading: false,
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState({loading: false});
                    });
            }
        }).bind(this);
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const {page} = this.state;
        this.setState({loading: true});

        if(this.state.text.length !== 0){
            API.searchTvShow(this.state.text, page)
                .then(res => {
                    this.setState({
                        data: [...this.state.data, ...res.results],
                        loading: false,
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({loading: false});
                });
        }
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1,
            },
            () => {
                this.makeRemoteRequest();
            },
        );
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <TextInput
                        style={styles.text_input}
                        placeholder={" Search"}
                        autoCapitalize={'none'}
                        onChangeText={this.handleChangeText}
                        value={this.state.text}
                    />
                </View>
                <View>
                    { this.state.text.length === 0 && (
                        <Text style={styles.empty_search}>Empty search</Text>
                    )}
                    { this.state.text.length !== 0 && (
                        <FlatList
                        data={this.state.data}
                        style={styles.flat_list}
                        numColumns={3}
                        renderItem={({item}) => (
                            <View style={styles.card_container}>
                                <TouchableOpacity
                                    style={styles.card}
                                    onPress={() => {
                                        // passare l oggetto alla pagina (anche l id)
                                        this.props.navigation.navigate('details', {
                                            item: {
                                                id: item.id,
                                            },
                                        });
                                    }}>
                                    <Image
                                        style={styles.card_image}
                                        source={{
                                            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                                        }}
                                    />
                                    <View style={styles.card_text_container}>
                                        <Text numberOfLines={1} style={styles.card_text}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                        onEndReached={() => this.handleLoadMore()}
                        onEndReachedThreshold={0.2}
                    />)}
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    text_input: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
    },
    empty_search: {
        height: '100%',
        color: 'grey',
        alignSelf: 'center',
    },
    flat_list: {
        height: '100%',
    },
    card_container: {
        width: '33.3333%',
        padding: 2,
    },
    card: {
        backgroundColor: '#555',
        padding: 3,
        borderRadius: 5,
    },
    card_image: {
        width: '100%', // maybe useless
        height: 170,
        borderRadius: 5,
    },
    card_text_container: {
        padding: 3,
    },
    card_text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    loading_icon: {
        flex: 1,
        justifyContent: 'center',
    },
});
