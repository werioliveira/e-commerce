/* eslint-disable no-unused-expressions */
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from 'react';
import axios from "axios"
import {useHistory} from 'react-router'


const KEY = "pk_test_51JoyQbG9oGkmCZSEYM56nWFJoqwpk6n3o2hbswr59wA8fw7UhFrxfnztyjwAebKrQAoM6EBlBauSb9TYFVSAThq700ujbzaiOl"


const Pay = () =>{
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory()

    const onToken = (token) =>{
        setStripeToken(token)
    }
    useEffect(() =>{
        const makeRequest = async () =>{
            try{
                console.log('entrou')
                const res = await axios.post("http://localhost:4000/checkout/payment",{
                    tokenId: stripeToken.id,
                    amount: 2000,
                })
                history.push("/success")
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }
        makeRequest()
    },[stripeToken,history])
    
    return (
        <div style={{ 
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
    }}
    >
        {stripeToken ? <span>Processing please wait</span> : 
        <StripeCheckout name="offshop"
         image="https://avatars.githubusercontent.com/u/8872447?v=4"
         billingAddress
         shippingAddress
         description="Total is nine"
         amount={2000}
         token={onToken}
         stripeKey={KEY}
         >
        <button
            style={{
                border: "none",
                width: 120,
                borderRadius:5,
                padding: "20px",
                backgroundColor: "black",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
            }}
            >
                Pay Now
            </button>
            </StripeCheckout>
            }
            </div>
    )
}

export default Pay;