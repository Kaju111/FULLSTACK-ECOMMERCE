import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const stripePromise = loadStripe('pk_test_51Of0afSAPbk43WY5s65HtzQpSQaGavb7VecmMSVloSs95yLY3VI9lFtjlI3BDYEQEufsMAoEtJlCH2pANOjHGlof00eDTH5G3B');

const CheckOutForm = () => {

    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const [isProcessing, setIsProcessing] = useState<boolean>()

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!stripe || !elements) return;
        setIsProcessing(true)

        const orderData = {}

        const { paymentIntent, error } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: window.location.origin },
            redirect: "if_required"
        })
        if (error) {
            setIsProcessing(false)
            return toast.error(error.message || "Something Went Wrong")
        }

        if (paymentIntent.status === "succeeded") {
            console.log("Placeing Order")
            navigate("/orders")
        }
        setIsProcessing(false)
    }
    return <div className='checkout-container'>
        <form onSubmit={submitHandler}>
            <PaymentElement />
            <button type='submit' disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Pay"}
            </button>
        </form>
    </div>

}

const Checkout = () => {
    return (
        <Elements stripe={stripePromise} options={{
            clientSecret: "pi_3OiH3cSAPbk43WY50oHfaA6S_secret_4R83dc3Rl0ssFaUHnKJMwy64i",
        }}>
            <CheckOutForm />
        </Elements>
    )
}

export default Checkout