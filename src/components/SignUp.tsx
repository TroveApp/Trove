import React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
} from "react-native";

import { registerUser } from "../redux/operations/Auth";
import { Dispatcher } from "../redux/Store";
import { connect } from "react-redux";

interface OwnProps {}

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

interface SignupProps extends OwnProps, DispatchProps {}

interface SignUpState {
  userId: string;
  nickname: string;
  emailAddress: string;
}

class SignUpFormBase extends React.Component<SignupProps, SignUpState> {
  doRegister = () => {
    this.props.registerUser(this.state.emailAddress, this.state.nickname);
  };

  updateEmail = (text: string) => this.setState({ emailAddress: text });

  updateNickname = (text: string) => this.setState({ nickname: text });

  render() {
    return (
      <View>
        <Text>Sign up</Text>
        <TextInput placeholder="email" onChangeText={this.updateEmail} />
        <TextInput placeholder="nickname" onChangeText={this.updateNickname} />
        <Button title="Sign up" onPress={this.doRegister} />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatcher) => ({
  registerUser: (emailAddress: string, nickname: string) => {
    dispatch(registerUser({ emailAddress, nickname, userId: `${Math.floor(Math.random() * 1000000)}` }));
  }
});

export const SignupForm = connect(
  undefined,
  mapDispatchToProps
)(SignUpFormBase);
