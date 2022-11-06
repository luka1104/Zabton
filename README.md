# Zabton
ZABTONとは、次世代のYouTubeを目指す、お笑いのショーレースGameFi、言わば大喜利GameFi。
アプリ版で50万MAUを10年キープしている「bokete」というサービスと、「Golden」というWeb3版Wikipediaから着想を得ている。ゲームでは、誰でも決められたフォーマットからお題を作り、ボケを回答、集まったボケを全員で審査し、勝ち負けを決めて遊べる。この全てのアクションに対して荷重をかけてTokenを付与することで、特定のトピック（お題）に対してコンテンツ（回答, UGC）作成を促進し、Validation（審査）を通じて良いコンテンツを選別、キュレーションできるコンテンツメディアを作っていく。
既存のGameFiより大幅にMass Adoptionを意識し、ソーシャルログインの実装やNFT/仮想通貨を保有せずとも遊べる設計にし、直接課金や広告収入で持続的な仕組みを目指す。
細かい設計やTokenomicsまでWhitepaperにまとめたのでご確認ください。
https://zabton.gitbook.io/zabton/

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

### Setup Prisma

run ```npx prisma migrate dev``` and input the name of migration

run ```npx prisma generate client```

run ```npm run dev```

Access to http://localhost:3000/mypage

## Details 

### tech stacks: 
JS, TS, Solidity, NextJS, React, Prisma, Supabase, Vercel, Chakra UI, Hardhat,  Openzeppelin, ERC20, ERC721
### Blockchain: 
Polygon(Mumbai)
### Contracts: 
0xB431c7847c493326eC4b2a55d9c554B6EB154a24 (ERC20)
https://mumbai.polygonscan.com/address/0xB431c7847c493326eC4b2a55d9c554B6EB154a24
0xf781b3F9CE62CBDCd6a1DE525d362028C4d424D2
https://mumbai.polygonscan.com/address/0xf781b3F9CE62CBDCd6a1DE525d362028C4d424D2
###application code?: 
https://app.supabase.com/project/delnwukkhgeymbzezhoe,
https://vercel.com/luka1104/zabton

### repo: 
https://github.com/luka1104/Zabton
### How to access: 
open the link below with smartphone. otherwise the layouts will be terrible.
https://zabton.vercel.app/mypage
