/**
 * @file Server-side logger for client-side messages.
 * @author Dan Lopez 2016
 */

Logs = new Mongo.Collection( 'logs' );

if ( Meteor.isServer ) {
  //TODO: what is _ensureIndex? *an undocumented method, for starters
  Logs._ensureIndex(
    { 'date': 1 },
    { expireAfterSeconds: 86400 } //sometimes called a TTL (Time to Live) index
  );
}

Logs.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Logs.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

//TODO: What is SimpleSchema?
//TODO: What are the allowable types?
let LogsSchema = new SimpleSchema({
  'applicationId': {
    type: String,
    label: 'The ID of the application this log item belongs to.'
  },
  'date': {
    type: Date,
    label: 'The date and time when this log item occurred.'
  },
  'type': {
    type: String,
    //love this bit here.
    allowedValues: [
      'danger',
      'warning',
      'info',
      'success'
    ],
    label: 'The type of this log message.'
  },
  'title': {
    type: String,
    label: 'The title of this log message.'
  },
  'message': {
    type: String,
    label: 'The Contents of this log message.'
  },
  'payload': {
    type: Object,
    label: 'Additional content passed with the log message.',
    optional: true,
    blackbox: true
  }
});

Logs.attachSchema( LogsSchema );
