import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";//alsıverıs sepetı ıcın
import { ProductDetails } from "../components";
import { GB_CURRENCY } from "../utils/constants";
import { callAPI } from "../utils/CallApi";
import { addToCart } from "../redux/cartSlice"; //alsıverıs sepetı ıcın
// useParams kullanılarak URL'deki parametreleri alır. Burada, id adında bir parametre alınır. Eğer URL şu şekildeyse: "/product/123", id değeri 123 olacaktır.


//useState kullanım sebebi APİ'den gelen nesneye ihtiac duydugumzdan
const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("1"); //eklenılen urunu duzgun tutabılmek ıcın
  const dispatch = useDispatch();

  //product.json dan veri cekmek için
  const getProduct = () => {
    callAPI(`data/products.json`).then((productResults) => {
      setProduct(productResults[id]); //ürünleri id ile çeiyoruz jsondan, idye gore dogru urun ayrıntıları gelcek
    });
  };

  const addQuantityToProduct = () => {
    setProduct((product.quantity = quantity));
    return product;
  };

  useEffect(() => {
    getProduct(); //jsondakı urunlerı getırmek ıcın. apı cagrısı
  }, []);

  //Eğer product durumu henüz gelmemişse veya title özelliği yoksa, kullanıcıya "Loading Product.." yazısı gösterilir. Bu, ürün verileri yüklenene kadar beklenen bir durumu temsil eder.
  if (!product?.title) return <h1>Loading Product..</h1>;

  // varsa produt.json ıcındekı bilgiler geliyor aşağoıda
  //productDetail filesi olusturuyoruz
  return (
    product && (
      <div className="h-screen bg-amazonclone-background ">
        <div className="min-w-[1000px] max-w-[1500px] m-auto p-4">
          <div className="grid grid-cols-10 gap-2">
            {/* left*/}
            <div className="col-span-3 p-8 rounded bg-white m-auto">
              <img src={`${product.image}`} alt="" />
            </div>
            {/* middle*/}
            <div className="col-span-5 p-4 rounded  bg-white divide-y divide-gray-400">
              <div className="mb-3">
                <ProductDetails product={product} ratings={true} />
              </div>
              <div className="text-base xl:text-lg mt-3">
                {product.description}
              </div>
            </div>
            {/* right*/}
            <div className="col-span-2 p-4 bg-white">
              <div className="text-xl xl:text-2xl text-red-700 text-right font-semibold">
                {GB_CURRENCY.format(product.price)}</div>
              <div className="text-base xl:text-lg text-gray-500 text-right font-semibold">
                RRP:
                <span className="line-through">
                  {GB_CURRENCY.format(product.oldPrice)}</span></div>
              <div className="text-sm xl:text-base text-blue-500 font-semibold mt-3">
                FREE Returns</div>
              <div className="text-sm xl:text-base text-blue-500  font-semibold mt-1">
                FREE Delivery</div>
              <div className="text-base xl:text-lg text-green-700 font-semibold mt-1">
                In Stock </div>
              <div className="text-base xl:text-lg mt-1">
                Quantity:
                <select
                  onChange={(e) => setQuantity(e.target.value)}
                  className="p-2 bg-white border rounded-md focus:border-indigo-600">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <Link to={"/checkout"}>
                {/*sepete ekle dendiginde eklenmesi isin dispatch edıyoruz */}
                <button
                  onClick={() => dispatch(addToCart(addQuantityToProduct()))} //sepete ekle dendiğinde dispatch yapılacak
                  className="btn font-bold"
                >
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductPage;
