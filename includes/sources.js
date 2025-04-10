// includes/sources.js

module.exports = {
    layers: {
      bronze: "prod_vrph_data_bronze",
      silver: "prod_vrph_data_silver",
      gold: "prod_vrph_data_gold"
    },
  
    sources: {
      // Bronze Layer Sources
      bronze: [
        { name: "test_bronze", description: "Test dataset for demonstration purposes" }
      ],
  
      // Silver Layer Sources
      silver: [
        { name: "test_silver", description: "Resulting table from first staging model." }
      ],
  
      // Gold Layer Sources
      gold: [
        { name: "test_gold", description: "Resulting table from first prod model." }
      ]
    }
  };