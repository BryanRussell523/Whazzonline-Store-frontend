import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} from "../cart/cartSlice";

import { useCheckoutMutation } from "../api/order.api";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../../utils/auth";
import toast from "react-hot-toast";
export default function CartPage() {
    const [checkoutMutation, { isLoading }] = useCheckoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const items = useSelector((state: RootState) => state.cart.items);

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const handleCheckout = async () => {
        if (items.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("You must log in to continue checkout");

            setTimeout(() => {
                navigate("/login");
            }, 1200);

            return;
        }

        const payload = items.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
        }));

        try {
            const res = await checkoutMutation(payload).unwrap();

            toast.success("Order placed successfully!");

            console.log(res);

            // optional: clear cart after success
            items.forEach((item) => {
                dispatch(removeFromCart(item.id));
            });

        } catch (err: any) {
            const status = err?.status;

            if (status === 401) {
                toast.error("Session expired. Please log in again.");

                setTimeout(() => {
                    navigate("/login");
                }, 1200);

                return;
            }

            if (status === 403) {
                toast.error("You are not allowed to perform this action");
                return;
            }

            toast.error("Checkout failed. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

            {items.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
            ) : (
                <>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="border border-gray-200 dark:border-gray-800 rounded p-4 mb-4 flex gap-4 bg-white dark:bg-gray-900"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded"
                            />

                            <div className="flex-1">
                                <h2 className="font-bold">{item.name}</h2>
                                <p className="text-gray-600 dark:text-gray-300">${item.price}</p>

                                <div className="flex gap-2 mt-2">
                                    <button onClick={() => dispatch(decreaseQuantity(item.id))}
                                    className="border border-gray-300 dark:border-gray-700 px-2 rounded">
                                        -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                    onClick={() => dispatch(increaseQuantity(item.id))}
                                     className="border border-gray-300 dark:border-gray-700 px-2 rounded">
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                             onClick={() => dispatch(removeFromCart(item.id))}
                             className="text-red-500">Remove</button>
                        </div>
                    ))}

                    <div className="text-right mt-8">
                        <h2 className="text-2xl font-bold">
                            Total: ${total.toFixed(2)}
                        </h2>
                        <button
                            onClick={handleCheckout}
                            disabled={isLoading || items.length === 0}
                            className={`mt-4 px-6 py-3 rounded text-white dark:text-black 
    ${isLoading || items.length === 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-black dark:bg-white"
                                }`}
                        >
                            {isLoading ? "Processing..." : "Checkout"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}