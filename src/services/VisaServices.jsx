import { db } from "./../firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const visaCollection = collection(db, "visas");

// Add a new visa record
export const addVisa = async (visa) => {
  try {
    const docRef = await addDoc(visaCollection, visa);
    return { id: docRef.id, ...visa };
  } catch (error) {
    console.error("Error adding visa: ", error);
    throw error;
  }
};

// Get all visa records
export const getVisas = async () => {
  try {
    const snapshot = await getDocs(visaCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching visas: ", error);
    throw error;
  }
};

// Update an existing visa
export const updateVisa = async (id, updatedVisa) => {
  try {
    const visaRef = doc(db, "visas", id);
    await updateDoc(visaRef, updatedVisa);
  } catch (error) {
    console.error("Error updating visa: ", error);
    throw error;
  }
};

// Delete a visa record
export const deleteVisa = async (id) => {
  try {
    const visaRef = doc(db, "visas", id);
    await deleteDoc(visaRef);
  } catch (error) {
    console.error("Error deleting visa: ", error);
    throw error;
  }
};
