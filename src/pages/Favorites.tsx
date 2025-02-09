import { useContext, useState, useEffect } from "react";
import DogCard from "../components/DogCard";
import { FavoritesContext } from "../providers/FavoritesProvider";
import axios from "axios";
import { Button } from "@radix-ui/themes";


const Favorites = () => {
    const { favorites } = useContext(FavoritesContext);
    const [dogIds, setDogIds] = useState<string[]>([]);

    const findMatchedDog = (id: string) => {
        return favorites.find((dog) => dog.id === id);
    };

    const generateMatch = async (dogIds: string[]) => {
        try {
            const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs/match', dogIds, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            findMatchedDog(response.data.match)
        } catch (error) {
            console.error('Error generating match: ', error);
        }
    }

    useEffect(() => {
        const ids = favorites.map((dog) => dog.id);
        setDogIds(ids);
    }, [favorites])

    return (
        <>
            <h2>Favorite Dogs</h2>
            <Button
                onClick={() => generateMatch(dogIds)}
            >Generate Match</Button>
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