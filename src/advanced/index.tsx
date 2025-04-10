import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_46zswMCbz39W2KAqKj43vDRu');

import CheckoutForm from './CheckoutForm';

export default function App() {
//   const options = {
//     // passing the client secret obtained from the server
//     clientSecret:  '123_secret_abc'// '{{CLIENT_SECRET}}',
//   };
// <Elements stripe={stripePromise} options={options}>
  return (
    
    <Elements stripe={stripePromise} >
      <CheckoutForm />
    </Elements>
  );
};