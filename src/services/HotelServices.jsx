import { db } from "../firebaseConfig";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

// Firestore collection reference
const hotelsCollectionRef = collection(db, "hotels");

// Function to fetch all hotels
export const fetchHotels = async () => {
  const querySnapshot = await getDocs(hotelsCollectionRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to add a new hotel
export const addHotel = async (hotel) => {
  const docRef = await addDoc(hotelsCollectionRef, hotel);
  return { id: docRef.id, ...hotel };
};

// Function to update an existing hotel
export const updateHotel = async (id, updatedData) => {
  const hotelDocRef = doc(db, "hotels", id);
  await updateDoc(hotelDocRef, updatedData);
};

// Function to delete a hotel
export const deleteHotel = async (id) => {
  const hotelDocRef = doc(db, "hotels", id);
  await deleteDoc(hotelDocRef);
};
