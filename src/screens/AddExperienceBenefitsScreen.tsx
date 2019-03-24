import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import {connect} from "react-redux";
import {AppState} from "../redux/Store";
import NextButton from "../components/NextButton";
import Colors from "../constants/Colors";
import BubblePicker from "../components/BubblePicker";

interface State {
  benefits: Array<string>;
}

function mapStateToProps(state: AppState) {
  return state.core;
}

interface PreviousState {
  resourceId: string;
}

class AddExperienceBenefitsScreen extends React.Component<
  NavigationScreenProps<PreviousState> & ReturnType<typeof mapStateToProps>,
  State
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    benefits: [],
  };

  handleDone = () => {
    this.props.navigation.navigate("AddExperienceHowEmpowering", {
      resourceId: this.props.navigation.getParam("resourceId"),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Image style={styles.journeyImage} source={require("../../assets/images/CreateJourney-3.png")} />
          <View style={styles.benefitsContainer}>
            <Text style={styles.titleText}>Did it help with any of the following?</Text>
            <BubblePicker
              bubbles={[
                {text: "Feeling Relaxed", id: "feeling-relaxed"},
                {text: "Sleeping better", id: "sleeping-better"},
                {text: "Connecting with others", id: "connecting-with-others"},
                {text: "Gave me energy", id: "gave-me-energy"},
                {text: "Focusing", id: "focusing"},
                {text: "Grounding", id: "grounding"},
                {text: "Confidence", id: "confidence"},
              ]}
              selectedBubbles={this.state.benefits}
              onChangeSelectedBubbles={selectedBubbles => this.setState({benefits: selectedBubbles})}
            />
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
  benefitsContainer: {
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
    textAlign: "center",
  },
});

export default connect(mapStateToProps)(AddExperienceBenefitsScreen);
