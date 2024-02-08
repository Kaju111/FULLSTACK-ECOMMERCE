import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc"
import CartItemCard from "../components/cartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import { addToCart, calculatePrice, removeCartItem } from "../redux/reducer/cartReducer";


const Cart = () => {
  const {
    cartItems,
    subtotal,
    tax,
    total,
    shippingCharges,
    discount } = useSelector((state: {
      cartReducer: cartReducerInitialState
    }) => state.cartReducer)

  const dispatch = useDispatch()

  const [couponCode, setCouponCode] = useState<string>("")
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false)

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }))
  }

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }))
  }

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId))
  }

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCouponCode(true)
      else setIsValidCouponCode(false)
    }, 1000);

    return () => {
      clearTimeout(timeOutID)
      setIsValidCouponCode(false)
    }
  }, [])

  useEffect(() => {
    dispatch(calculatePrice())
  }, [cartItems])



  return (
    <div className="cart">
      <main>

        {cartItems.length > 0 ?
          cartItems.map((i, idx) => (
            <CartItemCard
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              key={idx} cartItem={i} />
          )) :
          <h1>No Item Added</h1>
        }


      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>ShippingCharges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount : <em className="red">
            - ₹{discount}
          </em>
        </p>
        <p><b>
          Total: ₹{total}
        </b></p>
        <input type="text" value={couponCode} placeholder="Coupon Code" onChange={(e) => setCouponCode(e.target.value)} />

        {
          couponCode && (
            (isValidCouponCode ?
              <span className="green"> ₹{discount} off using the <code>{couponCode}</code></span>
              :
              <span className="red">Invalid Coupon <VscError /></span>)
          )
        }

        {
          cartItems.length > 0 && <Link to="/shipping">Checkout</Link>
        }


      </aside>
    </div>
  )
}

export default Cart
