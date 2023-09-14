/*import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import { RingLoader } from 'react-spinners';

const LoadingSpinner = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simule um tempo de carregamento fictício
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // Altere para o tempo real de carregamento

    return () => clearTimeout(timeout);
  }, []);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="loading-spinner">
      <RingLoader
        css={override}
        size={150}
        color={'#36D7B7'}
        loading={loading}
      />
      {loading && <p>Carregando...</p>}
    </div>
  );
};

export default LoadingSpinner;*/