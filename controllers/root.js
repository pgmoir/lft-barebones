const readJson = require('../helpers/readfeed');

exports.search = (req, res, next) => {
  res.send('<h1>Searching</h1>');
};

exports.getHome = (req, res, next) => {
  res.render('index', { 
    pageTitle: 'Index'
  });
};

exports.getCms = (req, res, next) => {
  try {
    const content = readJson.read(req._parsedUrl.pathname);
    content.fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('includes/' + content.template, content);
  } catch(err) {
    next();
  }
};
