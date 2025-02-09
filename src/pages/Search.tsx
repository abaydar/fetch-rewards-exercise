import axios from "axios"
import { useEffect, useState } from "react"

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  }

const Search = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [dogIds, setDogIds] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getDogDetails = async (dogIds: string[]) => {
        console.log('fetching details for dog ids: ', dogIds)
        try {
            const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs', dogIds, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
            setDogs(response.data)
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching Dog Details: ', error);
        }
    }
  
    const getDogs = async () => {
        try {
            const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
                params: {
                size: 25,
                sort: 'breed:asc',
                },
                withCredentials: true,
            });
            setDogIds(response.data.resultIds);
        } catch (error) {
            console.error("Error fetching dogs: ", error);
        }
    }

    useEffect(() => {
        getDogs();
    }, [])

    useEffect(() => {
        if (dogIds.length > 0) {
            getDogDetails(dogIds);
        }
    }, [dogIds])

    return (
        <>
            this is the seach component
        </>
    )
}

export default Search