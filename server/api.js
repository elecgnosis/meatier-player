/**
 * @file Not sure just yet. Exposes an endpoint for server-side logging from client?
 * @author Dan Lopez
 */
import {
  handlePreflight,
  authenticate,
  respond,
  verify,
  ingest
} from './modules/ingest-log-item';
let bodyParser = Npm.require( 'body-parser' );

Picker.middleware( bodyParser.json() );
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );

Picker.route( '/api/v1/logs/ingest', (params, request, response) =>{
  if ( request.method === 'OPTIONS' ) {
    handlePreflight( response );
  } else {
    let applicationId = request.headers[ 'x-application-id' ];

    if ( !applicationId || !authenticate( applicationId ) ) {
      respond( response, 403, '[403] Invalid Application ID.');
    }

    let body = request.body;
    body.applicationId = applicationId;

    if ( body && verify( body ) ) {
        ingest( body );
        respond( response, 200, '[200] Log item received!' );
    } else {
      respond( response, 403, '[403] Invalid log item. Check your parameters.');
    }
  }
});
