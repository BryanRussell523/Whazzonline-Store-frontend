import { useGetProductsQuery } from "../api/products.api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../cart/cartSlice";

export default function ProductList() {

    const { data, isLoading, isError } = useGetProductsQuery();

    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const filteredProducts = data?.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());

        const matchesCategory = category === "all" || product.category === category;

        return matchesSearch && matchesCategory;
    });
    if (isLoading)
        return <p className="text-center mt-10">Loading products...</p>;

    if (isError)
        return <p className="text-center text-red-500 mt-10">Failed to load products</p>;

   return (
  <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen text-black dark:text-white">
    <h1 className="text-3xl font-bold text-center mb-6">
      Whazzonline Store
    </h1>

    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 rounded w-full text-black dark:text-white"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 rounded w-full md:w-48 text-black dark:text-white"
      >
        <option value="all">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Home">Home</option>
      </select>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredProducts?.map((product) => (
        <Link to={`/products/${product.id}`} key={product.id}>
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg shadow bg-white dark:bg-gray-900 hover:shadow-lg transition overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-green-600">
                  ${product.price}
                </span>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      addToCart({
                        id: product.id,
                        name: product.name,
                        image: product.image,
                        price: product.price,
                      })
                    );
                  }}
                  className="bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded hover:opacity-90"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);
}