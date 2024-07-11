import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { addDoc, getDocs, doc, getDoc, setDoc, collection, query, where} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBFmVf9CIVM-aoB1ot0UpbwSRJbNSr4ALE",
  authDomain: "mantul-57898.firebaseapp.com",
  projectId: "mantul-57898",
  storageBucket: "mantul-57898.appspot.com",
  messagingSenderId: "901392054461",
  appId: "1:901392054461:web:a87a3108f0071ecab59fd4",
  measurementId: "G-GY3F3KK6QQ"
};

// Initialize Firebase app
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

/**
 * Get all documents from a collection, including document IDs.
 * @param {string} collectionName - The name of the collection.
 * @returns {Promise<Array<Object>>} - An array of documents with document IDs included as `docName`.
 */
const getCollection = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
    data[data.length - 1].docName = doc.id;
  });
  return data;
};

/**
 * Get a single document from a collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docName - The document ID.
 * @returns {Promise<Object|null>} - The document data or null if it does not exist.
 */
const getDocument = async (collectionName, docName) => {
  const docRef = doc(db, collectionName, docName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

/**
 * Get all documents from a collection with specific fields.
 * @param {string} collectionName - The name of the collection.
 * @param {Array<string>} fields - The fields to include in the documents.
 * @returns {Promise<Array<Object>>} - An array of documents with specified fields.
 */
const getCollectionWithFields = async (collectionName, fields) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    const docFields = {};
    fields.forEach((field) => {
      docFields[field] = docData[field];
    });
    data.push(docFields);
    data[data.length - 1].docName = doc.id;
  });
  return data;
};

/**
 * Get all documents from a collection with specific conditions.
 * @param {string} collectionName - The name of the collection.
 * @param {Array<Object>} conditions - The conditions to filter the documents.
 * @returns {Promise<Array<Object>>} - An array of documents matching the conditions.
 */
const getCollectionWithConditions = async (collectionName, conditions) => {
  const collectionRef = collection(db, collectionName);
  
  let q = collectionRef;
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });
  
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    docData.docName = doc.id; // Include the document ID in the data
    data.push(docData);
    console.log(docData);
  });

  return data;
};

/**
 * Update or create a document in a collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docName - The document ID (if updating).
 * @param {Object} data - The data to set in the document.
 */
const updateOrCreateDocument = async (collectionName, docName, data) => {
  if (docName) {
    const docRef = doc(db, collectionName, docName);
    await setDoc(docRef, data);
  } else {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, data);
  }
};

/**
 * Create a collection if it does not exist.
 * @param {string} collectionName - The name of the collection.
 */
const createCollection = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  if (querySnapshot.empty) {
    await setDoc(doc(db, collectionName, "init"), { init: true });
  }
};

export {
  app,
  auth,
  db,
  getCollection,
  getCollectionWithFields,
  getCollectionWithConditions,
  createCollection,
  getDocument,
  updateOrCreateDocument,
};
