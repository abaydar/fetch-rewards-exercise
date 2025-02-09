import { createContext, ReactNode, SetStateAction, useEffect, useState } from "react";
import { Dog } from "../pages/Search";

interface FavoritesContextType {
    favorites: Dog[];
    addToFavorites: (dog: Dog) => void;
    removeFromFavorites: (dog: Dog) => void;
}

const defaultAddToFavorites = (() => {}) as React.Dispatch<SetStateAction<Dog | null>>;
const defaultRemoveFromFavorites = (() => {}) as React.Dispatch<SetStateAction<Dog | null>>;

export const FavoritesContext = createContext<FavoritesContextType>({
    favorites: [],
    addToFavorites: defaultAddToFavorites,
    removeFromFavorites: defaultRemoveFromFavorites
})

interface FavoritesProviderProps {
    children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
    const savedFavorites = localStorage.getItem('favorites');
    const initialFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    const [favorites, setFavorites] = useState<Dog[]>(initialFavorites);

    const addToFavorites = (dog: Dog) => {
        setFavorites((currDogs) => {
            if (currDogs.find((fav) => fav.id === dog.id)) return currDogs;
            const newFavorites = [...currDogs, dog];
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
        })
    }

    const removeFromFavorites = (dog: Dog) => {
        setFavorites((currDogs) => {
            const newFavorites = currDogs.filter((fav) => fav.id !== dog.id);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
    })
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    return(
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
            {children}
        </FavoritesContext.Provider>
    )
}
