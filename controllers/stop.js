function getSouthWoodford() {

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return { 
    ref: '940GZZLUSWF', 
    name: 'South Woodford Underground Station', 
    id: 1000217,
    geo: '51.591907%2C0.027338',
    mode: 'Tube', 
    zone: 'Zone 4',
    info: {
      alert: 'warning',
      key: '940GZZLUSWFinfo',
      title: 'South Woodford Underground Station has reported access issues',
      messages: [
        'South Woodford: From Saturday 13 October until Summer 2019 the entrance to the westbound platform at South Woodford will be closed while a new entrance with step-free access is constructed. Please use the subway on George Lane to reach the main entrance/eastbound platform and then use the footbridge between the eastbound and westbound platform.'
      ]
    },
    status: [
      { route: 'central', title: 'Central', message: 'Good service', url: '/status/tube/#central' }
    ],
    arrivals: {
      time: time,
      outofdate: 'This departure information is out of date. Please try reloading the page.',
      platforms: [
        { name: 'Eastbound - Platform 2', services: [
          { route: 'central', destination: 'Epping', current: 'between Leytonstone and Snaresbrook', departs: '3 mins' },
          { route: 'central', destination: 'Loughton', current: 'at Stratford', departs: '10 mins' },
          { route: 'central', destination: 'Grange Hill via Woodford', current: 'between Bethnal Green and Mile End', departs: '15 mins' }
        ]},
        { name: 'Wetsbound - Platform 1', services: [
          { route: 'central', destination: 'West Ruislip', current: 'between Buckhurst Hill and Woodford', departs: '7 mins' },
          { route: 'central', destination: 'West Ruislip', current: 'between Theydon Bois and Debden', departs: '15 mins' }
        ]}
      ]
    },
    departures: {
      routes: [ 
        { links: [
          { title: 'View Central timetable', url: '/timetable/tube/central', icon: 'internal' },
          { title: 'View all stops on Central line route', url: '/route/tube/central', icon: 'internal' }
        ]}
      ],
      last: {
        in: [
          { route: 'central', destination: 'Ealing Broadway', departs: '20:20' },
          { route: 'central', destination: 'West Ruislip', departs: '23:15' }
        ],
        out: [
          { route: 'central', destination: 'Epping', departs: '00:05' }
        ]
      },
      first: {
        in: [
          { route: 'central', destination: 'West Ruislip', departs: '05:27' },
          { route: 'central', destination: 'Ealing Broadway', departs: '05:57' }
        ],
        out: [
          { route: 'central', destination: 'Epping', departs: '05:40' },
          { route: 'central', destination: 'Grange Hill', departs: '17:39' }
        ]
      }
    },
    accessibility: {
      include: true
    },
    facilities: {
      features: [
        { title: 'Boarding Ramps', icon: 'boardingramp' },
        { title: 'Bridge', icon: 'bridge' },
        { title: 'Car Park', icon: 'carpark' },
        { title: 'Gates', icon: 'gate' },
        { title: 'Payphones', icon: 'phone' },
        { title: 'Ticket Halls', icon: 'tickethall' },
        { title: 'Toilets', icon: 'men-women' },
        { title: 'Waiting Room', icon: 'waitingroom' },
        { title: 'WiFi', icon: 'wifi' }
      ],
      address: [
        'South Woodford Station',
        'London Underground Ltd.',
        'George Lane',
        'London',
        'E18 1JJ'
      ]
    },
    transport: {
      options: [
        { title: 'Buses', pre: 'bus-shddisc', icon: 'internal', url: '' },
        { title: 'Taxi Ranks', pre: 'taxi-shddisc', icon: 'plus', ajax: '', template: '' },
        { title: 'Car Parks', pre: 'carpark-shddisc', icon: 'plus', ajax: '', template: '' }
      ]
    },
    crowding: {
      include: true,
      times: [
        { period: '05:00 - 05:15', crowd: 5 },
        { period: '05:15 - 05:30', crowd: 10 },
        { period: '05:30 - 05:45', crowd: 15 },
        { period: '05:45 - 06:00', crowd: 20 },
        { period: '06:00 - 06:15', crowd: 25 },
        { period: '06:15 - 06:30', crowd: 30 }
      ]
    }
  }

};

