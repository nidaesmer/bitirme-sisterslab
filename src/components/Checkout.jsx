import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ProductDetails } from "./";
import { GB_CURRENCY, TRY_CURRENCY, USD_CURRENCY } from "../utils/constants";
import {
  decrementInCart,
  incrementInCart,
  removeFromCart,
} from "../redux/cartSlice";

const Checkout = () => {
  const products = useSelector((state) => state.cart.products); //ürünleri çekmek için
  const itemsNumber = useSelector((state) => state.cart.productsNumber); //toplsm itemsı yazdıablmek ıcın
  const subtotal = useSelector(
    (
      state //toplam fıyat ıcın
    ) =>state.cart.products.reduce((subtotal, product) => subtotal + product.price * product.quantity,0)
  );
  const dispatch = useDispatch();

  return (
    <div className="h-screen bg-amazonclone-background">
      <div className="min-w-[1000px] max-w-[1500px] m-auto pt-8">
        <div className="grid grid-cols-8  gap-10">
          {/* product*/}
          <div className="col-span-6 bg-white">
            <div className="text-2xl xl:text-3xl m-4 pl-8 ">Shopping Cart</div>
            {/* ürünşeri getirir*/}
            {products.map((product) => {
              return (
                <div key={product.id}>
                  <div className="grid grid-cols-12 divide-y divide-gray-400 mr-4">
                    <div className="col-span-10 grid grid-cols-8 divide-y divide-gray-400">
                      <div className="col-span-2">
                        {/* sepetteki gorselleri alır getirir idye göre*/}
                        <Link to={`/product/${product.id}`}>
                          <img
                            className="p-4 m-auto"
                            src={product.image_small}
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="col-span-6">
                        <div className="font-medium text-black mt-2">
                          <Link to={`/product/${product.id}`}>
                            <ProductDetails product={product} ratings={false} />
                          </Link>
                        </div>
                        <div>
                          <button
                            className="text-sm xl:text-base font-semibold rounded text-blue-500 mt-2 mb-1 cursor-pointer"
                            onClick={() => dispatch(removeFromCart(product.id))}
                          >
                            Delete
                          </button>
                        </div>
                        <div className="grid grid-cols-3 w-20 text-center">
                          <div
                            className="text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer"
                            onClick={() =>
                              dispatch(decrementInCart(product.id))
                            }
                          >
                            -
                          </div>
                          <div className="text-lg xl:text-xl bg-gray-200">
                            {product.quantity}
                          </div>
                          <div
                            className="text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer"
                            onClick={() =>
                              dispatch(incrementInCart(product.id))
                            }
                          >
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-lg xl:text-xl mt-2 mr-4 font-semibold">
                        <select>
                          <option>
                            <span className="font-semibold">
                              {GB_CURRENCY.format(subtotal)}
                            </span>
                          </option>
                          <option>
                            <span>{TRY_CURRENCY.format(subtotal)}</span>
                          </option>
                          <option>
                            <span>{USD_CURRENCY.format(subtotal)}</span>
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="text-lg xl:text-xl text-right mb-4 mr-4">
              Subtotal ({itemsNumber} items):
              <select>
                <option>
                  <span className="font-semibold">
                    {GB_CURRENCY.format(subtotal)}
                  </span>
                </option>
                <option>
                  <span>{TRY_CURRENCY.format(subtotal)}</span>
                </option>
                <option>
                  <span>{USD_CURRENCY.format(subtotal)}</span>
                </option>
              </select>
            </div>
          </div>
          {/* checkout*/}
          <div className="col-span-2 bg-white rounded h-[250px] p-7">
            <div className="text-xs xl:text-sm text-green-800 mb-2">
              Your order qualifies for{" "}
              <span className="font-bold">FREE DELIVERY</span>. Delivery Details
            </div>
            <div className="text-base xl:text-lg mb-4 ">
              Subtotal ({itemsNumber} items):
              <div className="font-semibold flex gap-x-2">
                <span> {GB_CURRENCY.format(subtotal)}</span>
                <p> , </p>
                <span>{TRY_CURRENCY.format(subtotal)}</span>
                <p>or</p>
                <span>{USD_CURRENCY.format(subtotal)}</span>
              </div>
            </div>

            <button className="btn flex items-center justify-center w-full font-bold">
              Buy Now
            </button>

            <Link
              to={"/"}
              className="btn flex items-center justify-center w-full font-bold"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
