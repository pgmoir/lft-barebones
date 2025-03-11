export const getPlanAJourney = (req, res, next) => {
  res.render('plan-a-journey/index', { 
    "pageTitle": "Plan a journey",
    "keywords": "TfL,stations stops piers",
    "description": "Tube stations, Overground stations, Bus and Tram stops and piers in London",
    "breadcrumbs": null,
    "title": {
      "hero": true,
      "title": "Plan a journey",
      "background": "https://tfl.gov.uk/cdn/static/cms/images/promos/offpeak-spring-jp.jpg"
    }
  });
};
