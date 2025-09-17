# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Infura Configuration (Optional)
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
VITE_RPC_URL=https://1rpc.io/sepolia

# Contract Configuration
VITE_CONTRACT_ADDRESS=

# Private Key for Deployment (Keep this secret!)
PRIVATE_KEY=

# Etherscan API Key for Contract Verification
ETHERSCAN_API_KEY=
```

## Important Notes:

1. **Never commit the `.env.local` file to version control**
2. **Keep your private key secure and never share it**
3. **The contract address will be filled after deployment**
4. **Make sure to add `.env.local` to your `.gitignore` file**
