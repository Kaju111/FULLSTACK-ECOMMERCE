import { ChangeEvent, useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { cartReducerInitialState } from "../types/reducer-types"

const Shipping = () => {

    const { cartItems } = useSelector((state: { cartRedecer: cartReducerInitialState }) => state.cartRedecer)

    const navigate = useNavigate()

    const [ShippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }


    useEffect(() => {
        if (cartItems.length <= 0) return navigate("/cart");
    }, [cartItems]);

    return (
        <div className="shipping">
            <button className="back-btn" onClick={() => navigate("/cart")}><BiArrowBack /></button>

            <form>
                <h1>Shipping Address</h1>
                <input required
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={ShippingInfo.address}
                    onChange={changeHandler}
                />

                <input required
                    type="text"
                    placeholder="City"
                    name="city"
                    value={ShippingInfo.city}
                    onChange={changeHandler}
                />

                <input required
                    type="text"
                    placeholder="State"
                    name="state"
                    value={ShippingInfo.state}
                    onChange={changeHandler}
                />


                <select name="country"
                    required
                    value={ShippingInfo.country}
                    onChange={changeHandler}
                >
                    <option value="">Choose Country</option>
                    <option value="India">India</option>
                    <option value="U.K">U.K</option>
                    <option value="American">American</option>
                </select>

                <input required
                    type="number"
                    placeholder="Pin Code"
                    name="pinCode"
                    value={ShippingInfo.pinCode}
                    onChange={changeHandler}
                />
                <button type="submit">Pay Now</button>
            </form>

        </div>
    )
}

export default Shipping
