# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=

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
