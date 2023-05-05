const parser = require('csv-parser');
const writer = require('csv-writer').createObjectCsvWriter;
const fs = require('fs')
const path = require('path');

const rows = [];

fs.createReadStream(path.join(__dirname, 'data', 'sdc_data', 'related.csv'))
  .pipe(parser())
  .on('data', (row) => {
    if (row.related_product_id === '0') {
      row.related_product_id = 'null'
    }
    rows.push(row);
  })
  .on('end', () => {
    const csvWriter = writer({
      path: path.join(__dirname, 'data', 'sdc_data','transformed_related.csv'),
      header: [
        {id: 'id', title: 'id'},
        {id: 'current_product_id', title: 'current_product_id'},
        {id: 'related_product_id', title: 'related_product_id'}
      ]
    });

    csvWriter.writeRecords(rows)
      .then(() => console.log('CSV Created'))
  });
