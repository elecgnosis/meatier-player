Template.logs.onCreated( () => {
  Template.instance().subscribe( 'logs', '123456789' );
});

Template.logs.helpers({
  logs( type ) {
    let query = {},
        logs = {};
    if ( type !== 'live' ) {
      query.type = type;
    }
    logs = Logs.find( query );
    if ( logs ) {
      return logs;
    }
  }
});

//By default, logs will appear oldest to newest, with new messages appearing at
//the bottom. This solves the wrong problem, by scrolling to the bottom of the
//list by default. The correct solution is to reverse the order and ensure that
//new logs appear at the top of the list, not getting appended to the bottom.
//TODO: Reverse the display order of logs and ensure that new logs are inserted
//at the beginning of the list, not the end.
let setLogScroll = ( type ) => {
  let selector = '',
      logs = '';

  if ( type ) {
    selector = `.logs.${ type }`
  } else {
    selector = '.logs'
  }
  logs = document.querySelectorAll( selector );

  for ( let i = 0; i < logs.length; i += 1 ) {
    let log = logs.item( i );
    log.scrollTop = log.scrollHeight;
  }
};
