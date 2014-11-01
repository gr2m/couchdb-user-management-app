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

## Required CouchDB Settings

CORS must be enabled in the CouchDB you try to connect
to, and the apps' URL must either be listed in `cors.origin`,
or it must be set to `*` (allows all origins).

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
    <td>*</td>
  </tr>
</table>

