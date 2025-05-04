import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const api = "https://pokeapi.co/api/v2/pokemon/"
  const [pokemonData ,setPokemonData] = useState([])

   useEffect(() => {
     const getData = async ( ) => {
     const responce =  await  fetch (api)
     const data = await responce.json()

     const fetchedData = await Promise.all(
     data.results.map(async (item, i)=>{
       const pokemonResponse = await fetch(item.url)
       const pokemonDetails = await pokemonResponse.json()
       return{
        name:item.name,
        image :pokemonDetails.sprites.front_default
      }
    })  
  )
  setPokemonData(fetchedData)
     }
     getData()
   }, [])

  return (
    <>
    <div className='pokemon-container'>
      {pokemonData.map((item , i)=>{
      return (
        <div key={i} className='pokemon-detai'>
           <img  src={item.image} alt=""  />
           <p>{item.name}</p>
        </div>
      ) 
      })}
    </div>
    </>
  )
}

export default App
