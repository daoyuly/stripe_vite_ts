import React from 'react';
import {loadStripe, Stripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  useStripe,
  CheckoutProvider,
  useCheckout,
  AddressElement,
} from '@stripe/react-stripe-js';

import '../styles/common.css';

const CustomerDetails = ({phoneNumber, setPhoneNumber, email, setEmail}: {phoneNumber: string; setPhoneNumber: (phoneNumber: string) => void; email: string; setEmail: (email: string) => void}) => {
  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <h3>Customer Details</h3>
      <label htmlFor="phoneNumber">Phone Number</label>
      <input
        id="phoneNumber"
        name="phoneNumber"
        type="text"
        autoComplete="off"
        onChange={handlePhoneNumberChange}
        value={phoneNumber || ''}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        onChange={handleEmailChange}
        value={email || ''}
      />
    </div>
  );
};

const CheckoutForm = () => {
  const checkout = useCheckout();
  const [status, setStatus] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const stripe = useStripe();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !checkout) {
      return;
    }

    try {
      setLoading(true);
      await checkout.confirm({
        email,
        phoneNumber,
        returnUrl: window.location.href,
      });
      setLoading(false);
    } catch (err: unknown) {
      console.error(err);
      setStatus(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const buttonDisabled = !stripe || !checkout || loading;

  return (
    <form onSubmit={handleSubmit}>
      <CustomerDetails
        email={email}
        setEmail={setEmail}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <h3>Payment Details</h3>
      <PaymentElement />
      <h3>Billing Details</h3>
      <AddressElement options={{mode: 'billing'}} />
      <button type="submit" disabled={buttonDisabled}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {status && <p>{status}</p>}
    </form>
  );
};

const THEMES = ['stripe', 'flat', 'night'];

const App = () => {
  const [pk, setPK] = React.useState(
    window.sessionStorage.getItem('react-stripe-js-pk') || ''
  );
  const [clientSecret, setClientSecret] = React.useState('');

  React.useEffect(() => {
    window.sessionStorage.setItem('react-stripe-js-pk', pk || '');
  }, [pk]);

  const [stripePromise, setStripePromise] = React.useState<Promise<Stripe | null> | null>(null);
  const [theme, setTheme] = React.useState('stripe');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStripePromise(
      loadStripe(pk, {
        betas: ['custom_checkout_beta_6'],
      })
    );
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handleUnload = () => {
    setStripePromise(null);
    setClientSecret('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          CheckoutSession client_secret
          <input
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
          />
        </label>
        <label>
          Publishable key{' '}
          <input value={pk} onChange={(e) => setPK(e.target.value)} />
        </label>
        <button style={{marginRight: 10}} type="submit">
          Load
        </button>
        <button type="button" onClick={handleUnload}>
          Unload
        </button>
        <label>
          Theme
          <select onChange={handleThemeChange}>
            {THEMES.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </label>
      </form>
      {stripePromise && clientSecret && (
        <CheckoutProvider
          stripe={stripePromise}
          options={{
            fetchClientSecret: async () => clientSecret,
            elementsOptions: {appearance: {theme: theme as 'flat' | 'stripe' | 'night'}},
          }}
        >
          <CheckoutForm />
        </CheckoutProvider>
      )}
    </>
  );
};

export default App;
