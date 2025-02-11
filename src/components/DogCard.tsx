import { useContext } from "react";
import { Dog } from "../pages/Search";
import { FavoritesContext } from "../providers/FavoritesProvider";
import { useLocation } from "react-router-dom";

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
        <li className="list-none bg-white shadow-lg rounded-lg p-4 flex flex-col items-center w-64">
            <img
                src={dog.img}
                alt={dog.breed}
                className="w-40 h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{dog.name}</h3>
            <div className="w-full text-left px-4">
                <p className="text-gray-700">Age: <span className="font-semibold">{dog.age}</span></p>
                <p className="text-gray-700">Breed: <span className="font-semibold">{dog.breed}</span></p>
                <p className="text-gray-700">Location: <span className="font-semibold">{dog.zip_code}</span></p>
            </div>
            {!isFavoritesPage && (
                isFavorite ? (
                    <button
                        className="mt-2 bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={() => removeFromFavorites(dog)}
                    >
                        Remove from Favorites
                    </button>
                ): (
                    <button
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={() => addToFavorites(dog)}
                    >
                        Add to Favorites
                    </button>
                )
            )}
            {isFavoritesPage && hideRemoveBtn && (
                    <button
                        onClick={() => removeFromFavorites(dog)}
                        className="mt-2 bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        Remove from Favorites
                    </button>
                )}
        </li>
    )
};

export default DogCard;