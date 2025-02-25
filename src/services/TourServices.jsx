import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
const toursCollection = collection(db, "tours");

// ✅ **1. Get all tours**
export const getTours = async () => {
  try {
    const snapshot = await getDocs(toursCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching tours:", error);
    throw error;
  }
};

// ✅ **2. Add a new tour**
export const addTour = async (tourData) => {
  try {
    const newTourRef = await addDoc(toursCollection, tourData);
    return newTourRef.id; // Return the newly created document ID
  } catch (error) {
    console.error("Error adding tour:", error);
    throw error;
  }
};

// ✅ **3. Update an existing tour**
export const updateTour = async (tourId, updatedData) => {
  try {
    const tourRef = doc(db, "tours", tourId);
    await updateDoc(tourRef, updatedData);
    return true;
  } catch (error) {
    console.error("Error updating tour:", error);
    throw error;
  }
};

// ✅ **4. Delete a tour**
export const deleteTour = async (tourId) => {
  try {
    const tourRef = doc(db, "tours", tourId);
    await deleteDoc(tourRef);
    return true;
  } catch (error) {
    console.error("Error deleting tour:", error);
    throw error;
  }
};
