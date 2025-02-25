import { db } from "./../firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const blogCollection = collection(db, "blogs");

// Function to add a new blog
export const addBlog = async (blogData) => {
  try {
    const docRef = await addDoc(blogCollection, blogData);
    return { id: docRef.id, ...blogData };
  } catch (error) {
    console.error("Error adding blog:", error);
    throw error;
  }
};

// Function to fetch all blogs
export const getBlogs = async () => {
  try {
    const querySnapshot = await getDocs(blogCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

// Function to update an existing blog
export const updateBlog = async (blogId, updatedData) => {
  try {
    const blogDocRef = doc(db, "blogs", blogId);
    await updateDoc(blogDocRef, updatedData);
    return { id: blogId, ...updatedData };
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

// Function to delete a blog
export const deleteBlog = async (blogId) => {
  try {
    const blogDocRef = doc(db, "blogs", blogId);
    await deleteDoc(blogDocRef);
    return true;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};
