import { Link } from "react-router-dom";
import { RootState } from "../../../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../theme/themeSlice.ts";

export default function Navbar() {
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const items = useSelector((state: RootState) => state.cart.items);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="bg-black text-white p-4 flex justify-between items-center">

            <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" className="h-15 w-15" />
                <h1 className="font-bold">Whazzonline</h1>
            </Link>

            <div className="flex items-center gap-4">

                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="text-sm px-3 py-1 border rounded"
                >
                    {mode === "dark" ? "☀️ Light" : "🌙 Dark"}
                </button>

                <Link to="/cart" className="relative">
                    🛒 Cart
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 rounded-full px-2 text-xs">
                            {totalItems}
                        </span>
                    )}
                </Link>

            </div>
        </nav>
    );
}