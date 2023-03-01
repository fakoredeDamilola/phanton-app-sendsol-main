import { FC, createContext, useContext, useState } from 'react';
import { Connection } from '@solana/web3.js';
import { ValueClusterType } from '../types/solana';

export const Cluster = {
  devnet: 'https://api.devnet.solana.com',
  testnet: 'https://api.testnet.solana.com',
  mainnet: 'https://solana-api.syndica.io/access-token/0VWYlEI9VqzgbwNyVPcXNffVN0e3ZTODtZfOaZQmHKN0cqVGgZEJlHBBx37QDOeW/rpc/',
}

const initConnection = (cluster) => {
  const connection = new Connection(cluster, 'confirmed');

  return connection;
}

const defaultValue = {
  connection: initConnection(Cluster.mainnet),
  changeSolanaCluster: (cluster) => {},
};
export const SolanaClusterContext = createContext(defaultValue);



export const SolanaClusterContextProvider = ({children}) => {
  const context = useContext(SolanaClusterContext);
  const [connection, setCluster] = useState(context.connection);

  const changeSolanaCluster = (cluster) => {
    switch (cluster) {
      case 'https://api.devnet.solana.com':
        setCluster(initConnection(Cluster.devnet));
        break;
      case 'https://api.testnet.solana.com':
        setCluster(initConnection(Cluster.testnet));
        break;
      case 'https://solana-api.syndica.io/access-token/0VWYlEI9VqzgbwNyVPcXNffVN0e3ZTODtZfOaZQmHKN0cqVGgZEJlHBBx37QDOeW/rpc/':
        setCluster(initConnection(Cluster.mainnet));
        break;
    }
  };

  return (
    <SolanaClusterContext.Provider value={{ connection, changeSolanaCluster }}>
      {children}
    </SolanaClusterContext.Provider>
  );
};
