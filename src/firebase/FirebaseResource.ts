export interface FirebaseResource {
  name: string;
  // Hack, ideally this would be a discriminated union of { assetName: string }
  // | { url: string }
  image: {
    assetName: string;
  };
}
