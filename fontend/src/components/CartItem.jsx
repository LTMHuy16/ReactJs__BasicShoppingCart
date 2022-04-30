import { useDispatch } from "react-redux";
import {
  removeCart,
  decreaseQuantity,
  increaseCart,
} from "../features/cartSlice";

const CartItem = (props) => {
  const item = props.cartItem
  const dispatch = useDispatch();

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeCart(cartItem));
  };

  const handleChangeQuantity = (method, cartItem) => {
    if (method === "-") {
      dispatch(decreaseQuantity(cartItem));
    } else if (method === "+") {
      dispatch(increaseCart(cartItem));
    }
  };

  return (
    <div key={item.id} className="cart-item">
      <div className="cart-product">
        <img src={item.image} alt={item.name} />
        <div className="cart-desc">
          <h2>{item.name}</h2>
          <p>{item.desc}</p>
          <button onClick={() => handleRemoveFromCart(item)}>
            Remove
          </button>
        </div>
      </div>
      <div className="cart-product-price">${item.price}</div>
      <div className="cart-product-quantity">
        <button onClick={() => handleChangeQuantity("-", item)}>-</button>
        <div className="count-quantity">{item.cartQuantity}</div>
        <button onClick={() => handleChangeQuantity("+", item)}>+</button>
      </div>
      <div className="cart-product-total-price">
        ${item.cartQuantity * item.price}
      </div>
    </div>
  );
};

export default CartItem;