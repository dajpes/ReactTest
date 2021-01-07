import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Suggestions from './components/Suggestions';

const URL_PATH =
  'https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json';

const App = () => {
  const [pokemon, setPokemon] = useState('');
  const [maxPoints, setmaxPoints] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const firstRender = useRef(true);
  useEffect(() => {
    async function searchPokemon() {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      if (pokemon === '') {
        setPokemonList([]);
        return;
      }
      setLoading(!loading);

      //The line below would be like a debounce Function
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const findPokemon = await fetch(URL_PATH).then((res) => res.json());

      const getResults = findPokemon.filter((item) => {
        const searchType = item.Types.filter((type) =>
          type.toLowerCase().startsWith(pokemon.toLowerCase()),
        );

        return (
          item.Name.toLowerCase().includes(pokemon.toLowerCase()) ||
          searchType.length
        );
      });
      const formmatedSearch =
        getResults.length > 3 ? getResults.slice(0, 4) : getResults;
      setPokemonList(formmatedSearch);
      setLoading(false);
    }

    searchPokemon();
  }, [pokemon]);

  function sortPokemonList() {
    if (maxPoints) {
      setPokemonList(pokemonList.sort((prev, next) => prev.MaxCP - next.MaxCP));
      return;
    }

    setPokemonList(pokemonList.sort((prev, next) => next.MaxCP - prev.MaxCP));
  }
  return (
    <>
      <label htmlFor="maxCP" className="max-cp">
        <input
          type="checkbox"
          id="maxCP"
          value={maxPoints}
          onChange={(e) => setmaxPoints(!maxPoints)}
          onClick={sortPokemonList}
        />
        <small>Maximum Combat Points</small>
      </label>
      <input
        type="text"
        className="input"
        placeholder="Pokemon or type"
        value={pokemon}
        onChange={(e) => setPokemon(e.target.value)}
      />
      {loading && <div className="loader"></div>}
      <Suggestions pokemonSuggestions={pokemonList} querySearch={pokemon} />
    </>
  );
};

export default App;
