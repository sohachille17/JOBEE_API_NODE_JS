
const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");
const jobSchema = mongoose.Schema({

    title: {
        type: String,
        required: [true, "Please enter job title"],
        trim: true,
        maxLength: [100, "Please title cannot exceed 100 characters"]
    },
    slug: String,
    description: {
        type: String,
        required: [true, "Please job description is required"],
        trim: true,
        maxLength: [1000, "Max length cannot exceed 1000 characters"]
    },
    email:{
        type: String,
        validate: [validator.isEmail, "Please add a valide Email Address"]
    },
    address: {
        type: String,
        required: [true, "Please add and address"]
    },
    location: {
        type:{
           type: String,
           enum: ['Point'] 
        },
        coordinate: {
            type: [Number],
            index: '2dshere'
        },
        formattedAddress: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    company: {
        type: String,
        required: [true, "Please add a company name."]
    },
    industry: {
        type: [String],
        required: [true, "Please provide a job industry name"],
        enum: {

            values: [
                'Business',
                'Information Technology',
                'Accounting',
                'Education/Training',
                'Banking/Finance',
                'Others'
            ],
            message: "Please select on of the following fields to proceed "
        }
    },
    jobType:{
        type: String,
        required: [true, "job type is required"],
        enum: {
            values: [

                'Permanent',
                'Temporary',
                'Internship'
            ],
            message: "Please provide a job type"
        }
    },
    minEducation: {
        type: String,
        required: [true, "Minimum eduction is required "],
        enum: {
            values: [
                'Bachelors',
                'Masters',
                'PHD',
            ],
            message: "Please select one of the following category"
        }
    },
    positions: {
        type: Number,
        default: 1
    },
    experience: {
        type: String,
        required: [true, "Please experience is required"],
        enum: {
            values: [
                'No Experience',
                '1 Year',
                '2 Year',
                '3 Year',
                '4 Year',
                '5 Year'
            ],
            message: "Please select one of the following fields"

        }
    },
    salary:{
        type: Number,
        required: [true, "Please provide a salary type"]
    },
    postingDate:{
        type: Date,
        default: Date.now
    },
    lastDate:{
        type: Date,
        default: new Date().setDate( new Date().getDate() + 7)
    },
    applicantsApplied:{
        type: [Object],
        select: true

    },
    jobCreatorID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    creatorName: {
        type: String,
        trim: true,
        required: true
    }
})

jobSchema.pre('save', function(next){

    this.slug = slugify(this.title, {lower: true})
    next();
})
const Jobs = mongoose.model("Job", jobSchema);
module.exports = {Jobs};