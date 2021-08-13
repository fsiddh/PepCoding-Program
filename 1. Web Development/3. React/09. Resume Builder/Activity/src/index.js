import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { composeWithDevTools} from 'redux-devtools-extension'

var firebaseConfig = {
    apiKey: "AIzaSyBdgLQrXmsLYrydzOI07T70n73HVfjIEkE",
    authDomain: "resume-builder-5ee90.firebaseapp.com",
    projectId: "resume-builder-5ee90",
    storageBucket: "resume-builder-5ee90.appspot.com",
    messagingSenderId: "49183426097",
    appId: "1:49183426097:web:e0ee10ad43dbe3056c7710"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore()

// thunk me kbi b function return krnge to args me humesha firebase,firestore k instances ajaenge
const reduxStore = createStore(rootReducer,
  composeWithDevTools(
    // getfirestore,getfirebase -> get instance of firestore,firebase
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    // get firestore ni chlta ache se to line 34 likhte
    reduxFirestore(firebase) // redux bindings for firestore,  
  )
);


ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      {/* firebase,firestore k instances redux store me ajae */}
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={firebaseConfig}
      dispatch={reduxStore.dispatch}
      createFirestoreInstance={createFirestoreInstance}
      >
      <App />
    </ReactReduxFirebaseProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);