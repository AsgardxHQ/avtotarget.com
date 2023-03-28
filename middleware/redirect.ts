export default (req, res, next) => {
  if(req.url === '/') {
    redirect(res, '/uk');
  } else {
    next();
  }
}

function redirect(res, location) {
  res.writeHead(301, {
      location
  })
  res.end()
}