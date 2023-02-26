import { useEffect, useState } from "react"
import Result from "./Result";
import { useBreedList } from "./useBreedList";
import {useQuery} from '@tanstack/react-query'
import fetchSearch from './fetchSearch'
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {  
  const [reqParams, setReqParams] = useState({
    location:"",
    animal:"",
    breed:"",
  })
    const [animal, setAnimal] = useState("");  
    const [breeds] = useBreedList(animal);

    const results = useQuery(["search",reqParams],fetchSearch);
    const pets = results?.data?.pets??[];


  return (
    <div className="search-params">
      <form onSubmit={(e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);
const obj = {
  animal: formData.get("animal") ?? "",
  breed: formData.get("breed") ?? "",
  location: formData.get("location") ?? "",
        }
        setReqParams(obj);
        }} >
        <label htmlFor="location">LOCATION</label>
        <input type="text" name="location" id="location" placeholder="location" />

        <label htmlFor="animal">ANIMAL</label>
        <select id="animal" value={animal} onChange={(e) => { setAnimal(e.target.value);
        }} onBlur={(e) => {
            setAnimal(e.target.value);
          }}>
            <option />
            {ANIMALS.map((animal) => (
                <option key={animal} value={animal}>{animal}</option>
            ))}
        </select>

        <label htmlFor="breed">BREED</label>
        <select id="breed" disabled={breeds.length === 0} name="breed" placeholder="breed">
            <option />
            {breeds.map((breed) => (
                <option key={breed} value={breed}>{breed}</option>
            ))}
        </select>
        
        <button>Submit</button>
      </form>
      <Result pets={pets} />
    </div>
  )
}

export default SearchParams;
