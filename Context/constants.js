import booToken from "./BooToken.json";
import lifeToken from "./LifeToken.json";
import singleSwapToken from "./SingleSwapToken.json";
import swapMultiHop from "./SwapMultiHop.json";
import IWETH from "./IWETH.json";
import userStorgeData from "./UserStorageData.json";

//BOOTOKEN
export const BooTokenAddress = "0xdB05A386810c809aD5a77422eb189D36c7f24402";
export const BooTokenABI = booToken.abi;

//LIFE TOken
export const LifeTokenAddress = "0xbf2ad38fd09F37f50f723E35dd84EEa1C282c5C9";
export const LifeTokenABI = lifeToken.abi;

//SINGLE SWAP TOKEN
export const SingleSwapTokenAddress =
  "0xe044814c9eD1e6442Af956a817c161192cBaE98F";
export const SingleSwapTokenABI = singleSwapToken.abi;

// SWAP MULTIHOP
export const SwapMultiHopAddress = "0xaB837301d12cDc4b97f1E910FC56C9179894d9cf";
export const SwapMultiHopABI = swapMultiHop.abi;

//IWETH
export const IWETHAddress = "0x2d13826359803522cCe7a4Cfa2c1b582303DD0B4";
export const IWETHABI = IWETH.abi;

//USER STORAGE DAta

export const userStorageDataAddrss =
  "0x4ff1f64683785E0460c24A4EF78D582C2488704f";
export const userStorageDataABI = userStorgeData.abi;
