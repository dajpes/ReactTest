import React from 'react';

const PokemonSuggestionType = ({ type }) => (
  <span className={`type ${type.toLowerCase()}`}>{type}</span>
);

export default PokemonSuggestionType;