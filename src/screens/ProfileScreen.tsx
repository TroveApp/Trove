import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";

import {NavigationScreenProps} from "react-navigation";
import {connect} from "react-redux";
import {AppState} from "../redux/Store";
import {Experience, resolveResourceImageURL, Resource} from "../redux/reducers/Core";
import Colors from "../constants/Colors";
import {withLoggedInUser} from "../redux/reducers/Self";


export const ExperienceCard = ({resource}: {resource: Resource}) => {
  const resourceImageURL = resolveResourceImageURL(resource.name);
  return (<View  style={styles.experienceCard}>
    {resourceImageURL && <Image style={styles.experienceIcon} source={resourceImageURL} />}
    <Text style={styles.experienceName}>{resource.name}</Text>
    <Image style={styles.experienceArrow} source={require("../../assets/images/Arrow.png")} />
  </View>);
}



interface State {
  nickname?: string;
  age?: number;
}

function mapStateToProps(state: AppState) {
  return state;
}

class ProfileScreen extends React.Component<
  NavigationScreenProps & ReturnType<typeof mapStateToProps>,
  State
> {
  static navigationOptions = {
    header: null,
  };

  state: State = {};


  private renderExperiences() {
    return withLoggedInUser(this.props.self, self => (
      <>
        {self.myProfile.experiences.map((experience, i) => {
          const resource = this.props.core.resources[experience.resourceId];
          if (resource) {
            return <ExperienceCard key={i} resource={resource} />;
          } else {
            console.log(`Resource not found! ${experience.resourceId}`);
            return null;
          }1
        })}
      </>
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.upperProfile}>
            <Image style={styles.avatar} source={require("../../assets/images/Profile_Photo.png")} />
            <Text style={styles.name}>Sailboat 5</Text>
            <Text style={styles.location}>San Francisco, CA</Text>
          </View>
          <View style={styles.experiences}>{this.renderExperiences()}</View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
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
    height: "100%",
  },
  upperProfile: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  name: {
    margin: 6,
    marginTop: 12,
    fontSize: 24,
    fontFamily: "montserrat-regular",
  },
  location: {
    margin: 6,
    textTransform: "uppercase",
    fontSize: 12,
    color: Colors.gray,
    fontFamily: "montserrat-medium",
  },
  experiences: {
    borderTopColor: Colors.mediumGray,
    borderTopWidth: 1,
    backgroundColor: Colors.lightGray,
    height: "100%",
  },
  experienceCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    shadowRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
  },
  experienceIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    flex: 1,
  },
  experienceName: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
    flex: 4,
    paddingLeft: 20,
  },
  experienceArrow: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    flex: 1,
  },
});

export default connect(mapStateToProps)(ProfileScreen);