function getMileEnd() {

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return { 
    ref: '940GZZLUMED', 
    name: 'Mile End Underground Station', 
    id: 1000217,
    geo: '51.525122%2C-0.03364',
    mode: 'Tube', 
    zone: 'Zone 2',
    status: [
      { route: 'district', title: 'District', message: 'Part suspended', url: '/status/tube/#district' },
      { route: 'hammersmith-city', title: 'Hammersmith &amp; City', message: 'Part closure|Minor delays', url: '/status/tube/#hammersmith-city' }
    ],
    arrivals: {
      time: time
    },
    departures: {
      routes: [ 
        { links: [
          { title: 'View District timetable', url: '/timetable/tube/district', icon: 'internal' },
          { title: 'View all stops on District line route', url: '/route/tube/district', icon: 'internal' }
        ]},
        { links: [
          { title: 'View Hammersmith & City timetable', url: '/timetable/tube/hammersmith-city', icon: 'internal' },
          { title: 'View all stops on Hammersmith & City line route', url: '/route/tube/hammersmith-city', icon: 'internal' }
        ]}
      ],
      last: {
        in: [
          { route: 'district', destination: 'Wimbledon', departs: '23:07' },
          { route: 'district', destination: 'Richmond', departs: '00:12' },
          { route: 'district', destination: 'Ealing Broadway', departs: '00:17' },
          { route: 'hammersmith-city', destination: 'Hammersmith (H&C Line)', departs: '00:23' }
        ],
        out: [
          { route: 'district', destination: 'Upminster', departs: '01:00' },
          { route: 'hammersmith-city', destination: 'Barking', departs: '01:01' }
        ]
      },
      first: {
        in: [
          { route: 'district', destination: 'Aldgate East', departs: '06:11' },
          { route: 'district', destination: 'Richmond', departs: '06:44' },
          { route: 'district', destination: 'Wimbledon', departs: '07:07' },
          { route: 'district', destination: 'Ealing Broadway', departs: '07:22' },
          { route: 'hammersmith-city', destination: 'Hammersmith (H&C Line)', departs: '05:16' }
        ],
        out: [
          { route: 'district', destination: 'Upminster', departs: '06:33' },
          { route: 'hammersmith-city', destination: 'Barking', departs: '05:39' }
        ]
      }
    },
    accessibility: {
      include: true
    },
    facilities: {
      features: [
        { title: 'Gates', icon: 'gate' },
        { title: 'Payphones', icon: 'phone' },
        { title: 'Ticket Halls', icon: 'tickethall' },
        { title: 'Waiting Room', icon: 'waitingroom' },
        { title: 'WiFi', icon: 'wifi' }
      ],
      address: [
        'Mile End Station',
        'London Underground Ltd.',
        'Mile End Rd',
        'London',
        'E3 4DH'
      ]
    },
    transport: {
      options: [
        { title: 'Buses', pre: 'bus-shddisc', icon: 'internal', url: '' },
        { title: 'Santander Cycles', pre: 'santandercycle-shddisc', icon: 'plus', ajax: '', template: '' },
        { title: 'Taxi Ranks', pre: 'taxi-shddisc', icon: 'plus', ajax: '', template: '' }
      ]
    },
    crowding: {
      include: true,
      times: [
        { period: '05:00 - 05:15', crowd: 5 },
        { period: '05:15 - 05:30', crowd: 10 },
        { period: '05:30 - 05:45', crowd: 15 },
        { period: '05:45 - 06:00', crowd: 20 },
        { period: '06:00 - 06:15', crowd: 25 },
        { period: '06:15 - 06:30', crowd: 30 }
      ]
    }
  }

};

export const getStop = (req, res, next) => {
  let naptan = req.params.stopref;
  
  var stoppoint;
  if (naptan == "940GZZLUSWF") {
    stoppoint = getSouthWoodford();
  } else {
    stoppoint = getMileEnd();
  }

  res.render('stop/point', 
    { 
      pageTitle: stoppoint.name, 
      fullUrl: '/stop/' + stoppoint.naptan,
      stoppoint: stoppoint,
      body: { primarys: [], cards: []},
      rhnav: []
    });
};
