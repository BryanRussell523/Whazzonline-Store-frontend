import { useState } from "react";
import { useLoginMutation } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { saveToken } from "../../../../utils/auth";
import { Link } from "react-router-dom";
export default function Login() {
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const res = await login(form).unwrap();

            saveToken(res.token);

            toast.success("Login successful");
            navigate("/");
        } catch (err: any) {
            toast.error(err?.data?.message || "Login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    placeholder="Email"
                    className="border p-2 w-full"
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full"
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button className="bg-black text-white px-4 py-2 w-full">
                    Login
                </button>
                <p className="text-center mt-4 text-sm text-gray-500">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-500 underline">
                        Create one
                    </Link>
                </p>
            </form>
        </div>
    );
}