import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import os from "os";

dotenv.config();

const app = express();

const startTime = Date.now();


// ======================
// 🔐 SECURITY
// ======================

app.use(
    helmet({
        contentSecurityPolicy: false
    })
);

app.use(cors());

app.use(express.json({
    limit: "2mb"
}));


// Защита от спама запросов

app.use(
    rateLimit({

        windowMs: 60 * 1000,

        max: 120,

        message: {

            error:
            "Too many requests"

        }

    })
);


// ======================
// 📝 LOG SYSTEM
// ======================

app.use(
    morgan(
        "[PulSar] :method :url :status"
    )
);


// ======================
// 🏠 MAIN API
// ======================


app.get("/", (req,res)=>{

    res.json({

        platform:
        "PulSar-Host",

        version:
        "1.0.0",

        status:
        "ONLINE",

        message:
        "Next Generation Game Hosting"

    });

});



// ======================
// ❤️ HEALTH CHECK
// ======================


app.get(
"/api/v1/health",
(req,res)=>{


res.json({

    status:
    "healthy",

    service:
    "PulSar-Host",

    timestamp:
    new Date()

});


});



// ======================
// 📊 MONITORING
// ======================


app.get(
"/api/v1/system",
(req,res)=>{


const uptime =
Math.floor(
(Date.now()-startTime)/1000
);


res.json({

    uptime:
    `${uptime}s`,


    cpu:{
        cores:
        os.cpus().length
    },


    memory:{

        total:
        Math.round(
        os.totalmem()/1024/1024
        ),

        free:
        Math.round(
        os.freemem()/1024/1024
        )

    },


    platform:
    os.platform()

});


});



// ======================
// 🎮 GAME SERVER MANAGER
// ======================


app.get(
"/api/v1/servers",
(req,res)=>{


res.json({

    total:
    0,

    servers:
    [],

    manager:
    "PulSar Server Manager"

});


});



// ======================
// 🤖 AI SYSTEM
// ======================


app.get(
"/api/v1/ai",
(req,res)=>{


res.json({

    name:
    "PulSar AI Assistant",


    status:
    "ONLINE",


    modules:[

        "Support",

        "Error Analyzer",

        "Auto Fix",

        "Server Assistant"

    ]

});


});



// ======================
// ❌ ERROR HANDLER
// ======================


app.use(
(err,req,res,next)=>{


console.error(
"[ERROR]",
err
);


res.status(500).json({

    success:
    false,

    error:
    "Internal Server Error",

    system:
    "PulSar-Host"

});


});



// ======================
// 🚀 START SERVER
// ======================


const PORT =
process.env.PORT || 3000;


app.listen(
PORT,
()=>{


console.log(`
================================

🚀 PulSar-Host ONLINE

Port:
${PORT}

Security:
ACTIVE

Monitoring:
ACTIVE

AI:
READY

Server Manager:
READY

================================
`);

});
