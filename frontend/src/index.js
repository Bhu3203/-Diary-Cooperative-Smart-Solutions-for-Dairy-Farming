import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import { ChakraProvider } from '@chakra-ui/react';  

// import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import customRoute from './projectRoute';
import { Provider } from 'react-redux';
import store,{persistor} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
   
    <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <RouterProvider router={customRoute} />

      </PersistGate>
    

    </Provider>
    
    </>
   

   
  
  

  
  
  
);


