// Token addresses
shoaibAddress= '0xFCFE742e19790Dd67a627875ef8b45F17DB1DaC6'
rayyanAddrss= '0x398E4948e373Db819606A459456176D31C3B1F91'
popUpAddress= '0xbe18A1B61ceaF59aEB6A9bC81AB4FB87D56Ba167'

// Uniswap contract address
wethAddress= '0xe044814c9eD1e6442Af956a817c161192cBaE98F'
factoryAddress= '0xaB837301d12cDc4b97f1E910FC56C9179894d9cf'
swapRouterAddress= '0x4ff1f64683785E0460c24A4EF78D582C2488704f'
nftDescriptorAddress= '0x0F527785e39B22911946feDf580d87a4E00465f0'
positionDescriptorAddress= '0x1D3EDBa836caB11C26A186873abf0fFeB8bbaE63'
positionManagerAddress= '0x9C85258d9A00C01d00ded98065ea3840dF06f09c'

const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
};

// const { waffle } = require("hardhat");
const { Contract, BigNumber } = require("ethers");
const bn = require("bignumber.js");
const Web3Modal = require("web3modal");
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

const MAINNET_URL =
  "https://mainnet.infura.io/v3/e7dae488f57c46288ba0cc26738629f3";

const provider = new ethers.providers.JsonRpcProvider(MAINNET_URL);

function encodePriceSqrt(reserve1, reserve0) {
  return BigNumber.from(
    new bn(reserve1.toString())
      .div(reserve0.toString())
      .sqrt()
      .multipliedBy(new bn(2).pow(96))
      .integerValue(3)
      .toString()
  );
}

const nonfungiblePositionManager = new Contract(
  positionManagerAddress,
  artifacts.NonfungiblePositionManager.abi,
  provider
);

const factory = new Contract(
  factoryAddress,
  artifacts.UniswapV3Factory.abi,
  provider
);

async function deployPool(token0, token1, fee, price) {
  // const [owner] = await ethers.getSigners();
  // const MAINNET_URL = "test network url";

  // const WALLET_ADDRESS = "your";
  // const WALLET_SECRET = "your";
  // const provider = new ethers.providers.JsonRpcProvider(MAINNET_URL);
  // const wallet = new ethers.Wallet(WALLET_SECRET);
  // const signer = wallet.connect(provider);
  const [owner , signer] = await ethers.getSigners();
  const create = await nonfungiblePositionManager
    .connect(signer)
    .createAndInitializePoolIfNecessary(token0, token1, fee, price, {
      gasLimit: 5000000,
    });

  console.log(create);
  const poolAddress = await factory
    .connect(signer)
    .getPool(token0, token1, fee);
  return poolAddress;
}

async function main() {
  const shoRay = await deployPool(
    popUpAddress,
    rayyanAddrss,
    3000,
    encodePriceSqrt(1, 1)
  );

  console.log("SHO_RAY=", `'${shoRay}'`);
}

/*
  npx hardhat run --network localhost scripts/deployPool.js
  */

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
