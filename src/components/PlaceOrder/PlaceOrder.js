import React from 'react';
import { useForm } from "react-hook-form";
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';
import './PlaceOrder.css';
const PlaceOrder = () => {
    const { register, handleSubmit, reset } = useForm();
    const storedData = getStoredCart();
    const onSubmit = data => {
        data.order = storedData;
        fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert("Order Inserted Successfully")
                    reset();
                    clearTheCart();
                }
            })
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="orderForm">

                <input {...register("name")} placeholder="Name" />
                <input {...register("email")} placeholder="Email" />
                <input {...register("billingAddress")} placeholder="Address" />
                <input {...register("phone")} placeholder="Phone Number" />

                <input type="submit" />
            </form>
        </div>
    );
};

export default PlaceOrder;