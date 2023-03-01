import { useContext } from 'react';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { SolanaClusterContext } from '../../providers/SolanaCluster';
// <MenuItem value="https://api.devnet.solana.com">Devnet (api.devnet.solana.com)</MenuItem>
//<MenuItem value="https://api.testnet.solana.com">Testnet (api.testnet.solana.com)</MenuItem>
export const SolanaClusterSelect = () => {
  const { connection, changeSolanaCluster } = useContext(SolanaClusterContext);

  const onChangeCluster = (event) => {
    changeSolanaCluster(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 520 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Solana Cluster</InputLabel>
        <Select
          value={connection.rpcEndpoint}
          label="Solana Cluster"
          onChange={onChangeCluster}
        >
          <MenuItem value="https://solana-api.syndica.io/access-token/0VWYlEI9VqzgbwNyVPcXNffVN0e3ZTODtZfOaZQmHKN0cqVGgZEJlHBBx37QDOeW/rpc/">Mainnet Beta </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
