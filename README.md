# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
Le but est de ce projet est d’avoir une application permettant donc :

    - De parier sur l’évolution du cours d’un token dans pour une date prédéfinie.
    
    - Récupérer les données du cours via un oracle.
    
    - Avoir une partie AMM permettant d’échanger le token de la plateforme contre de l’eth
       ou btc (ou autre).
       
    - Avoir l’implémentation d’un proxy permettant de faire évoluer le smart contract. A
       vous de choisir celui que vous estimez le plus adéquat avec le projet.
