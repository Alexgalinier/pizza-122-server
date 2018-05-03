export default httpResponse => {
  httpResponse.ok = () => {
    httpResponse.statusCode = 200;
    httpResponse.end();
  };

  httpResponse.error = (statusCode = 403, message = null) => {
    httpResponse.statusCode = statusCode;
    if (message !== null)
      httpResponse.write(JSON.stringify({ message: message }));
    httpResponse.end();
  };

  httpResponse.send = (obj, statusCode = 200) => {
    httpResponse.statusCode = statusCode;
    httpResponse.write(JSON.stringify(obj));
    httpResponse.end();
  };

  httpResponse.image = (img, maxAge = 3600) => {
    httpResponse.statusCode = 200;
    httpResponse.setHeader('Content-Type', 'image/png');
    httpResponse.setHeader('Cache-control', `max-age=${maxAge}`);
    httpResponse.end(img, 'binary');
  };

  return httpResponse;
};
