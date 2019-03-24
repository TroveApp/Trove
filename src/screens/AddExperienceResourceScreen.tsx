import React from "react";
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import {connect} from "react-redux";
import {AppState} from "../redux/Store";
import Colors from "../constants/Colors";
import NextButton from "../components/NextButton";

interface State {
  inputText: string;
  shouldShowResults: boolean;
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
    inputText: "",
    shouldShowResults: false,
  };

  scrollView: ScrollView | null = null;

  handleDone = () => {
    const resourceId = this.getResourceId();
    if (resourceId) {
      this.props.navigation.navigate("AddExperienceBenefits", {resourceId});
    }
    // Should create rather than no-op if missing
  };

  getResourceId() {
    const resources = Object.entries(this.props.resources).filter(
      ([resourceId, resource]) => resource.name === this.state.inputText,
    );
    return resources.length === 1 ? resources[0][0] : null;
  }

  getSearchResults() {
    const resourceNames = Object.values(this.props.resources).map(resource => resource.name);
    resourceNames.sort();
    if (this.state.inputText == "") {
      return ["Therapy", "Yoga", "Painting"];
    }
    const results = new Set();
    for (const name of resourceNames) {
      if (name.toLowerCase().startsWith(this.state.inputText.toLowerCase())) {
        results.add(name);
      }
    }
    for (const name of resourceNames) {
      if (name.toLowerCase().includes(this.state.inputText.toLowerCase())) {
        results.add(name);
      }
    }
    return Array.from(results);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={sv => (this.scrollView = sv)}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps={"always"}
        >
          <Image style={styles.journeyImage} source={require("../../assets/images/CreateJourney-3.png")} />
          <View style={styles.selectResourceContainer}>
            <Text style={styles.titleText}>What's helped so far?</Text>
            <View style={styles.inputContainer}>
              <View style={styles.textInputWrapper}>
                <TextInput
                  style={styles.textInput}
                  value={this.state.inputText}
                  onChangeText={text => {
                    this.setState({inputText: text});
                  }}
                  onFocus={() => {
                    this.setState({shouldShowResults: true});
                    if (this.scrollView) {
                      this.scrollView.scrollTo({x: 0, y: 180, animated: true});
                    }
                  }}
                  onBlur={() => {
                    this.setState({shouldShowResults: false});
                  }}
                />
              </View>
              {this.state.shouldShowResults && (
                <View style={styles.searchResultsContainer}>
                  {this.getSearchResults().map(name => (
                    <TouchableWithoutFeedback
                      key={name}
                      onPress={() => {
                        this.setState({inputText: name});
                        Keyboard.dismiss();
                        this.setState({shouldShowResults: false});
                      }}
                    >
                      <View style={styles.searchResult}>
                        <Text style={styles.searchResultText}>{name}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </View>
              )}
            </View>
            <NextButton onPress={this.handleDone} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  journeyImage: {
    height: 180,
    width: "100%",
    resizeMode: "contain",
  },
  selectResourceContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 24,
    fontFamily: "montserrat-medium",
    color: Colors.nearBlack,
  },
  inputContainer: {
    width: "100%",
    padding: 20,
  },
  textInputWrapper: {
    backgroundColor: Colors.white,
    shadowRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
  },
  textInput: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 56,
    fontSize: 16,
    fontFamily: "montserrat-medium",
  },
  searchResultsContainer: {
    marginTop: 4,
  },
  searchResult: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    backgroundColor: Colors.white,
    shadowRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
  },
  searchResultText: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
  },
});

export default connect(mapStateToProps)(AddExperienceResourceScreen);
