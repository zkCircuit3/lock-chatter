# Lock Chatter 💬🔐

A next-generation decentralized chat platform that revolutionizes private communication through **Fully Homomorphic Encryption (FHE)** technology. Experience truly secure conversations where your messages remain encrypted even during processing.

## ✨ Key Features

### 💬 **Smart Chat Rooms**
- Create public and private encrypted chat rooms
- Real-time messaging with FHE protection
- Intuitive room management and moderation

### 🔐 **Advanced Encryption**
- Messages encrypted using FHE technology
- Zero-knowledge message processing
- Complete privacy protection for all conversations

### 🌐 **Blockchain-Powered**
- Built on Ethereum Sepolia testnet
- Decentralized chat room management
- No central authority or data storage

### 💼 **Seamless Wallet Integration**
- RainbowKit integration with latest versions
- Support for multiple wallet providers
- One-click Web3 authentication

### 🏆 **Community-Driven**
- User reputation system with FHE encryption
- Trust-based access control
- Community moderation tools

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- MetaMask or compatible Web3 wallet

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zkCircuit3/lock-chatter.git
   cd lock-chatter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp ENV_SETUP.md .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Smart Contract Deployment

### 1. Compile Contracts
```bash
npm run compile
```

### 2. Run Tests
```bash
npm run test
```

### 3. Deploy to Sepolia
```bash
npm run deploy
```

## 📁 Project Structure

```
lock-chatter/
├── contracts/              # Smart contracts
│   └── LockChatter.sol    # Main FHE chat contract
├── scripts/                # Deployment scripts
│   └── deploy.ts          # Contract deployment
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── ChatRoom.tsx   # Main chat interface
│   │   └── WalletConnect.tsx # Wallet connection
│   ├── lib/               # Utility functions
│   │   ├── contract.ts    # Contract interactions
│   │   ├── fhe-utils.ts   # FHE utilities
│   │   └── wallet-config.ts # Wallet configuration
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Home page
│   │   └── NotFound.tsx   # 404 page
│   └── App.tsx            # Main application
├── public/                # Static assets
├── hardhat.config.ts      # Hardhat configuration
└── package.json
```

## 🔐 Privacy & Security Architecture

### FHE Implementation
- **Encrypted Data Types**: All sensitive data uses FHE encryption
- **Zero-Knowledge Processing**: Messages processed without decryption
- **Secure Computation**: FHE operations on encrypted chat data

### Smart Contract Features
- **Chat Rooms**: Create public/private encrypted chat rooms
- **Message Encryption**: All messages encrypted with FHE
- **User Profiles**: Encrypted user reputation and activity
- **Access Control**: FHE-based room membership verification

### Security Measures
- **End-to-End Encryption**: Messages encrypted from sender to recipient
- **Decentralized Storage**: No central data repository
- **Immutable Records**: All interactions recorded on blockchain
- **Privacy by Design**: FHE ensures data never exposed in plaintext

## 🌐 Network Configuration

### Sepolia Testnet
- **Chain ID**: 11155111
- **RPC URL**: https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
- **Wallet Connect**: 2ec9743d0d0cd7fb94dee1a7e6d33475

### Environment Variables
```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_CONTRACT_ADDRESS=<deployed_contract_address>
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components

### Blockchain
- **Solidity** - Smart contract language
- **Hardhat** - Development framework
- **FHEVM** - Fully Homomorphic Encryption
- **OpenZeppelin** - Security libraries

### Wallet Integration
- **RainbowKit** - Wallet connection UI
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript Ethereum library

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Import project from GitHub
   - Configure build settings

2. **Environment Variables**
   - Add all required environment variables
   - Set production contract address

3. **Build Configuration**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "installCommand": "npm install"
   }
   ```

4. **Deploy**
   - Automatic deployment on push to main
   - Custom domain configuration available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **GitHub Repository**: https://github.com/zkCircuit3/lock-chatter
- **Live Demo**: [Deploy to Vercel for live demo]
- **Documentation**: [Link to detailed docs]

## 🙏 Acknowledgments

- **Zama** - FHE technology and FHEVM
- **RainbowKit** - Wallet connection framework
- **OpenZeppelin** - Security libraries
- **shadcn/ui** - Beautiful UI components

---

**Built with ❤️ by zkCircuit3**

*Privacy is not a privilege, it's a right. Lock Chatter ensures your conversations stay private.*