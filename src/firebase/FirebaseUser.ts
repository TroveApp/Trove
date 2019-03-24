export enum OnboardingState {
  Complete = 'Complete',
  AtWelcome = 'AtWelcome',
  AtSelectInitialResources = 'AtSelectInitialResources ',
}

export interface FirebaseUser {
  uid: string;
  emailAddress: string | null;
  nickname: string | null;
  onboardingState: OnboardingState;
}
