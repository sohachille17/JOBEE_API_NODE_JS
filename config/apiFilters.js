class ApiFilters {
    constructor(query, queryStr){
        this.query = query; // executor methods
        this.queryStr = queryStr // reqParams
    }
    // creating our filter methods
    filters(){
        const queryCopy = { ...this.queryStr}

        // Romoving fields from the queryCopy
        const removeFirlds = ["sort","fields"]
        removeFirlds.forEach(el => delete queryCopy[el])
        console.log(queryCopy)


        let queryStr = JSON.stringify(queryCopy)

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,
        match => `$${match}` )

        console.log(queryStr)
        this.query = this.query.find(JSON.parse(queryStr))
        return this;
    }

    sort(){
        if(this.queryStr.sort){
            let sortBy = this.queryStr.sort.split(",").join(' ')
            console.log(sortBy)
            this.query = this.query.sort(sortBy) 
        }else{
            this.query = this.query.sort('-postingDate')
        }

        return this;
    }

    limitFields(){
        if(this.queryStr.fields){
            console.log(this.queryStr)
            const fields = this.queryStr.fields.split(",").join(' ');
            console.log(fields)
            this.query = this.query.select(fields)
        }else{

            this.query = this.query.select("-__v");
        }

        return this;
    }

    searchByQuery(){
        if(this.queryStr.q){
            const qu = this.queryStr.q.split("-").join(' ');
            this.query = this.query.find({$text: {$search: "\""+ qu +"\""}});
        }

        return this;
    }

    
}

module.exports = ApiFilters