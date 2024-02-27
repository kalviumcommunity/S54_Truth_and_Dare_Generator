const joi =require("joi")

const TDvalidate=joi.object({
    type:joi.string(),
    likes:joi.number(),
    category:joi.string(),
    text:joi.string(),
    created_by:joi.string(),
})

module.exports=TDvalidate