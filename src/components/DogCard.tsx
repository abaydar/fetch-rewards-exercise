import { Dog } from "../pages/Search";

interface DogCardProps {
    dog: Dog;
}

const DogCard = ({ dog }: DogCardProps) => (
    <ul>
        <li>
            <img src={dog.img} alt={dog.breed} />
            {dog.name}<br/>
            {dog.age}<br/>
            {dog.breed}<br/>
            {dog.zip_code}<br/>
        </li>
    </ul>
);

export default DogCard;