import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

import { loadUser } from "../../util/FirebaseClient";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { AppState } from "../redux/Store";
import { CURRENT_USER_ID } from "../redux/reducers/Core";

interface State {
  nickname?: string;
  age?: number;
}

function mapStateToProps(state: AppState) {
  return state;
}

class HomeScreen extends React.Component<NavigationScreenProps & ReturnType<typeof mapStateToProps>, State> {
  static navigationOptions = {
    header: null
  };

  state: State = {};

  async componentDidMount() {
    const user = await loadUser("anon-1");
    console.log(user);
    this.setState({
      nickname: user.nickname,
      age: user.age
    });
    console.log("Finished setting state");
  }

  private renderExperiences() {
    return (
      <View>
        {this.props.core.users[CURRENT_USER_ID].experiences.map(experience => {
          const resource = this.props.core.resources[experience.resourceId];
          return (
            <View>
              <Text>{resource.name}</Text>
              <Text>{experience.rating}</Text>
              <Text>{experience.notes}</Text>
            </View>
          );
        })}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text>About you</Text>
            <Text>Nickname: {this.state.nickname || ""}</Text>
            <Text>Age: {this.state.age || ""}</Text>
            {this.renderExperiences()}
            <Button title="Add experience" onPress={() => this.props.navigation.navigate("AddExperience")} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});

export default connect(mapStateToProps)(HomeScreen);
