# Deploy Google App Script Action

Attempt at creating a GitHub action that will deploy a Google App script using [google/clasp](https://github.com/google/clasp)

There does not seem to be an obvious way to login to clasp with a service account

See the following issues:

- https://github.com/google/clasp/issues/707
- https://github.com/google/clasp/pull/486
- https://github.com/google/clasp/issues/524
- https://github.com/google/clasp/issues/225



This script attempted to use Puppeteer login, but eventually failed when Google did not recognize the machine and requested the recovery email to login.  



## References

-  [Error retrieving access token: TypeError: Cannot read property 'project_id' of undefined](https://stackoverflow.com/questions/54533397/error-retrieving-access-token-typeerror-cannot-read-property-project-id-of-u)
-  [Clasp run documentation](https://github.com/google/clasp/blob/master/docs/run.md)