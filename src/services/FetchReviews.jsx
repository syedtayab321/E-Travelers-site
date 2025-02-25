import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Function to fetch all reviews
export const fetchReviews = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "reviews"));
    const reviews = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};
