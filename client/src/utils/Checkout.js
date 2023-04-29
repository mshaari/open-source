import { gql,useLazyQuery } from '@apollo/client';

export const CHECKOUT = gql`
  query Query {
    createCheckoutSession
  }
`;


function Checkout() {
    const [ startCheckout, { loading, error, data } ] = useLazyQuery(CHECKOUT, {

      onCompleted: (queryData) => {
        let data = JSON.parse(queryData.createCheckoutSession);
        let checkoutUrl = data.url;
        window.location.assign(checkoutUrl);
      }
    });
  
    if (loading) return null;
    if (error) return `Error: ${error}`;

    return (
      <button onClick={() => startCheckout()} id='checkout'>Pay Now</button>
    )
};

export default Checkout;
