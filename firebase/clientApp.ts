// Import the functions you need from the SDKs you need
import type { Attendees, Event } from "@eventsTypes";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  FirestoreDataConverter,
  getFirestore,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (app.name && typeof window !== "undefined") {
  const analytics = getAnalytics(app);
}

const db = getFirestore(app);

const addEvent = (event: Omit<Event, "id">) => {
  return addDoc(collection(db, "events"), event);
};

const getEventDocRef = (id: string) => {
  return doc(db, "events", id).withConverter(eventConverter);
};

const eventConverter: FirestoreDataConverter<Event> = {
  toFirestore: (data: Event) => data,
  fromFirestore: (snapshot) => {
    return snapshot.data() as Event;
  },
};

const updateCurrentAttendeeEventDocRef = (
  id: string,
  attendees: Attendees,
  index: number,
  toBeUpdatedAttendeeDoc: {
    name: string;
    availableDates: (Date | Timestamp)[];
  }
) => {
  removeAttendeeAtEventDocRef(id, attendees, index);
  addAttendeeAtEventDocRef(id, toBeUpdatedAttendeeDoc);
};

const removeAttendeeAtEventDocRef = (
  id: string,
  attendees: Attendees,
  index: number
) => {
  if (index === -1) {
    return;
  }
  updateDoc(getEventDocRef(id), {
    attendees: arrayRemove(attendees[index]),
  });
};

const addAttendeeAtEventDocRef = (
  id: string,
  toBeUpdatedCurrentAttendeeDoc: {
    name: string;
    availableDates: (Date | Timestamp)[];
  }
) => {
  updateDoc(getEventDocRef(id), {
    attendees: arrayUnion(toBeUpdatedCurrentAttendeeDoc),
  });
};

export { addEvent, getEventDocRef, updateCurrentAttendeeEventDocRef };
