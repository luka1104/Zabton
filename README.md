# Zabton
For Tokyo Web3 Hackathon

## Setup Contracts

run ```cd contracts```

run ```npm i```

run ```mv .env-example .env```

set the environment variables at .env

### Deploy Contracts

run ```npx hardhat run --network mumbai scripts/deploy.js```

run ```npx hardhat run --network mumbai scripts/deployBFT.js```

## Setup App

run ```cd zabton-app```

run ```npm i```

run ```mv .env-example .env```

set the environment variables at .env

run ```npm run dev```

Access to http://localhost:3000/mypage
