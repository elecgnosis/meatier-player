/**
 * @file Publication for Logs Collection.
 * @author Dan Lopez 2016
 */

Meteor.publish( 'logs', ( applicationId ) => {
  //TODO: What is Meteor check method?
  check( applicationId, String );
  return Logs.find(
    { applicationId: applicationId },
    { sort: { date: 1 } }
  );
});
