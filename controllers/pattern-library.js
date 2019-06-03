exports.getPatternLibrary = (req, res, next) => {
  try {
    res.render('pattern-library/' + req.params.template, { 
      pageTitle: req.params.template
    });
  } catch(err) {
    next();
  }
};

exports.postFormSubmission = (req, res, next) => {
  console.log(req.body)
  res.render('pattern-library/form-submission', 
  { 
    pageTitle: 'Form Submit Success', 
    alert: { 
      announcement: true,
      dismissable: true,
      icon: 'thumbs-up',
      style: 'success', 
      title: 'Success',
      messages: [ 'Thank you for submitting this form. The results of your request were:', JSON.stringify(req.body) ]
    }
  });
};
