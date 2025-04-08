// assignment/ex1-aggregation/3-query-year-age.js
import client from "../connect.js";

async function queryYearAge(year, age) {
  try {
    await client.connect();
    const db = client.db("assignmentWeek4-Aggregation");
    const collection = db.collection("aggregation");

    const yearAgePopulation = await collection
      .aggregate([
        {
          $match: {
            Country: {
              $in: [
                "AFRICA",
                "ASIA",
                "EUROPE",
                "LATIN AMERICA AND THE CARIBBEAN",
                "NORTHERN AMERICA",
                "OCEANIA",
              ],
            },
            Year: year,
            Age: age,
          },
        },
        {
          $group: {
            _id: { Country: "$Country", Year: "$Year", Age: "$Age" },
            M: { $sum: "$M" },
            F: { $sum: "$F" },
            TotalPopulation: { $sum: { $add: ["$M", "$F"] } },
          },
        },
        {
          $project: {
            Country: "$_id.Country",
            Year: "$_id.Year",
            Age: "$_id.Age",
            M: 1,
            F: 1,
            TotalPopulation: 1,
            _id: 0,
          },
        },
      ])
      .toArray();

    console.log(yearAgePopulation);
  } catch (error) {
    console.error("Error querying data:", error);
  } finally {
    await client.close();
  }
}

queryYearAge(1950, "0-4");
