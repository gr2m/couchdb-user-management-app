CouchDB User Management App
===========================

> Web app to manage CouchDB users and database security settings

## Setup

```
git clone git@github.com:gr2m/couchdb-user-management-app.git
cd couchdb-user-management-app
npm install
bower install
grunt serve
```

## Requirements on CouchDB

CORS must be enabled in the CouchDB you try to connect
to, and the current domain bust be whitelisted.

<table>
  <thead>
    <tr>
      <th>Section</th>
      <th>Option</th>
      <th>Value</th>
    </tr>
  </thead>
  <tr>
    <td><strong>cors</strong></td>
    <td>credentials</td>
    <td>true</td>
  </tr>
  <tr>
    <td><strong>cors</strong></td>
    <td>origins</td>
    <td>http://localhost:9000, http://gr2m.github.io, https://gr2m.github.io</td>
  </tr>
</table>

