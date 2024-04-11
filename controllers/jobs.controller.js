
const { Jobs } = require("../model/job");
const  ErrorHandler  = require("../config/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFilters = require("../config/apiFilters");

exports.getJobs = async (req, res, next) => {

    const apiFilters = new ApiFilters(Jobs.find(), req.query)
    .filters()
    .sort()
    .limitFields()
    .searchByQuery()
    .pagination();

    //const jobs = await Jobs.find({})
    const jobs = await apiFilters.query
    .select({applicantsApplied: 0})
    if(jobs) return res.status(200).json({
        success: true,
        results: jobs.length,
        data: jobs
    })


}
// get a single job by id /api/v1/jobs/id/slug
exports.getJob = catchAsyncErrors( async (req, res, next) => {

    const job = await Jobs
    .findOne({ 
        $and:[{_id: req.params.id} , {slug: req.params.slug}]})

    if(!job || job.length === 0){
        res.status(404).json({
            success: false,
            message: `There is no job with id := ${req.params.id} and slug:= && ${req.params.slug}`
        })
    }

    res.status(200).json({
        success: true,
        results: 1,
        job: job
    })

})

// Create a job
exports.createJob = catchAsyncErrors(async (req, res, next) => {

    const jobTitle = await Jobs.findOne({title: req.body.title })
    if(jobTitle)  return res.json({
        message: `Job with ${req.body.title} already exist chose a different job sorry!!`
    })
    
    const job = await Jobs.create(req.body)
    
    

    res.status(200).json({
        success: true,
        message: "New Job created",
        data: job
    })
    
}
)
//update a job
exports.updateJob = catchAsyncErrors(async (req, res, next) => {

    // check first if the job exist in our database
    //if true =>
    let job = await  Jobs.findOne({_id: req.params.id})
    if(!job){
        return next(new ErrorHandler(`The job with the id ${req.params.id} does not exist`, 404))
    }
    
    // then update the one job
    job = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    return res.status(200).json({
        success: true,
        message: "Job updated successfully",
        data: job
    })

    
})

// delete one job
exports.deleteJob = catchAsyncErrors( async (req, res, next) => {

    let job = await Jobs.findById(req.params.id);
    if(!job){
        return res.status(404).json({
            success: false,
            message: `The given job with id ${rq.params.id} does not exist `
        })
    }

    //job = await Jobs.findByIdAndDelete(req.params.id,{new: true})
    job = await Jobs.deleteOne({_id: req.params.id});

    res.status(200).json({
        success: true,
        mesage: 'Recorde deleted',
        stack: job 
    })

})

// Get stats about a single topic(JOB) /api/v1:topic
exports.getStats = catchAsyncErrors( async(req, res, next) => {

    const stats = await Jobs.aggregate([

        // {
        //     $match: { $text: { $search: "\""+req.body.topic+"\""}}
        // },
        
        {
            $group:{
                _id: "$experience",
                totalPersons: {$sum: 1},
                avgSalary: {$avg: "$salary"},
                minSalary: {$min: "$salary"},
                maSlary: {$max: "$salary"},
                total: {$sum: "$salary"}
            }
        }
    ])

    if(stats.length === 0){
        return res.status(200).json({
            success: false,
            message: "Sorry no stats found!!"
        })
    }

    res.status(200).json({
        success: true,
        message: "stats found",
        data: stats
    })
})