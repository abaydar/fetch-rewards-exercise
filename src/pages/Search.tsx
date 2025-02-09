import axios from "axios"
import { useEffect, useState } from "react"
import DogCard from "../components/DogCard";
import Auth from "../components/Auth";

export interface Dog {
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
    const [breeds, setBreeds] = useState<string[]>([]);
    const [breedFilter, setBreedFilter] = useState<string>("");
    const [sort, setSort] = useState<string>("breed:asc");
    const [pageNum, setPageNum] = useState<number>(1);

    const getBreeds = async () => {
        try {
            const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', {
                withCredentials: true
            })
            setBreeds(response.data);
        } catch (error) {
            console.error('Error fetching dog breeds: ', error);
        }
    }

    const getDogDetails = async (dogIds: string[]) => {
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
                    size: 10,
                    from: (pageNum - 1) * 10,
                    sort: sort,
                    breeds: breedFilter ? [breedFilter] : [],
                },
                withCredentials: true,
            });
            setDogIds(response.data.resultIds);
        } catch (error) {
            console.error("Error fetching dogs: ", error);
        }
    }

    useEffect(() => {
        getBreeds();
    }, []);

    useEffect(() => {
        getDogs();
    }, [breedFilter, sort, pageNum])

    useEffect(() => {
        if (dogIds.length > 0) {
            getDogDetails(dogIds);
        }
    }, [dogIds])

    return (
        <>
            <Auth />
            <div>
                <label>Filter by Breed: </label>
                <select
                    value={breedFilter}
                    onChange={(e) => {
                        setBreedFilter(e.target.value)
                        setPageNum(1)
                    }}
                >
                    <option value={""}>All Breeds</option>
                    {breeds.map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Sort by Breed Name:</label>
                <select
                    value={sort}
                    onChange={
                        (e) => {
                            setSort(e.target.value)
                            setPageNum(1)
                    }}
                >
                    <option value="breed:asc">Ascending</option>
                    <option value="breed:desc">Decending</option>
                </select>
            </div>
            <div>
                {pageNum > 1 && <button
                    onClick={(() => setPageNum((currPageNum) => currPageNum - 1))}
                    disabled={pageNum === 1}
                >
                    Previous
                </button>}
                    <span>{pageNum}</span>
                <button onClick={() => setPageNum((currPageNum) => currPageNum + 1)}>
                    Next
                </button>
            </div>
            {!isLoading && dogs.map((dog) => (
                <ul>
                    <DogCard key={dog.id} dog={dog}/>
                </ul>
            ))}
        </>
    )
}

export default Search