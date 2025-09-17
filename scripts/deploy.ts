import { ethers } from "hardhat";

async function main() {
  console.log("Deploying LockChatter contract...");

  // Get the contract factory
  const LockChatter = await ethers.getContractFactory("LockChatter");

  // Deploy the contract with a moderator address (can be the same as deployer for demo)
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  const lockChatter = await LockChatter.deploy(deployer.address); // Using deployer as moderator for demo

  await lockChatter.waitForDeployment();

  const contractAddress = await lockChatter.getAddress();
  console.log("LockChatter deployed to:", contractAddress);

  // Verify the deployment
  console.log("Verifying deployment...");
  const owner = await lockChatter.owner();
  const moderator = await lockChatter.moderator();
  
  console.log("Contract owner:", owner);
  console.log("Contract moderator:", moderator);
  console.log("Deployment successful!");

  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    owner,
    moderator,
    deployer: deployer.address,
    network: "sepolia",
    timestamp: new Date().toISOString(),
  };

  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
