# (㇏(•̀ᵥᵥ•́)ノ)
# Vampire DeFi Ecosystem

## Development

* Currently under development.  
  * STAKE Token (ecosystem token) - Done.
  * BLOOD Token (ecosystem token) - Done.
  * VampireStake (staking platform) - Done.

### Install dependencies

```bash
npm install
```

### Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then, open `.env.local` and add the missing environment variables:

- `ETHERSCAN_API_KEY` - Etherscan API key (get it from [etherscan.io](https://etherscan.io/))
- `ALCHEMY_API_KEY` - Alchemy API key (get it from [alchemy.com](https://www.alchemy.com/))
- `GOERLI_PRIVATE_KEY` - Private key of goerli deployer


### Deploy

```bash
npx hardhat run scripts/deploy_staking_contract.ts --network <NETWORK>
```

### Test

```bash
npx hardhat test
```