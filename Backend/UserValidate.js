const joi =require("joi")

const uservalidate=joi.object({
    name:joi.string(),
    email:joi.string(),
    password:joi.string(),
})

module.exports=uservalidate