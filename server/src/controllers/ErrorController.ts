import { Middleware } from "../types/basic_types";

const ErrorPage: Middleware = (req, res, next) => {
  res.status(404).json({ message: "page not found" });
};

export default ErrorPage;