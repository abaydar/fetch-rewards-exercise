import axios from "axios"
import { useEffect, useState } from "react"
import DogCard from "../components/DogCard";
import { Button } from "@radix-ui/themes";

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

    const allBreeds = breedFilter === "All Breeds" || breedFilter === "";

    return (
        <div className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-2">
                <label className="font-semibold">Filter by Breed: </label>
                <select
                    className="border border-gray-300 rounded-md p-2"
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
            {allBreeds && <div className="flex flex-col sm:flex-row items-center gap-2">
                <label className="font-semibold">Sort by Breed Name:</label>
                <select
                    className="border border-gray-300 rounded-md p-2"
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
            </div>}
            <div className="flex items-center justify-center gap-4">
                <Button
                    onClick={(() => setPageNum((currPageNum) => currPageNum - 1))}
                    disabled={pageNum === 1}
                    className={`px-4 py-2 rounded-md ${
                        pageNum === 1
                            ? "bg-transparent text-gray-400 cursor-default"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    Previous
                </Button>
                    <span className="font-semibold">{pageNum}</span>
                <Button
                    onClick={() => setPageNum((currPageNum) => currPageNum + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                    Next
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {!isLoading && dogs.map((dog) => (
                    <DogCard key={dog.id} dog={dog}/>
                ))}
            </div>
        </div>
    )
}

export default Search