exports.notFound = (req, res, next) => {
  res.status(404).render('404', { 
    pageTitle: 'Page Not Found',
    path: '/404'
  });
};

exports.errorHasOccurred = (req, res, next) => {
  res.status(500).render('500', { 
    pageTitle: 'Page Not Found',
    path: '/500'
  });
};