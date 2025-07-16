import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const imageschema = new Schema(
    {
        imageFile : {
            type : String,
            required : true,
        },
         disease: {
            type: String,
            required: true,
        },
        confidence: {
            type: String,
            required: true,
        },
        owner : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        title : {
            type : String,
            required : true,
        },
        description : {
            type : String,
            required : true,
        },
        
        
    }
    ,{timestamps:true})

imageschema.plugin(mongooseAggregatePaginate)
 export const Image = mongoose.model("Image",imageschema)