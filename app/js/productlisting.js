export function productComponent (product){
    return `
    
    
    <div id = "component" class="card border-dark mb-3" style="max-width:18rem">
        <img class = "card-img-top">
        <div class = "card-header"> ${"Product: " + product.name} </div>
        <div class = "card-body">
                <p class="card-text">
                    ${"Description: " + product.desc}
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

export async function getActiveProducts(contract, callback){
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
    var productIds = await contract.methods.getProductIds().call();
    console.log(productIds);
    var i;
    for(i = 0; i <= productIds.length; i++){

        var product = await contract.methods.getProductDetailsById(productIds[i]).call();
        console.log(product);
        var currentProduct = {
            name: product.name,
            desc: product.description,
            seller: product.seller,
            highestbid: web3.utils.fromWei(product.highestBid.bidPrice, 'ether'),
            deadline: product.deadline,
        }

        callback(currentProduct);
    }
        
    }
    
