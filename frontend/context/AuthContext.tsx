"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
const saveAuthToken = (token: string): void => {
    document.cookie = `authToken=${encodeURIComponent(token)}; path=/; max-age=86400; Secure; SameSite=Strict`;
};

const getAuthToken = (): string | null => {
    try {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [name, value] = cookie.split("=");
            if (name === "authToken") {
                return decodeURIComponent(value);
            }
        }
        return null;
    } catch (error) {
        console.error("❌ Lỗi khi lấy hoặc parse token:", error);
        return null;
    }
};

const removeAuthToken = (): void => {
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict";
};


interface User {
    id: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = getAuthToken();
        if (token) {
            try {
                const userData: User = JSON.parse(token);
                setUser(userData);
            } catch (error) {
                console.error("Invalid token:", error);
                removeAuthToken();
                setUser(null);
            }
        }
    }, []);

    const login = (userData: User) => {
        saveAuthToken(JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        removeAuthToken();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
