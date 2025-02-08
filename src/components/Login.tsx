import { useState } from "react";
import axios from "axios";

interface LoginProps {
    setIsAuthenticated: (value: boolean) => void;
}

export const Login = ({ setIsAuthenticated }: LoginProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const api = axios.create({
        baseURL: "https://frontend-take-home-service.fetch.com",
        withCredentials: true,
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const userData = {
            name,
            email
        }
        console.log(userData)
        try {
            const response = await api.post("/auth/login", userData)
            setIsAuthenticated(true);
            console.log("Login response:", response.data);
        } catch (error) {
            console.error('Login failed: ', error);
        }
    }

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        
        if (target.id === "name") {
            setName(target.value)
        }
        if (target.id === "email") {
            setEmail(target.value)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-xl">Please Login: </h2>
            <div>
                <label className="text-left">Name: </label>
                <input
                    className="border border-yellow-500"
                    type="text"
                    id="name"
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label className="text-left">Email: </label>
                <input
                    className="border border-yellow-500"
                    type="text"
                    id="email"
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    )
};