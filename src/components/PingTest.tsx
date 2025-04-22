import React, { useEffect, useState } from 'react';
import { api } from '../lib/axios';

export function PingTest() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await api.get('/ping');
        setMessage(response.data);
      } catch (err) {
        setError('Erro ao conectar com o backend');
        console.error('Erro:', err);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Teste de Conexão</h2>
      {message && <p className="text-green-600">Resposta: {message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
} 