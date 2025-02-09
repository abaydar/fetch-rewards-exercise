import { useContext } from "react";
import DogCard from "../components/DogCard";
import { FavoritesContext } from "../providers/FavoritesProvider";


const Favorites = () => {
    const { favorites } = useContext(FavoritesContext);

    return (
        <>
            <h2>Favorite Dogs</h2>
            {favorites.length ? (
                favorites.map((dog) => (
                    <DogCard key={dog.id} dog={dog} />
                ))
            ):(
                <p>No Favorites yet</p>
            )
            }
        </>
    )
}

export default Favorites;