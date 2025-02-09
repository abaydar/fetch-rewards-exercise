import { useContext, useState, useEffect } from "react";
import DogCard from "../components/DogCard";
import { FavoritesContext } from "../providers/FavoritesProvider";
import axios from "axios";
import { Dog } from "./Search";
import { Button } from "@radix-ui/themes";
import * as Dialog from '@radix-ui/react-dialog';

const Favorites = () => {
    const { favorites } = useContext(FavoritesContext);
    const [dogIds, setDogIds] = useState<string[]>([]);
    const [matchedDog, setMatchedDog] = useState<Dog | null>(null)

    const findMatchedDog = (id: string) => {
        return favorites.find((dog) => dog.id === id);
    };

    const generateMatch = async (dogIds: string[]) => {
        try {
            const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs/match', dogIds, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            const dogMatch = findMatchedDog(response.data.match);
            if (dogMatch) {
                setMatchedDog(dogMatch);
            }
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
                    <DogCard key={dog.id} dog={dog} hideRemoveBtn={true}/>
            ))
            ):(
                <p>No Favorites yet</p>
            )
            }
            {matchedDog && (
                <Dialog.Root open={true} onOpenChange={() => setMatchedDog(null)}>
                    <Dialog.Trigger asChild>
                        <Button onClick={() => generateMatch(dogIds)}>Generate Match</Button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="DialogOverlay"/>
                        <Dialog.Content className="DialogContent">
                            <Dialog.Title className="DialogTitle">
                                Your Match
                            </Dialog.Title>
                            <Dialog.Description className="DialogDescription">
                                Congrats! You matched with {matchedDog.name}
                            </Dialog.Description>
                                <DogCard dog={matchedDog} />
                            <Dialog.Close asChild>
                                <button className="IconButton" aria-label="Close">
                                    X
                                </button>
                            </Dialog.Close>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            )}
        </>
    )
}

export default Favorites;