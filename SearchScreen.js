import React from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Linking
} from "react-native";
const your_access_token = "d9eebecbbc9b4d9fe2b328852a24dde07a291b4d";

export class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_value: ""
    };
  }

  changeText(text) {
    this.setState({
      search_value: text
    });

    return fetch(
      `https://api.github.com/search/repositories?q=${text}+in:name&sort=stars`,
      {
        headers: {
          "Content-type": "sapplication/json; charset=UTF-8",
          Authorization: "token " + your_access_token
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.items[0]);
        this.setState({
          items: responseJson.items
        });
      });
  }

  openURL(url) {
    Linking.openURL(url).catch(err => Alert("URLを開けませんでした。", err));
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: "#23282E" }}>
        <View style={{ height: 50, backgroundColor: "#23282E" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
              paddingTop: 0
            }}
          >
            Github Searcher
          </Text>
        </View>
        <TextInput
          style={{
            height: 40,
            marginHorizontal: 12,
            marginTop: 4,
            paddingLeft: 8,
            marginBottom: 20,
            backgroundColor: "white"
          }}
          onChangeText={text => this.changeText(text)}
          placeholder={"キーワードを入力"}
          value={this.state.search_value}
        />
        <View style={{ backgroundColor: "white" }}>
          <FlatList
            data={this.state.items}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.openURL(item.html_url)}>
                <View
                  style={{
                    flexDirection: "row",
                    padding: 8,
                    borderTopWidth: 1,
                    borderColor: "#f5f5f5",
                    backgroundColor: "white"
                  }}
                >
                  <Image
                    source={{ uri: item.owner.avatar_url }}
                    style={{ height: 60, width: 60, marginRight: 12 }}
                    resizeMode="contain"
                  />
                  <View>
                    <Text
                      style={{
                        marginBottom: 4,
                        fontSize: 14,
                        color: "#508CCC",
                        fontWeight: "bold"
                      }}
                    >
                      {item.name}⭐️{item.stargazers_count}
                    </Text>
                    <Text
                      note
                      numberOfLines={2}
                      ellipsizeMode={"tail"}
                      style={{ textAlign: "left", marginRight: 80 }}
                    >
                      {item.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            enableEmptySections={true}
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default SearchScreen;
