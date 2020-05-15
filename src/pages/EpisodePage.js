import React, {Component} from 'react';
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as API from '../api/Api';

export default class EpisodePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tv_episode: null,
        };
    }

    componentDidMount() {
        API.getTvShowEpisode(this.props.route.params.item.tv_show_id, this.props.route.params.item.season_number, this.props.route.params.item.episode_number).then(res => {
            this.setState({
                tv_episode: res,
            });
            console.log(this.state.tv_episode);
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                {!this.state.tv_episode && (
                    <ActivityIndicator
                        style={styles.loading_icon}
                        size="large"
                        color="#000"
                    />
                )}
                {this.state.tv_episode && (
                    <View style={styles.container}>
                        <ScrollView>
                            <View style={styles.box}>
                                <Image
                                    style={styles.backdrop_image}
                                    source={{
                                        uri: `https://image.tmdb.org/t/p/w500/${
                                            this.state.tv_episode.still_path
                                        }`,
                                    }}
                                />
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.title}>{this.state.tv_episode.name}</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.title}>{this.state.tv_episode.season_number}</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.title}>{this.state.tv_episode.episode_number}</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.title}>{this.state.tv_episode.air_date}</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.title}>{this.state.tv_episode.vote_average}</Text>
                            </View>

                        </ScrollView>
                    </View>
                )}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1, // maybe useless
        flexDirection: 'row', // maybe useless
        flexWrap: 'wrap', // maybe useless
        backgroundColor: '#fff',
        paddingVertical: 5,
    },
    loading_icon: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    backdrop_image: {
        width: '100%',
        height: 200,
        borderRadius: 5,
    },
    box: {
        paddingVertical: 5,
    },
    title: {
        fontSize: 25,
        backgroundColor: '#ddd',
        textAlign: 'center',
        borderRadius: 5,
        padding: 5,
        overflow: 'hidden',
        color: '#000',
    },
    add_button: {
        padding: 10,
        backgroundColor: '#4fb',
        borderRadius: 5,
        marginBottom: 5,
    },
    add_button_text: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '500',
        textTransform: 'uppercase',
    },
});
