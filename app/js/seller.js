export function getAllClosedSoldProducts(contract, account, title, callback) {
    contract.events.ProductLaunchEvent({
        filter: { seller: account },
        fromBlock: 0
    }, async (_error, launchEvent) => {

        var product = {
            name: launchEvent.returnValues.name,
            description: launchEvent.returnValues.description,
            productId: launchEvent.returnValues.productId
        };

        console.log(title);
        switch (title) {

            case "closed": contract.events.ProductClosedEvent({
                filter: { seller: launchEvent.returnValues.seller },
                fromBlock: 0
            }, async (_error, _closeEvent) => {
                console.log()
                if (_closeEvent.returnValues.seller == launchEvent.returnValues.seller) {
                    product.type = "closed";
                    callback(product);
                } else {
                    callback();
                }
            });
                break;

            case "sold": contract.events.ProductSoldEvent({
                filter: { productId: launchEvent.returnValues.productId },
                fromBlock: 0
            }, async (_error, _soldEvent) => {
                if (_soldEvent.returnValues.productId == launchEvent.returnValues.productId) {
                    product.type = "sold";
                    product.buyer = _soldEvent.returnValues.buyer
                    product.price = web3.utils.fromWei(_soldEvent.returnValues.price, 'ether')
                    callback(product);

                } else {
                    callback();
                }
            });
                break;

            case "open": callback(product);
                break;

            default: callback(); break;

        }

    });


}


export function getActiveProducts(contract, account, title, callback) {
    contract.events.ProductClosedEvent({
        filter: { seller: account },
        fromBlock: 0
    }, async (_error, launchEvent) => {
        getAllProducts(contract, account, (send) =>{
            callback(send);
         });
    })

    contract.events.ProductSoldEvent({
        filter: { seller: account },
        fromBlock: 0
    }, async (_error, launchEvent) => {
        getAllProducts(contract, account, (send) =>{
            callback(send);
         });
    })


    contract.events.ProductLaunchEvent({
        filter: { seller: account },
        fromBlock: 0
    }, async (_error, event) => {
         getAllProducts(contract, account, (send) =>{
            callback(send);
         });

    }
    )



}


function  getAllProducts(contract, account,callback) {
    contract.methods.getMyProducts().call().then(result => {
        console.log(result[0].deadline);
        if (result.length > 0) {

            console.log(result.length);
            var m = `<table class="table"  data-toggle="table"
            data-height="460"
            data-pagination="true">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Deadline</th>
            <th scope="col">Website</th>
          </tr>
        </thead>
        <tbody>`;

            // $("#openContent")
            //                 .html(m);

            for (var i = 0; i < result.length; i++) {
                var curr = result[i];
                // console.log(curr);
                var row = `<tr>
         <th scope="row">${i}</th>
         <td>${curr.name} </td>
         <td>${curr.description} </td>
         <td>${curr.deadline} </td>
         <td> <a href="product.html?id=${curr.id}">click</a></td>
        </tr>`;
                // console.log(web3.utils.hexToAscii(curr.id));
                //$("#openContent").append(row);      
                m += row;
            }
            m += `</tbody></table>`;
            // console.log(m);
             callback(m);
        } else {
              callback(m);
        }
    });
}


  