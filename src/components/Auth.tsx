import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { Button } from "@radix-ui/themes";

const Auth = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateForm = () => {
        let isValid = true;
        setNameError('');
        setEmailError('');

        if (!name) {
            setNameError('Name is required');
            isValid = false;
        }

        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email is invalid');
            isValid = false;
        }

        return isValid;
    };

    const api = axios.create({
        baseURL: "https://frontend-take-home-service.fetch.com",
        withCredentials: true,
    })

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userData = {
            name,
            email
        }

        if (!validateForm()) {
            return;
        }

        try {
            const response = await api.post("/auth/login", userData)
            setIsAuthenticated(true);
            console.log("Login response:", response.data);
            navigate("/search")
        } catch (error) {
            console.error('Login failed: ', error);
        }
    }

    const handleLogout = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const response = await api.post("/auth/logout")
            setIsAuthenticated(false)
            console.log("Logout response: ", response.data)
        } catch (error) {
            console.error("Logout failed: ", error);
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
        <>
            {isAuthenticated ? 
                <Button
                    onClick={handleLogout}
                >Log Out</Button> :
                (<form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                    {nameError && <span className="text-red-500 text-sm">{nameError}</span>}
                    <div>
                        <label className="text-left">Email: </label>
                        <input
                            className="border border-yellow-500"
                            type="text"
                            id="email"
                            onChange={handleInputChange}
                            />
                    </div>
                    {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
                    <Button type="submit">Login</Button>
                </form>
            )}
        </>
    )
};

export default Auth;