export function productComponent (product){
    return `
    <div class="card border-dark mb-3" style="max-width:18rem;">
        <img class = "card-img-top">
        <div class = "card-header"> ${"Product: " + product.name} </div>
        <div class = "card-body">
                <p class="card-text">
                    ${product.desc}
                </p>
                <p>Seller: ${product.seller}</p>
                <p>Current Highest Bid Price: ${product.highestbid} ETH </p>
                <p>Deadline: ${product.deadline}</p>
        </div>
        <div class = "card-footer">
            <a href="" class="btn">Place Bid</a>
        </div>
        </div>
    </div>
    `;
}

export function getActiveProducts(contract, callback){
    // contract.events.ProductLaunchEvent(
    //     async(_error, launchEvent) => {
    //         var product = {
    //             name: launchEvent.returnValues.name,
    //             desc: launchEvent.returnValues.description,
    //             seller: launchEvent.returnValues.seller,
    //             price: web3.utils.fromWei(returnValues.price, 'ether'),
    //             productId: returnValues.productId,

    //         }

    //     }
    //     )
    var productIds = contract.activeProductIds();
    for(i = 0; i <= productIds.length; i++){
        var currentProduct = {
            name: productIds[i].name,
            desc: productIds[i].description,
            seller: productIds[i].seller,
            highestbid: web3.utils.fromWei(productIds[i].highestBid.bidPrice, 'ether'),
            deadline: productIds[i].deadline,
        }

        callback(currentProduct);
    }
        
    }
    
