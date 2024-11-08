'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

export default function Home() {
  const [scanValue, setScanValue] = useState<string>('');

  useEffect(() => {
    socket.on('scan', (data) => {
      setScanValue(data);
    });

    return () => {
      socket.off('scan');
    };
  }, []); // Only run on component mount

  return (
    <div className='container flex flex-col h-full justify-center items-center'>
      <div>Scanner Data: {scanValue}</div>
    </div>
  );
}
