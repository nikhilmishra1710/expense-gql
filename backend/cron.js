import cron from "cron";
import https from "https";

const URL = "http://localhost:4000/";

const job = new cron.CronJob("*/1 * * * *", function () {
    console.log("Job triggered")
	https
        .get(URL, (res) => {
            if (res.statusCode === 200) {
                console.log("GET request sent successfully");
            } else {
                console.log("GET request failed", res.statusCode);
            }
        })
        .on("error", (e) => {
            console.error("Error while sending request", e);
        });
});

export default job;