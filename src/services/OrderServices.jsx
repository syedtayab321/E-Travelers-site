import { db } from "../firebaseConfig";
import { collection, getDocs, doc } from "firebase/firestore";

// Function to fetch all orders along with their subcollection orderType
export const getOrdersWithDetails = async () => {
  const ordersRef = collection(db, "orders"); // Reference to the 'orders' collection
  const ordersSnapshot = await getDocs(ordersRef);
  
  let allOrders = [];

  // Loop through each document in the 'orders' collection
  for (const orderDoc of ordersSnapshot.docs) {
    const orderData = { id: orderDoc.id, ...orderDoc.data(), orderDetails: [] };

    // Reference to the subcollection 'orderType'
    const orderTypeRef = collection(db, "orders", orderDoc.id, "orderType");
    const orderTypeSnapshot = await getDocs(orderTypeRef);

    // Fetch all order details inside the 'orderType' subcollection
    orderData.orderDetails = orderTypeSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    allOrders.push(orderData);
  }

  return allOrders;
};
