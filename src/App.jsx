import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const api = "https://pokeapi.co/api/v2/pokemon/"
  const [pokemonData ,setPokemonData] = useState([])
  const [Score, setScore] = useState(0)
  const [BestScore, setBestScore] = useState(0)
  const [clickedpokemons, setClickedPokemons] = useState([])
  function shuffleArray(array) {
    return array.sort(()=>Math.random()-0.5)
  }
  
  function handleclick(pokemonName) {
    if (clickedpokemons.includes(pokemonName)) {
      setScore(0)
      setBestScore(Score)
      setClickedPokemons([])
    }else{
      setScore(Score+1)
      setClickedPokemons([...clickedpokemons , pokemonName])
      setPokemonData((p)=>shuffleArray([...p]))
    }
  }

  useEffect(() => {
     const getData = async ( ) => {
     const responce =  await  fetch (api)
     const data = await responce.json()

     const fetchedData = await Promise.all(
     data.results.splice(0,10).map(async (item, i)=>{
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
    <h1>Pokemon Memory Card Game</h1>
    <p>Get points by clicking on pokemons, but don't click on the same pokemon twice!</p>
    <p>Score :{Score}</p>
    <p>Best Score :{BestScore}</p>
    <div className='pokemon-container'>
      {pokemonData.map((item , i)=>{
      return (
        <div key={i} className='pokemon-detail'  onClick={()=>handleclick(item.name)} >
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
