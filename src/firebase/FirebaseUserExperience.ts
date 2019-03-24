import {Experience} from "../redux/reducers/Core";

export interface FirebaseUserExperience {
  entries: {
    [experienceId: string]: Experience;
  };
}
