import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import fs from "fs";
import csvParser from "csv-parser";
import { resolve, dirname } from "path";  // Import 'path' module
import { fileURLToPath } from "url"; // Import 'fileURLToPath'

dotenv.config();

// Initialize MongoDB client
const client = new MongoClient(process.env.MONGODB_URL, {
  serverApi: ServerApiVersion.v1,  // Ensure correct version for the server API
});

const importCSV = async () => {
  try {
    await client.connect();  // Connect to MongoDB
    const db = client.db("assignmentWeek4-Aggregation");
    const collection = db.collection("aggregation");

    const results = [];
    // Get the current directory path for the CSV file
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = resolve(__dirname, "population_pyramid_1950-2022.csv");  // Absolute path resolution

    console.log("CSV File Path:", filePath);  // Log the file path for debugging

    fs.createReadStream(filePath)  // Read the CSV file
      .pipe(csvParser())  // Parse the CSV
      .on("data", (data) => {
        // Push parsed data into results array
        results.push({
          Country: data.Country,
          Year: parseInt(data.Year, 10),
          Age: data.Age,
          M: parseInt(data.M, 10),
          F: parseInt(data.F, 10),
        });
      })
      .on("end", async () => {
        try {
          // Insert data into MongoDB
          await collection.insertMany(results);
          console.log("Data successfully loaded!");
        } catch (error) {
          console.error("Error inserting data:", error);
        } finally {
          await client.close();  // Close the MongoDB connection
        }
      });
  } catch (error) {
    console.error("Import error:", error);
    await client.close();  // Ensure MongoDB connection is closed in case of error
  }
};

// Run the import function
importCSV();
