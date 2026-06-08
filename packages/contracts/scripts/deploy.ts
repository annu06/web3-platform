import { ethers, network, run } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`\nDeploying to ${network.name} with: ${deployer.address}`);
  console.log(`Balance: ${ethers.formatEther(await ethers.provider.getBalance(deployer.address))} ETH\n`);

  // 1. Deploy PlatformToken
  const Token = await ethers.getContractFactory("PlatformToken");
  const token = await Token.deploy(deployer.address);
  await token.waitForDeployment();
  console.log(`✅ PlatformToken:    ${await token.getAddress()}`);

  // 2. Deploy TimeLock (2-day delay, governor will be proposer)
  const minDelay  = 2 * 24 * 60 * 60; // 2 days
  const TimeLock  = await ethers.getContractFactory("TimeLock");
  const timelock  = await TimeLock.deploy(
    minDelay,
    [],              // proposers — will be granted to governor
    [ethers.ZeroAddress], // executors — anyone
    deployer.address
  );
  await timelock.waitForDeployment();
  console.log(`✅ TimeLock:         ${await timelock.getAddress()}`);

  // 3. Deploy Governor
  const Governor = await ethers.getContractFactory("GovernorContract");
  const governor = await Governor.deploy(
    await token.getAddress(),
    await timelock.getAddress()
  );
  await governor.waitForDeployment();
  console.log(`✅ GovernorContract: ${await governor.getAddress()}`);

  // 4. Configure TimeLock roles
  const PROPOSER_ROLE = await timelock.PROPOSER_ROLE();
  const EXECUTOR_ROLE = await timelock.EXECUTOR_ROLE();
  const ADMIN_ROLE    = await timelock.DEFAULT_ADMIN_ROLE();

  await (await timelock.grantRole(PROPOSER_ROLE, await governor.getAddress())).wait();
  await (await timelock.revokeRole(ADMIN_ROLE, deployer.address)).wait(); // timelocked from now
  console.log(`✅ TimeLock roles configured`);

  // 5. Deploy NFT
  const NFT = await ethers.getContractFactory("PlatformNFT");
  const nft = await NFT.deploy(
    deployer.address,
    ethers.parseEther("0.05"), // 0.05 ETH mint price
    10_000,                     // max supply
    500                         // 5% default royalty
  );
  await nft.waitForDeployment();
  console.log(`✅ PlatformNFT:      ${await nft.getAddress()}`);

  // 6. Deploy StakingVault
  const Vault = await ethers.getContractFactory("StakingVault");
  const vault = await Vault.deploy(
    await token.getAddress(),
    ethers.parseEther("0.1"),   // 0.1 PLT per block reward
    (await ethers.provider.getBlockNumber()) + 100,
    deployer.address
  );
  await vault.waitForDeployment();
  console.log(`✅ StakingVault:     ${await vault.getAddress()}`);

  // 7. Deploy MultiSig with deployer as initial owner (add real signers post-deploy)
  const MultiSig = await ethers.getContractFactory("MultiSigWallet");
  const multisig = await MultiSig.deploy([deployer.address, deployer.address], 1);
  await multisig.waitForDeployment();
  console.log(`✅ MultiSigWallet:   ${await multisig.getAddress()}`);

  // 8. Etherscan verification (skip on local)
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("\nVerifying on Etherscan...");
    await new Promise(r => setTimeout(r, 20000)); // wait for propagation

    await verify(await token.getAddress(),   [deployer.address]);
    await verify(await timelock.getAddress(), [minDelay, [], [ethers.ZeroAddress], deployer.address]);
    await verify(await governor.getAddress(), [await token.getAddress(), await timelock.getAddress()]);
    await verify(await nft.getAddress(),     [deployer.address, ethers.parseEther("0.05"), 10_000, 500]);
    await verify(await vault.getAddress(),   [await token.getAddress(), ethers.parseEther("0.1"), 0, deployer.address]);
  }

  console.log("\n📋 Deployment Summary:");
  console.log({
    PlatformToken:    await token.getAddress(),
    TimeLock:         await timelock.getAddress(),
    GovernorContract: await governor.getAddress(),
    PlatformNFT:      await nft.getAddress(),
    StakingVault:     await vault.getAddress(),
    MultiSigWallet:   await multisig.getAddress(),
  });
}

async function verify(address: string, args: unknown[]) {
  try {
    await run("verify:verify", { address, constructorArguments: args });
    console.log(`  ✓ Verified: ${address}`);
  } catch (e: any) {
    console.log(`  ✗ Verification failed: ${e.message}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
