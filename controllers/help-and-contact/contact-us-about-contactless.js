import { validationResult } from 'express-validator';
import { ContactUs } from '../../models/contact-us.js';
import { UserActivity } from '../../models/user-activity.js';

const config = {
  activity: 'contactus',
  view: 'help-and-contact/contact-us-about-contactless',
  route: '/help-and-contact/contact-us-about-contactless',
  pageTitle: 'Contact us about contactless',
  formName: 'contact-us-about-contactless',
  submission: 'Submitted contact us request about contactless',
  phases: [ 'intro', 'reason', 'comments', 'documents', 'summary', 'complete', 'error' ],
  variables: { reasons: [
    { title: 'Enquiry', value: 'enquiry'},
    { title: 'Complaint', value: 'complaint'},
    { title: 'Positive Feedback', value: 'feedback'}
  ]}
};

export const getContact = (req, res, next) => {
  let form = req.session.form;
  let phase = req.query.phase;

  if (!phase || !config.phases.includes(phase)) {
    phase = config.phases[0];
  }

  if (!form || form.name != config.formName) {
    form = { name: config.formName };
  }

  form.phase = phase;
  form.variables = config.variables;
  req.session.form = {...form};

  res.render(config.view, {
    pageTitle: config.pageTitle,
    form: form,
    errorMessage: null
  });
};

export const postContact = (req, res, next) => {
  let form = req.session.form;
  let phase = req.query.phase;
  let errors = validationResult(req);

  if (!phase || !config.phases.includes(phase)) {
    res.redirect(config.route);
  }

  let phaseIndex = config.phases.indexOf(phase);
  if (phaseIndex < config.phases.length - 3) {
    for (var key in req.body) {
      if (key !== undefined && key !== '_csrf') {
        req.session.form[key] = req.body[key];
        if (!errors.isEmpty() && errors.array().find(e => e.param === key)) {
          return res.status(422).render(config.view, {
            pageTitle: config.pageTitle,
            form: form,
            errorMessage: errors.array().find(e => e.param === key).msg
          })
        }
      }
    }
    return req.session.save(err => {
      let nextPhase = config.phases[phaseIndex+1];
      res.redirect(`${config.route}\?phase\=${nextPhase}`);
    });
  }

  const dateSubmitted = Date.now();

  let formData = {};
  for (var key in form) {
    if (key !== undefined && key !== 'phase' && key !== 'variables' && key !== 'name') {
      formData[key] = form[key];
    }
  }

  const contactUs = new ContactUs({
    formName: config.formName,
    dateSubmitted: dateSubmitted,
    formData: formData,
    userId: req.user._id
  });

  let userActivity = new UserActivity({
    activity: config.activity,
    referenceId: null,
    activityDate: dateSubmitted,
    description: config.submission,
    forUserId: req.user._id,
    byUserId: req.user._id
  })

  let referenceId;

  contactUs
    .save()
    .then(result => {
      referenceId = result._id;
      console.log(referenceId, result._id)
      req.session.form = null;
      return req.session.save(err => {
        res.render(config.view,
        {
          pageTitle: config.pageTitle,
          form: { phase: config.phases[config.phases.length - 2] },
          reference: referenceId
        });
        userActivity.referenceId = referenceId;
        userActivity.save();
      });
    })
    .catch(err => {
      console.log(err);
    });
};