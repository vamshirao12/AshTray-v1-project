const cors=require("cors");
const allowed=(process.env.CLIENT_ORIGINS||"http://localhost:5173,http://localhost:5175").split(",").map(x=>x.trim()).filter(Boolean);
module.exports=cors({origin(origin,cb){if(!origin||allowed.includes(origin))return cb(null,true);return cb(new Error(`CORS blocked origin: ${origin}`));},credentials:true});
