# StakingContract

## Development

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


### Deploy

```bash
npx hardhat run scripts/deploy_staking_contract.ts --network <NETWORK>
```

### Test

```bash
npx hardhat test
```