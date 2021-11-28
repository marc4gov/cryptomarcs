const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('9c565071a31874321647', '3062a6a91001c1ace70f06fabf8a8370835448b59cb4d00dc6e172ae24ea3b96');

const basePath = process.cwd();

// pinata.testAuthentication().then((result) => {
//   //handle successful authentication here
//   console.log(result);
// }).catch((err) => {
//   //handle error here
//   console.log(err);
// });

const fs = require('fs');
const readableStreamForFile = fs.createReadStream(`${basePath}/build/images/0.png`);
const options = {
    pinataMetadata: {
        name: 'CryptoMarc',
        keyvalues: {
            customKey: '0',
            customKey2: 'ChainLink demo'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};

pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log("Error")
    console.log(err);
});

module.exports = {
    format,

  };