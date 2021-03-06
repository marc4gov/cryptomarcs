let {networkConfig} = require('../helper-hardhat-config')

module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId
}) => {

  const { deploy, get, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()
  let linkTokenAddress
  let vrfCoordinatorAddress
  let additionalMessage = ""

  if (chainId == 31337) {
    linkToken = await get('LinkToken')
    VRFCoordinatorMock = await get('VRFCoordinatorMock')
    linkTokenAddress = linkToken.address
    vrfCoordinatorAddress = VRFCoordinatorMock.address
    additionalMessage = " --linkaddress " + linkTokenAddress
  } else {
    linkTokenAddress = networkConfig[chainId]['linkToken']
    vrfCoordinatorAddress = networkConfig[chainId]['vrfCoordinator']
  }

  const NFTMarket = await deploy('NFTMarket', {
    from: deployer,
    args: [],
    log: true
  });
  console.log("NFTMarket deployed to:", NFTMarket.address);


  const keyHash = networkConfig[chainId]['keyHash']
  const fee = networkConfig[chainId]['fee']

  const randomCryptoMarc = await deploy('RandomCryptoMarc', {
    from: deployer,
    args: [vrfCoordinatorAddress, linkTokenAddress, keyHash, NFTMarket.address],
    log: true
  })

  log("Run the following command to fund contract with LINK:")
  log("npx hardhat fund-link --contract " + randomCryptoMarc.address + " --network " + networkConfig[chainId]['name'] + additionalMessage)
  log("Then run RandomCryptoMarc contract with the following command")
  log("npx hardhat request-random-crypto-marc --contract " + randomCryptoMarc.address + " --network " + networkConfig[chainId]['name'])
  log("----------------------------------------------------")
}

module.exports.tags = ['all', 'vrf']
