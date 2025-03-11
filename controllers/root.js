import { readJson } from '../helpers/readfeed.js';

export const search = (req, res, next) => {
  res.send('<h1>Searching</h1>');
};

export const getHome = (req, res, next) => {
  res.render('index', { 
    pageTitle: 'Index'
  });
};

export const  getCms = (req, res, next) => {
  try {
    const content = readJson(req._parsedUrl.pathname);
    content.fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('includes/' + content.template, content);
  } catch(err) {
    next();
  }
};
