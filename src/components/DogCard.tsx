import { useContext } from "react";
import { Dog } from "../pages/Search";
import { FavoritesContext } from "../providers/FavoritesProvider";
import { useLocation } from "react-router-dom";
import { Button } from "@radix-ui/themes";

interface DogCardProps {
    dog: Dog;
    hideRemoveBtn?: boolean
}

const DogCard = ({ dog, hideRemoveBtn = false}: DogCardProps) => {
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
    const isFavorite = favorites.some((fav) => fav.id === dog.id);
    const location = useLocation();
    const isFavoritesPage = location.pathname === '/favorites'

    return (
        <li className="text-stone-900 list-none">
            <img src={dog.img} alt={dog.breed} />
            <h3>{dog.name}</h3>
            <p>Age: {dog.age}</p>
            <p>Breed: {dog.breed}</p>
            <p>Location: {dog.zip_code}</p>
            {!isFavoritesPage && (
                isFavorite ? (
                    <Button
                        onClick={() => removeFromFavorites(dog)}
                    >
                        Remove from Favorites
                    </Button>
                ): (
                    <Button
                        onClick={() => addToFavorites(dog)}
                    >
                        Add to Favorites
                    </Button>
                )
            )}
            {isFavoritesPage && hideRemoveBtn && (
                    <Button
                        onClick={() => removeFromFavorites(dog)}
                    >
                        Remove from Favorites
                    </Button>
                )}
        </li>
    )
};

export default DogCard;