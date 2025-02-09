import { useContext } from "react";
import { Dog } from "../pages/Search";
import { FavoritesContext } from "../providers/FavoritesProvider";
import { useLocation } from "react-router-dom";

interface DogCardProps {
    dog: Dog;
}

const DogCard = ({ dog }: DogCardProps) => {
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
    const isFavorite = favorites.some((fav) => fav.id === dog.id);
    const location = useLocation();
    const isFavoritesPage = location.pathname === '/favorites'

    return (
        <li>
            <img src={dog.img} alt={dog.breed} />
            <h3>{dog.name}</h3>
            <p>Age: {dog.age}</p>
            <p>Breed: {dog.breed}</p>
            <p>Location: {dog.zip_code}</p>
            {!isFavoritesPage && (
                isFavorite ? (
                    <button
                        onClick={() => removeFromFavorites(dog)}
                    >
                        Remove from Favorites
                    </button>
                ): (
                    <button
                        onClick={() => addToFavorites(dog)}
                    >
                        Add to Favorites
                    </button>
                )
            )}
            {isFavoritesPage && (
                    <button
                        onClick={() => removeFromFavorites(dog)}
                    >
                        Remove from Favorites
                    </button>
                )}
        </li>
    )
};

export default DogCard;