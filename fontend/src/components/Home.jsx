import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useGetAllProductsQuery } from "../features/productApi";
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { data, isLoading, error } = useGetAllProductsQuery();

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddCart = (product) => {
    dispatch(addToCart(product));
    navigate('/cart');
  }

  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading....</p>
      ) : error ? (
        <p>An error occurred</p>
      ) : (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data?.map((product) => (
              <div key={product.id} className="product">
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} />
                <div className="product-details">
                  <span className="desc">{product.desc}</span>
                  <span className="price">${product.price}</span>
                </div>
                <button onClick={() => handleAddCart(product)}>Add to cart</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
