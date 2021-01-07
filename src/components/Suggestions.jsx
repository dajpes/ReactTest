import React from 'react';
import PokemonSuggestionItem from './PokemonSuggestionItem';

export default function Suggestions({ pokemonSuggestions, querySearch }) {
  return (
    <>
      <ul className="suggestions">
        {pokemonSuggestions.length ? (
          pokemonSuggestions.map((pokemon) => (
            <PokemonSuggestionItem querySearch={querySearch} pokemonDetail={pokemon} key={+pokemon.Number}/>
          ))
        ) : (
          <li>
            <img
              src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png"
              alt=""
            />
            <div className="info">
              <h1 className="no-results">No results</h1>
            </div>
          </li>
        )}
      </ul>
    </>
  );
}
