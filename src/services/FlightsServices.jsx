import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Firestore collection reference
const flightsCollectionRef = collection(db, "flights");

// Function to fetch all flights
export const getFlights = async () => {
  const snapshot = await getDocs(flightsCollectionRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Function to add a flight
export const addFlight = async (flightData) => {
  const docRef = await addDoc(flightsCollectionRef, flightData);
  return { id: docRef.id, ...flightData };
};

// Function to update a flight
export const updateFlight = async (flightId, updatedData) => {
  const flightDoc = doc(db, "flights", flightId);
  await updateDoc(flightDoc, updatedData);
};

// Function to delete a flight
export const deleteFlight = async (flightId) => {
  const flightDoc = doc(db, "flights", flightId);
  await deleteDoc(flightDoc);
};
