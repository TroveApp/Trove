import React from "react";
import {Button, Picker, ScrollView, StyleSheet, Text, View} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import {connect} from "react-redux";
import {AppState} from "../redux/Store";

interface State {
  resourceId: string | null;
}

function mapStateToProps(state: AppState) {
  return state.core;
}

class AddExperienceResourceScreen extends React.Component<
  NavigationScreenProps & ReturnType<typeof mapStateToProps>,
  State
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    resourceId: "therapy",
  };

  handleDone = () => {
    this.props.navigation.navigate("AddExperienceBenefits", {resourceId: this.state.resourceId});
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text>What's helped so far?</Text>
            <Picker
              selectedValue={this.state.resourceId}
              style={{height: 50, width: 200}}
              onValueChange={itemValue => this.setState({resourceId: itemValue})}
            >
              {Object.entries(this.props.resources).map(([resourceId, resource]) => (
                <Picker.Item key={resourceId} label={resource.name} value={resourceId} />
              ))}
            </Picker>
            <View style={{marginTop: 200}}>
              <Button title="Done" onPress={this.handleDone} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});

export default connect(mapStateToProps)(AddExperienceResourceScreen);
