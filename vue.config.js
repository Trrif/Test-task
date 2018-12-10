module.exports = {
  runtimeCompiler: true,
  baseUrl: process.env.NODE_ENV === "production" ? "/test-task/" : "/"
};
