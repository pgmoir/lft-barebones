const UserComment = require("../models/user-comment");

const formName = 'contactusaboutcontactless';
const formPhases = [ 'reason', 'comments', 'documents', 'summary', 'complete', 'error' ];

exports.getContactUsAboutContactless = (req, res, next) => {
  res.render('help-and-contact/contact-us-about-contactless', { 
    pageTitle: 'Something to tell us about Ccontactless?'
  });
};

exports.postContactUsAboutContactless = (req, res, next) => {
  const reason = req.body.reason;
  const comments = req.body.comments;

  const userComment = new UserComment({
    reason: reason, 
    comments: comments});

  userComment
    .save()
    .then(result => {
      res.render('help-and-contact/contact-us-about-contactless', 
      { 
        pageTitle: 'Contact Us About Contactless', 
        alert: { 
          announcement: true,
          dismissable: true,
          icon: 'thumbs-up',
          style: 'success', 
          title: 'Success',
          messages: [ 'Thank you for submitting your enquiry. We will process your request as quickly as we can, and will confirm if any action is taken or required.' ]
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getContactUsAboutContactlessRevised = (req, res, next) => {
  let form = req.session.form;
  let phase = req.query.phase;

  if (!phase || !formPhases.includes(phase)) {
    phase = formPhases[0];
  }

  if (!form || form.name != formName) {
    form = { name: formName };
  }

  form.phase = phase;
  req.session.form = {...form};

  res.render('help-and-contact/contact-us-about-contactless-revised', { 
    pageTitle: 'Contact Us About Contactless',
    form: form
  });
};

exports.postContactUsAboutContactlessRevised = (req, res, next) => {
  console.log(req.body);
  let form = req.session.form;
  let phase = req.query.phase;

  if (phase == "reason") {
    req.session.form.reason = req.body.reason;
    return req.session.save(err => {
      console.log(err);
      res.redirect('/help-and-contact/contact-us-about-contactless-revised?phase=comments');
    });
  } else if (phase == "comments") {
    req.session.form.comments = req.body.comments;
    return req.session.save(err => {
      console.log(err);
      res.redirect('/help-and-contact/contact-us-about-contactless-revised?phase=documents');
    });
  } else if (phase == "documents") {
    req.session.form.documents = 'Not sure how to handle these';
    return req.session.save(err => {
      console.log(err);
      res.redirect('/help-and-contact/contact-us-about-contactless-revised?phase=summary');
    });
  }

  res.render('help-and-contact/contact-us-about-contactless-revised', 
  { 
    pageTitle: 'Contact Us About Contactless', 
    form: form,
    alert: { 
      announcement: true,
      dismissable: true,
      icon: 'thumbs-up',
      style: 'success', 
      title: 'Success',
      messages: [ 'Thank you for submitting your enquiry. We will process your request as quickly as we can, and will confirm if any action is taken or required.', JSON.stringify(req.body) ]
    }
  });
};

exports.getAllUserComments = (req, res, next) => {
  UserComment
    .find()
    .then((userComments) => {
       res.render('help-and-contact/user-comments', { 
         pageTitle: 'User Comments', 
         userComments: userComments
        });
     })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}