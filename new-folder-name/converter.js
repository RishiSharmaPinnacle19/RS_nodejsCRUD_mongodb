// Import the required modules
const MongoClient = require('mongodb').MongoClient;
const XLSX = require('xlsx');
const fs = require('fs');

// MongoDB connection URL
const url = 'mongodb://127.0.0.1:27017/'; // Change this to your MongoDB connection string

// Database and collection names
const dbName = 'userManagement';
const collectionName = 'users';

// Convert JSON data to Excel file
function jsonToExcel(jsonData, fileName) {
  const workBook = XLSX.utils.book_new();
  const workSheet = XLSX.utils.json_to_sheet(jsonData);

  // Append worksheet to workbook
  XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');

  // Write to Excel file
  XLSX.writeFile(workBook, fileName);
  console.log(`${fileName} has been created.`);
}

// Fetch data from MongoDB and convert it to Excel
async function exportMongoDataToExcel() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Fetch all documents from the collection
    const data = await collection.find({}).toArray();

    if (data.length > 0) {
      const fileName = 'output.xlsx';

      // Convert the MongoDB data to Excel format
      jsonToExcel(data, fileName);
    } else {
      console.log('No data found in the collection.');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

// Execute the function
exportMongoDataToExcel();
