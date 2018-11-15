/** Package imports */
const GtinController = require ('../gtinController.js');
const Product = require ('../../../models/product');

class priceWriter {
  construtor() {
  };
  
  async updatePrice(body, res) {
    try {
      const gtinController = new GtinController ();
      let jobIsDone = false;
      const jobID = await gtinController.postPriceRequest (body.gtin);
      
      let watchJob = setInterval (async function () {
        
        if (jobIsDone === true) {
          console.log ("priceAPI job finished.");
          
          let newProduct = new Product (body);
          newProduct.price = await gtinController.downloadPrice (jobID);
          clearInterval (watchJob);
          
          await newProduct.save ();
          res.status (201).send ({
            status: 'CREATED',
            data: newProduct
          });
        }
        
        else {
          console.log ("priceAPI job not finished yet... starting new request...");
          jobIsDone = await gtinController.getJobStatus (jobID);
        }
      }, 2000);
      
    } catch (e) {
      console.log (e);
    }
  }
}

module.exports = priceWriter;