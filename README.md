runtracker
==========

A modest attempt at setting up a basic API for communicating position as well as a server interface to with authentication, visualization and a communication.

To run first use npm install:
'npm install'
Populate database be navigating to /populatedb and run:
'node populatedb.js'
(mongodb must be running first, use command: 'mongod')
Run app with node:
'node app.js'
Check output by navigating to localhost:5432 or use curl:
'curl localhost:5432'

