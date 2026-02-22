import React from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'

const PayPalButton = ({ amount, onSuccess, onError }) => {
    console.log("PayPalButton rendered with amount:", amount);
    return (
        <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
                const val = parseFloat(amount);
                if (isNaN(val) || val <= 0) {
                    console.error("Invalid amount for PayPal:", amount);
                    return actions.reject();
                }
                console.log("PayPal createOrder initiated for amount:", val.toFixed(2));
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            currency_code: "USD",
                            value: val.toFixed(2)
                        }
                    }]
                })
            }}
            onApprove={(data, actions) => {
                console.log("PayPal onApprove triggered");
                return actions.order.capture().then((details) => {
                    console.log("PayPal Payment Captured Successfully:", details);
                    onSuccess(details);
                });
            }}
            onError={(err) => {
                console.error("PayPal SDK Error:", err);
                onError(err);
            }}
        />
    )

}

export default PayPalButton