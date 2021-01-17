export function getAllClosedSoldProducts(contract, account, title, callback) {
  contract.events.ProductLaunchEvent(
    {
      filter: { seller: account },
      fromBlock: 0,
    },
    async (_error, launchEvent) => {
      var product = {
        name: launchEvent.returnValues.name,
        description: launchEvent.returnValues.description,
        productId: launchEvent.returnValues.productId,
        deadline: launchEvent.returnValues.deadline,
      };

      if (title === "closed") {
        console.log(product);
      }
      switch (title) {
        case "closed":
          contract.events.ProductClosedEvent(
            {
              filter: {
                productId:
                  "0xb6f4600b5a0685ebf9dbac69f6d7ce1377dbf2c332717023f40f94cc7982f697",
              },
              fromBlock: 0,
            },
            async (_error, _closeEvent) => {
              if (
                _closeEvent.returnValues.productId ===
                launchEvent.returnValues.productId
              ) {
                product.type = "closed";
                // console.log(_closeEvent)

                callback(product);
              } else {
                callback();
              }
            }
          );
          break;

        case "sold":
          contract.events.ProductSoldEvent(
            {
              filter: { productId: launchEvent.returnValues.productId },
              fromBlock: 0,
            },
            async (_error, _soldEvent) => {
              if (
                _soldEvent.returnValues.productId ===
                launchEvent.returnValues.productId
              ) {
                product.type = "sold";
                product.buyer = _soldEvent.returnValues.buyer;
                product.price = web3.utils.fromWei(
                  _soldEvent.returnValues.price,
                  "ether"
                );
                callback(product);
              } else {
                callback();
              }
            }
          );
          break;

        default:
          callback();
          break;
      }
    }
  );
}

export function getActiveProducts(contract, account, title, callback) {
  contract.events.ProductClosedEvent(
    {
      filter: { seller: account },
      fromBlock: 0,
    },
    async (_error, launchEvent) => {
      console.log(launchEvent);
      getAllProducts(contract, account, (send) => {
        if (send.html !== undefined && send.id !== undefined) {
          callback(send);
        }
      });
    }
  );

  contract.events.ProductSoldEvent(
    {
      filter: { seller: account },
      fromBlock: 0,
    },
    async (_error, launchEvent) => {
      getAllProducts(contract, account, (send) => {
        if (send.html !== undefined && send.id !== undefined) {
          callback(send);
        }
      });
    }
  );

  contract.events.ProductLaunchEvent(
    {
      filter: { seller: account },
      fromBlock: 0,
    },
    async (_error, event) => {
      getAllProducts(contract, account, (send) => {
        if (send.html !== undefined && send.id !== undefined) {
          callback(send);
        }
      });
    }
  );
}

function getAllProducts(contract, account, callback) {
  contract.methods
    .getMyProducts()
    .call({ from: account })
    .then((result) => {
      console.log(result);
      if (result.length > 0) {
        console.log(result.length);
        var m = `<table class="table table-light"  data-toggle="table"
            data-height="460"
            data-pagination="true">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Deadline</th>
            <th scope="col">ProductId</th>
            <th scope="col">Website</th>
            <th scope="col">Sell</th>
            <th scope="col">Close</th>


          </tr>
        </thead>
        <tbody>`;

        var ids = [];
        for (var i = 0; i < result.length; i++) {
          var curr = result[i];
          var deadline = new Date(curr.deadline * 1000);
          var row = `<tr id="${curr.id}">
          <td>${i + 1}</td>
          <td>${curr.name} </td>
          <td>${curr.description} </td>
          <td>${deadline} </td>
          <td>${curr.id} </td>
         <td> <a href="product.html?id=${curr.id}">Website</a></td>
          <td><button type="button" class="btn btn-success" id="sell-${curr.id}">Sell</button></td>
          <td><button type="button" class="btn btn-danger" id="close-${curr.id}">Close</button></td>

         </tr>`;

          console.log(ids.push(curr.id));
          m += row;
        }
        m += `</tbody></table>`;
        // console.log(m);
        console.log(ids);
        callback({ html: m, id: ids });
      } else {
        console.log(result.length);
        callback(undefined);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}


