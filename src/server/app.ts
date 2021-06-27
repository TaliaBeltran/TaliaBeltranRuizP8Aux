import express from "express";
import morgan from "morgan";
import aRoutes from '../routes'
import FileUpload from "express-fileupload";

class Application {
  app: express.Application;
  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }
  settings() {
    this.app.set("port", process.env.PORT || 8000);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`server running on port ${this.app.get("port")}`);
    });
  }
  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(FileUpload({ limits: {fileSize: 50 * 1024 * 1024}}));
  }
  routes() {
    this.app.use("/api", aRoutes);
  }
  
}

export default Application;
