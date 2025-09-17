import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Lock Chatter',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '2ec9743d0d0cd7fb94dee1a7e6d33475',
  chains: [sepolia],
  ssr: false,
});

export const contractConfig = {
  address: import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`,
  abi: [
    // Contract ABI will be generated after compilation
  ],
};
