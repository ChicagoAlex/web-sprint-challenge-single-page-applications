import React, {useState, useEffect} from "react";
import {Switch, Route, Link} from 'react-router-dom';
import OrderForm from './Components/OrderForm';
import * as yup from 'yup';



const App = () => {

  const initialFormErrors = {
    name: ''
  }
  
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [formValues, setFormValues] = useState('')
  
 

  const inputChange = (name, value) => {

    setFormValues({
      ...formValues,
      [name]: value
    })
  }




  return (
    <>
      <header>
        <nav>
        <Link to="/">Home</Link>
        </nav>
        <nav>
        <Link to="/pizza" id='order-pizza'>Order Pizza</Link>
        </nav>
        <nav>
        <Link to="/myorder">My Order</Link>
        </nav>
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <h2>Home</h2>
          </Route>
          <Route exact path="/pizza">
            <OrderForm 
            values={formValues}
            change={inputChange}
            errors={formErrors}
            />
          </Route>
          <Route exact path="/myorder">
            <h2>My Order</h2>
          </Route>
        </Switch>
      </main>
      <p>Order your Lambda Pizza!</p>
    </>
  );
};
export default App;
