import React from 'react';

// import { Container } from './styles';

export default function Repository({ match }) {
  return <h1>repository: {decodeURIComponent(match.params.repository)}</h1>;
}