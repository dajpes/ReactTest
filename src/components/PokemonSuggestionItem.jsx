import React from 'react';
import PokemonSuggestionType from './PokemonSuggestionType';

export default function pokemonSuggestionItem({ pokemonDetail, querySearch }) {
  const textHighlight = (name) => {
    const pokemonName = name.toLowerCase();
    const toSplit = pokemonName.startsWith(querySearch);

    const itemSearch = toSplit
      ? [querySearch, ...pokemonName.split(querySearch)].filter((e) => e !== '')
      : [pokemonName];

    return itemSearch.map((e, i, arr) => {
      if (e === querySearch.toLowerCase())
        return (
          <span key={`${e}_${i}`} className="hl">
            {e}
          </span>
        );
      return e;
    });
  };
  return (
    <>
      <li>
        <img src={pokemonDetail.img} alt={pokemonDetail.About} />
        <div className="info">
          <h1>
            {textHighlight(pokemonDetail.Name)}
            <span style={{marginLeft:"10px"}}>MaxCp:{pokemonDetail.MaxCP || '0'}</span>
          </h1>
          {pokemonDetail.Types.length &&
            pokemonDetail.Types.map((type) => (
              <PokemonSuggestionType
                type={type}
                key={`${type}_${pokemonDetail.Number}`}
              />
            ))}
        </div>
      </li>
    </>
  );
}
