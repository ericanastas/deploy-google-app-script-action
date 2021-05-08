







# Deploy Google App Script Action

Attempt at creating a GitHub action that will deploy a Google App script using [google/clasp](https://github.com/google/clasp)

There does not seem to be an obvious way to login to clasp with a service account

See the following issues:

- https://github.com/google/clasp/issues/707
- https://github.com/google/clasp/pull/486
- https://github.com/google/clasp/issues/524
- https://github.com/google/clasp/issues/225












# Instructions



- only trigger on master, main, or develop branch
- 
    






# Reference

`.clasp.json`

    export interface ProjectSettings {
    scriptId: string;
    rootDir?: string;
    projectId?: string;
    fileExtension?: string;
    filePushOrder?: string[];
    parentId?: string[];
    }


`.clasprc.json`
    {
    "access_token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "refresh_token": "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
    "refresh_token": "1/k4rt_hgxbeGdaRag2TSVgnXgUrWcXwerPpvlzGG1peHVfzI58EZH0P25c7ykiRYd",
    "scope": "https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/script ...",
    "token_type": "Bearer",
    "expiry_date": 0000000000000
    }




















## References

-  [Error retrieving access token: TypeError: Cannot read property 'project_id' of undefined](https://stackoverflow.com/questions/54533397/error-retrieving-access-token-typeerror-cannot-read-property-project-id-of-u)
-  [Clasp run documentation](https://github.com/google/clasp/blob/master/docs/run.md)