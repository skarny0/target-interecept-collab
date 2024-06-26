// Importing functions and variables from the FirebasePsych library
import { writeRealtimeDatabase,writeURLParameters,readRealtimeDatabase,
    blockRandomization,finalizeBlockRandomization,
    initializeRealtimeDatabase } from "./firebasepsych1.1.js";

//-----------------------------------------------------------------------------------------------------
//    demonstration of how to use the function writeRealtimeDatabase()
//
//    Below are some examples of writing to the database at a specific path in the tree
//    Note that if the path does not exist, firebase will just create the path (so it is fine to start with
//    an empty database. If the path and field already exists, then the provided value will simply overwrite
//    the previous value
// -------------------------------------------------------------------------------------------------------

// Define the configuration file
const firebaseConfig = {
apiKey: "AIzaSyBPrSINY1oznvrHK1-lG03PxMFor9Z1VyI",
authDomain: "myexp-576c8.firebaseapp.com",
databaseURL: "https://myexp-576c8-default-rtdb.firebaseio.com",
projectId: "myexp-576c8",
storageBucket: "myexp-576c8.appspot.com",
messagingSenderId: "519995709282",
appId: "1:519995709282:web:d23e39af62365cafaafe3b"
};

// Get the reference to the database using the configuration file
const [ db , firebaseUserId ] = await initializeRealtimeDatabase( firebaseConfig );

// Name the study we are running (any string is fine)
const studyId  = 'study1';

// Show the user id that is provided by the Firebase Psych library.
console.log( "Firebase UserId=" + firebaseUserId );

// Example 1: storing a numeric value
// The result of this is stored on the path: "[studyId]/participantData/[firebaseUserId]/trialData/trial1/ResponseTime"
let pathnow = studyId+'/participantData/'+firebaseUserId+'/trialData/trial1/responseTime';
let valuenow = 280;
writeRealtimeDatabase( db, pathnow , valuenow );
$('#message').append('Executing example 1...<br>');

// Example 2: Storing a boolean value
// The result of this is stored on the path: "[studyId]/participantData/[firebaseUserId]/trialData/trial1/IsCorrect"
pathnow = studyId+'/participantData/'+firebaseUserId+'/trialData/trial1/isCorrect';
valuenow = true;
writeRealtimeDatabase( db, pathnow , valuenow );
$('#message').append('Executing example 2...<br>');

// Example 3: Storing a string value
pathnow = studyId+'/participantData/'+firebaseUserId+'/trialData/trial1/answer';
valuenow = 'C';
writeRealtimeDatabase( db , pathnow , valuenow );
$('#message').append('Executing example 3...<br>');

/// Example 4: Storing a JavaScript object
// It is very efficient to send an entire object with key-value pairs to a realtime database as opposed to individual values
pathnow = studyId+'/participantData/'+firebaseUserId+'/trialData/trial2';
valuenow = { condition: 2, responseTime: 370, isCorrect: true, answer: 'B' };
writeRealtimeDatabase( db, pathnow , valuenow );
$('#message').append('Executing example 4...<br>');

// Example 5: ensuring "synchronicity"
// In the previous examples, JavaScript does not wait until the results are actually saved. Code execution will continue before
// the data is actually saved. In some cases, such as data that needs to be saved at the very end of an experiment, it is important
// to make sure that the code execution waits until completion of the writing operation. To accomplish this, we can simply add the 
// keyword "await" before the function
pathnow = studyId+'/participantData/'+firebaseUserId+'/trialData/trial3/responseTime';
valuenow = 280;
await writeRealtimeDatabase( db, pathnow , valuenow );
$('#message').append('Executing example 5...<br>');

// Example 6:
// Recall that in our security model the path [studyId]/studyInfo/ is accessible across all participants
// Let's test that out by writing some information about the study that can be shared with all participants
const date = new Date();
pathnow = studyId+'/studyInfo/latestAccessDate';
valuenow = date.toString();
writeRealtimeDatabase( db, pathnow , valuenow );
$('#message').append('Executing example 6...<br>');

// Example 7:
// Save URL parameters on the path: "[studyId]/participantData/[firebaseUserId]/participantInfo"
pathnow = studyId+'/participantData/'+firebaseUserId+ '/participantInfo';
writeURLParameters( db, pathnow );
$('#message').append('Writing URL parameters...<br>');