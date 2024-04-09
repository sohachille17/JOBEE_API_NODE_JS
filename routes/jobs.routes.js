const express = require("express");
const router = express.Router();

// importing jobs controllers
const {
    getJobs,
    createJob,
    updateJob,
    deleteJob,
    getJob,
    getStats
  
} = require("../controllers/jobs.controller");


router.route('/jobs').get(getJobs);
router.route("/jobs/:id/:slug").get(getJob);
router.route("/jobs/stats/").get(getStats);
router.route('/jobs').post(createJob);

router.route('/jobs/:id/')
.put(updateJob)
.delete(deleteJob)







module.exports = router