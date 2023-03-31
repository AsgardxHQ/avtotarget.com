const redirect = (req, res, next) => {
  if (req.url === "/") {
    redirect$1(res, "/uk");
  } else {
    next();
  }
};
function redirect$1(res, location) {
  res.writeHead(301, {
    location
  });
  res.end();
}

export { redirect as default };
//# sourceMappingURL=redirect.56e10c5c.mjs.map
