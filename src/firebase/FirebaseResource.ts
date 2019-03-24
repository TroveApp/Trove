export interface FirebaseResource {
  name: string;
  // Hack, ideally this would be a discriminated union of { assetName: string }
  // | { url: string }
  image: {
    assetName: string;
  };
}

export const RESOURCE_CONSTANTS = {
  "6ad2c444-da2c-48df-a2c9-2c7a819fd5b1": {
    name: "Seeking mental health treatment",
  },
  "6134d31d-8050-4d52-9db0-0864000dbeab": {name: "Psychoanalysis"},
  "e6139862-b562-46ed-a930-34f41700f91c": {name: "Psychiatry"},
  "d5dd4037-466f-4697-a28e-ce06b8ce8eb1": {name: "Somatic psychotherapy"},
  "496058a3-58a0-46d3-afc9-adffb11c7b00": {
    name: "Cognitive behavioral therapy",
  },
  "45456c92-f92c-4df4-9955-9200fc14b771": {
    name: "Dialectical Behavior Therapy",
  },
  "3fa4ea9e-7284-4354-a10f-d589a4cbfd7a": {name: "Exposure therapy"},
  "22fa4dcd-5402-41bb-8cda-244638ab30b6": {
    name: "Eye Movement Desensitization and Reprocessing (EMDR) therapy",
  },
  "a29ca7b4-c777-4932-a11e-9cbbb66a934f": {name: "Tapping therapy "},
  "e5f5eb65-673d-454e-a987-ffb28a999584": {name: "Hypnotherapy"},
  "5b79a9fa-0649-49a8-ae07-bb4a5c2f52de": {name: "Group Therapy"},
  "899d2b4e-3b1f-4ba4-bf13-02d429585e93": {name: "Homeopathic treatment"},
  "38bb19e1-0093-4156-9299-d3ae6cf6b90e": {name: "Acupuncture "},
  "f10fa14e-41be-408b-9345-ea0de1711d27": {
    name: "Cranial sacral treatment ",
  },
  "b8e2c3d8-8490-467c-b053-c9473bef7d7c": {name: "Thai massage "},
  "bae2d354-42db-4f90-bf99-113baf8e9203": {name: "Essential oils"},
  "854762af-a375-4c59-af12-6955f175ad42": {name: "Oil pulling"},
  "153d01ce-4d44-4faf-b0ec-f455ffb0f5d6": {name: "Herbs / Chinese herbs"},
  "070400d2-d6d8-4c39-8a41-98da95442f16": {name: "Anti-inflammatory diets"},
  "c0098d08-2056-48fb-b938-d0d77b4f4552": {name: "Dietary changes"},
  "5cbf09f8-e03a-4a54-8dfd-3ffcdb81b9c9": {name: "Nutrition"},
  "53b224cf-480b-4802-a64d-e367496aa114": {
    name: "Emotional health / self-care",
  },
  "26f6a9f5-fc42-4d73-af60-52a21ba22450": {name: "Guided meditation"},
  "605bcbea-f1e8-4c71-9104-c1771a0cc2f5": {name: "Restorative yoga"},
  "41db9194-e59b-45a1-8f33-b7d73aae113b": {name: "Sound meditation"},
  "dd3823f8-7e7c-4fea-8cf5-8ac754b2cbfc": {name: "Prayer"},
  "e47423be-f319-41a7-8452-8146a20c5c3f": {name: "Spend time in nature"},
  "0a7f66f8-f68e-4579-8181-c7f41be450f9": {name: "Visualizations"},
  "5dd93cd3-73f6-49bf-8bb8-efaa8cf4ade5": {name: "Breathing Exercises"},
  "45cbb561-ebe8-432a-8303-43964e97ae9e": {name: "Activities / Hobbies"},
  "eafed9a2-7968-4321-89dc-08d8707278f3": {name: "Reading poetry"},
  "e7d4ecf4-554e-463d-9a37-d0d7b3a6f7e8": {name: "Writing poetry"},
  "049f47c8-b8a2-4d5c-bbe9-3d82fcb3632b": {name: "Singing"},
  "d3614d4b-ac2a-47fe-87aa-b5a968149170": {name: "Reading"},
  "838a0e75-8295-413c-985b-3c9677469ca1": {name: "Dancing"},
  "17d954e9-04b1-4402-a528-4da2cbcc3b31": {name: "Traveling"},
  "c6f30162-1651-4aff-8ec9-f36c3453705f": {name: "Journaling"},
  "c096ca8f-37e7-4bb6-93e5-511c5ebe3ec2": {name: "Painting "},
  "94de62e5-0615-4ad0-9b60-72383469354a": {name: "Gardening "},
  "2fe8bbc9-1e4d-4dca-89a2-1b6768a4d0a2": {name: "Going to museums "},
  "ad1a2e39-5a98-4274-9d9a-0f6629e3b11b": {name: "Drawing"},
  "5b3cc202-d3e1-4579-bdcb-62dd4337d3ba": {name: "Art"},
  "30887981-bfa1-492b-894d-c1294b568ca8": {name: "Sailing"},
  "9d3c3ced-ed78-4237-993d-a15e3fe3a266": {name: "Physical activity"},
  "c74318e9-3660-42d9-8ee6-6448f9dc70a9": {name: "Yoga"},
  "a0a03cd6-41d3-4188-9c37-a9aca576d665": {name: "Cardio"},
  "e191b0ca-d789-473f-b602-62c8e3844e39": {name: "Weight training"},
  "9388b232-7317-4f1c-864f-0d5086295cf5": {name: "Taking walks"},
  "13f5c197-4ba4-41d6-b0a2-934ea6cfa772": {name: "Hiking "},
  "197c8d82-3c05-4734-be19-6a5697646d20": {name: "Running"},
  "0efda75b-d495-4f0d-9b76-1a890299ed5c": {name: "Jogging"},
  "b147a799-1b5b-4247-8329-87e9b36fad43": {name: "Cycling"},
  "0bbc70c6-5f44-4f6e-943e-60ecddfcdc61": {name: "Weight lifting"},
  "f85b7373-a091-45f1-9704-99f7e4ceb293": {name: "Crossfit"},
  "84360021-a633-4f48-9597-d74588e536ab": {name: "Fitness classes"},
  "48deeeab-3ef2-4859-84cc-07339654391b": {name: "Environment"},
  "6049b890-51bf-400a-8673-6aa83c427640": {name: "Clean apartment "},
  "506f03aa-c96f-45c7-9f4e-9fe400b2259c": {name: "Feng Shui"},
  "ed16807c-7c22-47d1-848d-375b9378bcfc": {name: "Living alone "},
  "775957f9-c5b1-420a-82ed-1d40467f59e2": {
    name: "Removing triggers from my environment",
  },
  "1afce83e-98bb-4c25-8a59-8ed43185161f": {name: "Getting a pet "},
  "e5ec3552-fd2e-4c62-a85d-cdf7481ada44": {name: "Other practices"},
  "3019374c-ea45-4c26-b7ab-5f99edc2a059": {name: "Hypnosis sleep aid app"},
  "10704db2-fc53-48f7-8a32-4ff23b9f8691": {name: "Structuring my time"},
  "1cc075c1-a327-4018-8573-50d7cc2a0288": {name: "Setting goals"},
  "757f2041-745f-42f2-b998-2e5c7787b408": {name: "Hot baths"},
  "135a4c1f-a205-4124-bc64-f6221da16d16": {
    name: "Using daily health tracking app ",
  },
  "321212c2-3f89-4eaf-ae21-ab1f83f0b27e": {name: "Having alone time"},
  "38b9cfd6-990c-48f7-a418-72cfb4a35510": {name: "Organizing my life"},
  "54692904-3cb5-4397-853e-334762fa27b9": {
    name: "Lying in restorative pose with legs up against a wall",
  },
  "5165fa90-5a0b-4332-86d1-2c7e7d4ce3d2": {name: "Education"},
  "8f1f983e-9133-48c3-b58e-d55ae94abc64": {name: "Self defense class"},
  "735094af-1cbe-4967-b934-772439abe65e": {
    name: "Book: Adrenal Fatigue by James Wilson",
  },
  "3a1a2f8f-dd93-45c4-9d80-a2a9ad92d93a": {
    name: "Book: Tears to Triumph by Marianne Williamson",
  },
  "702c5da8-8f93-4074-b80e-29f30f3cc9e9": {
    name: "Book: Rape Recovery Handbook by Dr. Aphrodite Matsakis ",
  },
  "f8769446-0967-441a-ac18-0e4da1bd18a2": {
    name: "Book: The Body Keeps The Score by Bessel van der Kolk",
  },
  "e04a88ba-f1ec-4c33-806d-166fd0622235": {name: "Listen to audio books"},
  "3cba103d-3bf5-439a-b529-526479571b8a": {name: "Medication"},
  "fd7e728c-62cb-48af-b4fe-75a97528a4e8": {name: "Antidepressants"},
  "921dd212-e093-4c6b-b541-dfd3b4d2d8c0": {name: "Anti-anxiety medication"},
  "327e5a53-b93d-42dd-8cd1-d90343cf99ea": {name: "Xanax "},
  "c54bf3fa-9cab-414b-b338-781c782f74a0": {name: "Marijuana"},
  "e7290058-05cd-4d06-8015-9cccfc9dfce1": {name: "Psilocybin mushrooms"},
  "d691fc2b-47ae-4d3f-a57c-59018bea5031": {name: "Peyote "},
  "0e5775bb-69b7-485e-ad00-a93e708ee6ef": {name: "Ayahuasca "},
  "7380d1ef-db01-4e04-bd8f-f161aa2335eb": {
    name: "Ketamine Assisted Therapy",
  },
  "e40c6dfe-0ef9-4011-bff1-1a9c4309997e": {name: "Community"},
  "2c96b03a-649a-4f86-a255-11ed55283bdf": {
    name: "Spending time with positive friends ",
  },
  "0758c2da-baab-4f95-a5fc-a6dc02792324": {
    name: "Talking to other survivors ",
  },
  "8bfded5e-d675-4a3d-a1d1-ad433b5e6b73": {
    name: "Having kind people check in",
  },
  "c31d7abc-d973-443a-b107-735b12a38f4b": {
    name: "Hearing that people believe in me",
  },
  "c40c18d6-2368-4b59-8c8e-e1940ef8e1e9": {
    name: "Meeting cool, strong women",
  },
  "fc72426a-231b-4025-8189-44f33904b994": {
    name: "Spending time with my family",
  },
  "e0327784-354d-4ed1-9ed0-83619b82db88": {
    name: "Joining online communities",
  },
  "06003003-c7f7-4f7a-8378-3860043dd521": {name: "Retreats"},
  "33f289a9-ea8e-4f8f-899d-98207575d7fb": {name: "Meditation retreat"},
  "b7c2b0ef-ee09-4bc1-b162-9fbcda31b98c": {name: "Silent retreat"},
  "cc571cc2-488c-419e-9e4d-b05237f2b308": {name: "Yoga retreat"},
  "aa9c1ee7-9d3c-4aeb-a6c0-903c4659819f": {name: "Volunteering "},
  "6652b1fb-d1f3-45b9-9f6d-439cd170a79d": {name: "Working with animals"},
  "c299be04-7c93-4eee-abcb-4b12a2fdcc93": {
    name: "Volunteering with the elderly",
  },
  "22d175ed-806e-409a-a2aa-6763b42d24d7": {
    name: "Volunteering with children",
  },
  "7e225d39-7960-4e41-8635-1b06ec231a7b": {
    name: "Volunteering with the homeless",
  },
  "b65b2007-a38b-467c-8c89-ffe9df9eb2a8": {name: "Advocacy"},
  "37d9c9d6-8d9e-4e4e-8ee8-e87d8b553d09": {name: "Sharing my story"},
};
