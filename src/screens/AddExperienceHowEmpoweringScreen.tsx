import React from "react";
import {Image, ScrollView, Slider, StyleSheet, Text, View} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import {connect} from "react-redux";
import {AppState, Dispatcher} from "../redux/Store";
import {Experience} from "../redux/reducers/Core";
import Colors from "../constants/Colors";
import NextButton from "../components/NextButton";
import {Operations} from "../redux/operations";

interface State {
  howEmpowering: number;
}

function mapStateToProps(state: AppState) {
  const {core, self} = state;
  return {
    core,
    self,
  };
}

const mapDispatchToProps = (dispatch: Dispatcher) => ({
  onAddExperience(experience: Experience) {
    dispatch(Operations.addExperience(experience));
  },
});

export interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
export interface Props extends NavigationScreenProps<PreviousState>, StateProps, DispatchProps, OwnProps {}

interface PreviousState {
  resourceId: string;
  benefits: Array<string>;
}

class AddExperienceResourceScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  state = {
    howEmpowering: 0.7,
  };

  handleDone = () => {
    const {howEmpowering} = this.state;

    const experience: Experience = {
      benefits: this.props.navigation.getParam("benefits"),
      resourceId: this.props.navigation.getParam("resourceId"),
      howEmpowering,
    };
    this.props.onAddExperience(experience);
    this.props.navigation.navigate("AddExperienceResource");
    this.props.navigation.navigate("Profile");
  };

  getSummaryMessage() {
    if (this.state.howEmpowering < 0.2) {
      return "Disempowering";
    } else if (this.state.howEmpowering < 0.5) {
      return "Not empowering";
    } else if (this.state.howEmpowering < 0.8) {
      return "Fairly empowering";
    } else {
      return "Very empowering";
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Image style={styles.journeyImage} source={require("../../assets/images/CreateJourney-3.png")} />
          <View style={styles.howEmpoweringContainer}>
            <Text style={styles.titleText}>How empowering was it?</Text>
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumTrackTintColor={Colors.blue}
                onValueChange={value => this.setState({howEmpowering: value})}
                // Note this isn't controlled, this is just the initial value!
                value={this.state.howEmpowering}
              />
              <Text style={styles.summaryText}>{this.getSummaryMessage()}</Text>
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
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingTop: 30,
    flexDirection: "column",
    height: "100%",
  },
  journeyImage: {
    height: 180,
    width: "100%",
    resizeMode: "contain",
  },
  howEmpoweringContainer: {
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
  sliderContainer: {
    width: "100%",
    marginBottom: 80,
  },
  slider: {
    marginLeft: 20,
    marginRight: 20,
  },
  summaryText: {
    alignSelf: "flex-end",
    marginRight: 20,
    fontSize: 16,
    color: Colors.gray,
    fontFamily: "montserrat-regular",
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddExperienceResourceScreen);
