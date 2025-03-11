import axios from 'axios';

function compareStatusSeverity(a, b) {
  if (a.lineStatuses[0].statusSeverity < b.lineStatuses[0].statusSeverity) {
    return -1;
  }
  if (a.lineStatuses[0].statusSeverity > b.lineStatuses[0].statusSeverity) {
    return 1;
  }
  return 0;
}

function getTubeDlrOverground() {
  return axios({
    method: 'get',
    url: 'http://api.tfl.gov.uk/Line/Mode/tube,dlr,overground,tram/Status?detail=false&app_id=8268063a&app_key=14f7f5ff5d64df2e88701cef2049c804&tflTypeNames=1'
  })
  .then(response => {
    var statusResponse = response.data.sort(compareStatusSeverity);
    var status = statusResponse.map(i => {
      let item = {
        route: i.id,
        title: i.name,
        message: i.lineStatuses[0].statusSeverityDescription,
        details: ((ls) => {
          if (!ls.disruption) {
            return null;
          }
          let text = [];
          if (ls.disruption.description) {
            text.push(ls.disruption.description);
          }
          if (ls.disruption.additionalInfo) {
            text.push(ls.disruption.additionalInfo);
          }
          let details = [];
          details.push({ texts: text });
          details.push({ texts: [ '<a href="/plan-a-journey/" class="plain-button">Replan your journey</a>' ]});
          console.log(details);
          return details;
        })(i.lineStatuses[0])
      };
      return item;
    });
    const result = { 
      ref: 'tube-dlr-overground', 
      name: 'Tube, Overground, TfL Rail, DLR & Tram',
      status: status
    };
    console.log(result);
    return result;
  })
  .catch(err => {
    console.log(err);
  });
}

function getBus() {
  return { 
    ref: 'bus', 
    name: 'Buses',
    status: []
  }
}

function getTraffic() {
  return { 
    ref: 'traffic', 
    name: 'Traffic',
    status: []
  }
}

function getRiver() {
  return { 
    ref: 'river', 
    name: 'River Bus',
    status: [
    ]
  }
}

function getCableCar() {
  return { 
    ref: 'cable-car', 
    name: 'Emirates Air Line',
    status: [
    ]
  }
}

function getNationalRail() {
  return { 
    ref: 'national-rail', 
    name: 'National Rail',
    status: [
    ]
  }
}

export const getMode = async (req, res, next) => {
  let mode = req.params.mode;
  let when = 'now';

  var modeStatus;
  switch (mode) {
    case "bus": {
      modeStatus = getBus();
      break;
    }
    case "traffic": {
      modeStatus = getTraffic();
      break;
    }
    case "river": {
      modeStatus = getRiver();
      break;
    }
    case "cable-car": {
      modeStatus = getCableCar();
      break;
    }
    case "national-rail": {
      modeStatus = getNationalRail();
      break;
    }
    default: {
      modeStatus = await getTubeDlrOverground();
      break;
    }
  }

  modeStatus.when = when;
  console.log('modestatus', modeStatus);

  res.render('status/mode', 
    { 
      pageTitle: modeStatus.name, 
      fullUrl: '/status/' + mode,
      modeStatus: modeStatus,
      body: { primarys: [], cards: []},
      rhnav: []
    });
};
