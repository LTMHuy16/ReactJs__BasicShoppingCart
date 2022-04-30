import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartProducts } from "../features/selector";
import CartItem from './CartItem'
import {
  clearCart,
  decreaseQuantity,
  getTotal,
  increaseCart,
  removeCart,
} from "../features/cartSlice";



const Cart = () => {
  const cart = useSelector(cartProducts);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  useEffect(() => {
    dispatch(getTotal())
  }, [cart, dispatch])
  

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="start-shopping">
          <div className="cart-empty">Your cart currently empty</div>
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            <span>Shopping Products</span>
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3>Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem}/>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-cart" onClick={() => handleClearCart()}>Clear Cart</button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping calculator at checkout</p>
              <button>Check out</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
