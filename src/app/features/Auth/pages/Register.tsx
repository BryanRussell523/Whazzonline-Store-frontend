import { useState } from "react";
import { useRegisterMutation } from "../api/auth.api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { saveToken } from "../../../../utils/auth";

export default function Register() {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const res = await register(form).unwrap();

            saveToken(res.token);

            toast.success("Account created");
            navigate("/");
        } catch (err: any) {
            toast.error(err?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Register</h1>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    placeholder="Name"
                    className="border p-2 w-full"
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

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
                    Create Account
                </button>
                <p className="text-center mt-4 text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}