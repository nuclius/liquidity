# TDex-API
 0x protocol liquidity and swap API for TDex


 This API calls the 0x Protocol smart contract. It is pretty straight foreward.

 The /quote endpoint takes in a token's ticker (I.E. WETH or USDC) and a buy amount expressed in gwei

 for reference gwei amount = token amount with 18 zeros (IE 1WETH = 1000000000000000000 gwei)

 the /swap endpoint is where all the magic happens. It takes in the same quote that was sent from the quote endpoint. It then pulls the token's abi.json and flags it for approval. This SHOULD only happen once but furter tested is needed to confirm this. Once approved the endpoint will send the transaction automatically unless the expiration window has ellapsed. In which case it will need to be called again. 


 For the Front-End application:

 - you can render the price or guarenteed price with res.price and res.guarenteedPrice respectively
 
 - you can see the buy and sell amounts with res.buyAmount and res.sellAmount
 these are expressed as wei values

 - you can set the gas price manually with res.gasPrice 
 the gas price is also expressed as a wei value

 - you can view the liquidity provider by mapping through the sources list and pulling the name from any fields with a proportion > 0

 - you can define a custom fee recipient that will recieve trading fees with res.orders[0].feeRecipientAddress