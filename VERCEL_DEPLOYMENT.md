# Vercel Deployment Guide for Lock Chatter

This guide provides step-by-step instructions for deploying Lock Chatter to Vercel.

## 🚀 Prerequisites

- Vercel account (free tier available)
- GitHub repository access
- Environment variables ready

## 📋 Step-by-Step Deployment

### Step 1: Connect to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose `zkCircuit3/lock-chatter`
   - Click "Import"

### Step 2: Configure Project Settings

1. **Project Name**
   - Set project name: `lock-chatter`
   - Choose team (personal or organization)

2. **Framework Preset**
   - Framework: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Root Directory**
   - Leave as default (root)

### Step 3: Environment Variables

Add the following environment variables in Vercel dashboard:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# Contract Configuration (Update after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=
```

**Important**: 
- Replace `NEXT_PUBLIC_CONTRACT_ADDRESS` with your deployed contract address
- Keep `PRIVATE_KEY` and `ETHERSCAN_API_KEY` empty for security

### Step 4: Deploy

1. **Initial Deployment**
   - Click "Deploy" button
   - Wait for build to complete (2-3 minutes)
   - Note the deployment URL

2. **Verify Deployment**
   - Visit the provided URL
   - Test wallet connection
   - Verify UI loads correctly

### Step 5: Custom Domain (Optional)

1. **Add Domain**
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your custom domain

2. **Configure DNS**
   - Add CNAME record pointing to Vercel
   - Wait for DNS propagation (up to 24 hours)

## 🔧 Post-Deployment Configuration

### Step 1: Deploy Smart Contract

1. **Local Deployment**
   ```bash
   npm run compile
   npm run deploy
   ```

2. **Get Contract Address**
   - Copy the deployed contract address
   - Update Vercel environment variable

### Step 2: Update Environment Variables

1. **In Vercel Dashboard**
   - Go to Project Settings → Environment Variables
   - Update `NEXT_PUBLIC_CONTRACT_ADDRESS`
   - Redeploy the application

### Step 3: Verify Functionality

1. **Test Features**
   - Wallet connection
   - Chat room creation
   - Message sending
   - FHE encryption

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+)
   - Verify all dependencies installed
   - Check for TypeScript errors

2. **Environment Variables**
   - Ensure all required variables set
   - Check variable names (case-sensitive)
   - Verify contract address is correct

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID
   - Check RPC URL accessibility
   - Ensure correct chain ID

### Debug Steps

1. **Check Build Logs**
   - Go to Vercel Dashboard → Deployments
   - Click on failed deployment
   - Review build logs

2. **Local Testing**
   ```bash
   npm run build
   npm run preview
   ```

3. **Environment Check**
   - Verify all environment variables
   - Test with different RPC endpoints

## 📊 Performance Optimization

### Build Optimization

1. **Bundle Analysis**
   ```bash
   npm run build -- --analyze
   ```

2. **Code Splitting**
   - Implement lazy loading
   - Optimize bundle size

### Runtime Optimization

1. **Caching**
   - Configure Vercel caching
   - Optimize static assets

2. **CDN**
   - Use Vercel's global CDN
   - Optimize image delivery

## 🔄 Continuous Deployment

### Automatic Deployments

1. **GitHub Integration**
   - Push to main branch triggers deployment
   - Preview deployments for pull requests

2. **Branch Protection**
   - Set up branch protection rules
   - Require status checks

### Manual Deployments

1. **Redeploy**
   - Go to Vercel Dashboard
   - Click "Redeploy" on latest deployment

2. **Rollback**
   - Select previous deployment
   - Click "Promote to Production"

## 📈 Monitoring

### Analytics

1. **Vercel Analytics**
   - Enable in Project Settings
   - Monitor performance metrics

2. **Error Tracking**
   - Set up error monitoring
   - Track user interactions

### Health Checks

1. **Uptime Monitoring**
   - Set up external monitoring
   - Configure alerts

2. **Performance Monitoring**
   - Monitor Core Web Vitals
   - Track loading times

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] Smart contract deployed
- [ ] Contract address updated
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Analytics enabled
- [ ] Error monitoring set up
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] Backup strategy in place

## 📞 Support

For deployment issues:

1. **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
2. **Community Support**: [vercel.com/help](https://vercel.com/help)
3. **GitHub Issues**: Create issue in repository

---

**Deployment URL**: [Your Vercel URL will appear here after deployment]

**Status**: ✅ Ready for deployment
