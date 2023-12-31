import { ProductBadge, ProductRatings } from "./";

const ProductDetails = ({ product, ratings }) => {
  //brand:marka avgrating:ort derecelendırme attribute:nitelik badge:rozet
  //props gecip detayları listeliyoruz
  //ürün detayında resmın yanndakı marka, yıldız, rozet vs gelmesi için props gecıyoruz bunları
  return (
    <div className="mb-1">
      <div className="text-xl xl:text-2xl font-medium mb-1">
        {product.title}
      </div>
      <div className="text-sm xl:text-base mb-1">
        by <span className="text-blue-500">{product.brand}</span>
      </div>
      {ratings && ( //rating gosterılcek yer varsa goster dıyorum
        <div>
          <ProductRatings
            avgRating={product.avgRating}
            ratings={product.ratings}/></div>
      )}
      <div className="text-sm xl:text-base mb-1">{product.avgRating}</div>
      <div className="text-xs xl:text-sm font-bold mb-1">
        {product.attribute}</div>
      <div>  {/* amaç rozet getirtmek özetin altına */}
        <ProductBadge badge={product.badge} />
      </div>
    </div>
  );
};

export default ProductDetails;
