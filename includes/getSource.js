const { layers, sources } = require("./sources");

// Flatten all sources into a single lookup table
const allSources = Object.entries(sources).reduce((acc, [layer, tables]) => {
  tables.forEach((table) => {
    acc[`${layer}.${table.name}`] = { layer, ...table };
  });
  return acc;
}, {});

/**
 * Dynamically generates a SQLX-compatible reference for a given source.
 * @param {string} sourceName - The name of the source in the format "layer.table".
 * @returns {string} - A Dataform-compatible SQLX reference (e.g., `dataform.source("schema", "table")`).
 */
function getSource(sourceName) {
  const sourceDef = allSources[sourceName];
  if (!sourceDef) {
    throw new Error(`Source "${sourceName}" not found.`);
  }

  const schema = layers[sourceDef.layer];
  if (!schema) {
    throw new Error(`Schema for layer "${sourceDef.layer}" not found.`);
  }

  // Return the Dataform-compatible SQLX reference
  return `dataform.source("${schema}", "${sourceDef.name}")`;
}

module.exports = { getSource };

// Example usage for your specific case:
const sqlxReference = getSource("bronze.test_bronze");
console.log(sqlxReference); // Outputs: dataform.source("prod_vrph_data_bronze", "test_bronze")