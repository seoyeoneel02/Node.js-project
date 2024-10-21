import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { healthRoute } from './routes/health.js';

dotenv.config();

const app = express()
const port = process.env.PORT;

app.use((req, res, next) => {
    res.success = (success) => {
      return res.json({ resultType: "SUCCESS", error: null, success });
    };
  
    res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
      return res.json({
        resultType: "FAIL",
        error: { errorCode, reason, data },
        success: null,
      });
    };
  
    next();
  });

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    "/docs",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup({}, {
      swaggerOptions: {
        url: "/openapi.json",
      },
    })
  );
  
  app.get("/openapi.json", async (req, res, next) => {
    // #swagger.ignore = true
    const options = {
      openapi: "3.0.0",
      disableLogs: true,
      writeOutputFile: false,
    };
    const outputFile = "/dev/null";
    const routes = ["./src/index.js"];
    const doc = {
      info: {
        title: "Node.js 개인 프로젝트",
        description: "Node.js 개인 프로젝트입니다."
      },
      host: "localhost:3000"
    };
  
    const result = await swaggerAutogen(options)(outputFile, routes, doc);
    res.json(result ? result.data : null);
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// router setting
app.use("/health", healthRoute);

app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
  
    res.status(err.statusCode || 500).error({
      errorCode: err.errorCode || "unknown",
      reason: err.reason || err.message || null,
      data: err.data || null,
    });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})