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


const { 
    isAuthenticatedUser,
    isAuthorizeRole 
} = require("../middleware/auth");


router.route('/jobs').get( isAuthenticatedUser,getJobs);
router.route("/jobs/:id/:slug").get(isAuthenticatedUser,getJob);
router.route("/jobs/stats/").get( isAuthenticatedUser , getStats);
router.route('/jobs').post(isAuthenticatedUser,isAuthorizeRole("employer","admin"), createJob);

router.route('/jobs/:id/')
.put(isAuthenticatedUser, updateJob)
.delete(isAuthenticatedUser, deleteJob)







module.exports = router