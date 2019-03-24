import React from "react";
import { Button, Picker, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { AppState, Dispatcher } from "../redux/Store";
import { coreAction } from "../redux/reducers/Core";

interface State {
  resourceId: string | null;
  rating: string;
  notes: string;
}

function mapStateToProps(state: AppState) {
  return state.core;
}

const mapDispatchToProps = (dispatch: Dispatcher) => ({
  onAddExperience: (resourceId: string, rating: string, notes: string) => {
    dispatch(coreAction.addExperience({ resourceId, rating, notes }));
  }
});

const INITIAL_STATE: State = {
  resourceId: "therapy",
  rating: "",
  notes: ""
};

class AddExperienceScreen extends React.Component<
  NavigationScreenProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>,
  State
> {
  static navigationOptions = {
    header: null
  };

  state = INITIAL_STATE;

  handleDone = () => {
    this.props.onAddExperience(this.state.resourceId!, this.state.rating, this.state.notes);
    this.setState(INITIAL_STATE);
    this.props.navigation.navigate("Profile");
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text>Resource</Text>
            <Picker
              selectedValue={this.state.resourceId}
              style={{ height: 50, width: 200 }}
              onValueChange={itemValue => this.setState({ resourceId: itemValue })}
            >
              {Object.entries(this.props.resources).map(([resourceId, resource]) => (
                <Picker.Item key={resourceId} label={resource.name} value={resourceId} />
              ))}
            </Picker>
            <Text style={{ marginTop: 200 }}>Did it work?</Text>
            <TextInput
              style={{ height: 50, width: 200, backgroundColor: "#fff" }}
              onChangeText={rating => this.setState({ rating })}
            />
            <Text>Notes</Text>
            <TextInput
              style={{ height: 50, width: 200, backgroundColor: "#fff" }}
              onChangeText={notes => this.setState({ notes })}
            />
            <Button title="Done" onPress={this.handleDone} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee"
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExperienceScreen);
