import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../api/products.api";

export default function ProductDetail() {
    const { id } = useParams();

    const { data, isLoading, isError } = useGetProductByIdQuery(id);

    if (isLoading)
        return <p className="text-center mt-10">Loading product...</p>;

    if (isError || !data)
        return <p className="text-center text-red-500 mt-10">Product not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white min-h-screen">
            <Link to="/" className="text-blue-600 dark:text-blue-400 underline">
                ← Back to products
            </Link>

            <div className="mt-6 grid md:grid-cols-2 gap-8">
                <img
                    src={data.image}
                    alt={data.name}
                    className="w-full rounded-lg object-cover"
                />

                <div>
                    <h1 className="text-3xl font-bold">{data.name}</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        {data.description}
                    </p>

                    <p className="text-xl font-bold text-green-600 mt-4">
                        ${data.price}
                    </p>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Category: {data.category}
                    </p>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Stock: {data.stock}
                    </p>

                    <button className="mt-6 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded hover:opacity-90">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}