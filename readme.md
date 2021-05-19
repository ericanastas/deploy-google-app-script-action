# Deploy Google App Script Action

[![Deploy Script](https://github.com/SOM-Firmwide/deploy-google-app-script-action/actions/workflows/deploy-script.yml/badge.svg)](https://github.com/SOM-Firmwide/deploy-google-app-script-action/actions/workflows/deploy-script.yml)

This repository is an example of how to setup an automatic [CI/CD](https://en.wikipedia.org/wiki/CI/CD) process for [Google Apps Script](https://developers.google.com/apps-script) using [GitHub Actions](https://docs.github.com/en/actions).
## Setup

### Setup Project Files

1. Install [clasp](https://developers.google.com/apps-script/guides/clasp) on your development machine if not already installed.
2. Create a local copy of a Google Apps Script project. You may use `clasp create` to create a new project or `clasp clone` to download an existing project. This will create a `.clasp.json` file.
3. Initialize the project folder as a new Git repo: `git init`. 
   1. The `.clasp.json` file created in the prior step MUST be in the root of the Git repository, 
   2. `.clasp.json` may point to source files in a sub folder throgh a `rootDir` property. 
4. Copy `.github/workflows/deploy-script.yml` from this repository to the same relative path.


#### `.clasp.json` File Format Reference

    {
        "scriptId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";        
        "rootDir": "src",
        "projectId": "project-id-0000000000000000000",
        "fileExtension": "js",
        "filePushOrder": ["src/File1.js", "src/File1.js", "src/File1.js"],
        "parentId": "XXXXXXXXXXXXXXXXXXXXXX"
    }


### Setup Git Repository

1. Stage files: `git add .`
2. Commit files: `git commit -m "first commit"`
3. Create a `develop` branch: `git branch -M develop`
4. Create a `main` branch: `git branch -M main`
5.  Create a new GitHub repository, and add it as a remote: `git remote add origin git@github.com:account/repo.git`
6.  Push the `main` branch to GitHub: `git push -u origin main`
7. Push the `develop` branch to GitHub: `git push -u origin develop`

At this point the workflow will be triggered, but will fail because it is not configured completely.

### Set Repository Secrets

[Github encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) are used to configure the workflow and can be set from the repository settings page on GitHub.
#### `CLASPRC_JSON`

The `clasp` command line tool uses a `.clasprc.json` file to store the current login information. The contents of this file need to be added to a `CLASPRC_JSON` secret to allow the workflow to update and deploy scripts.

1. Login to clasp as the user that should run the workflow: 
   1. Run `clasp login` 
   2. A web browser will open asking you to authenticate clasp. Accept this from the account you want the workflow to use.
2. Open the `.clasprc.json` file that is created in the home directory (`C:\Users\{username}` on windows, and `~/.clasprc.json` on Linux)
3. Copy the contents of `.clasprc.json` into a new secret named `CLASPRC_JSON`

#### `REPO_ACCESS_TOKEN`
A GitHub personal access token must be provided to the workfow to allow it to update the `CLASPRC_JSON` secret configured about when tokens expire and refresh.

1. Create a new [GitHubpersonal access token](https://github.com/settings/tokens/new) with `repo` scope.
2. Copy the token into a new secret named `REPO_ACCESS_TOKEN`

#### `SCRIPT_ID` [OPTIONAL]

The clasp command line tool identifies the Google Apps Script project to push and deploy too using the `scriptId` property in `.clasp.json`. You may leave this value hard coded in `.clasp.json` or you may have this set dynamically. To specify the target script dynamically add a `SCRIPT_ID` secret to the repository. This will cause the workflow to override whatever literal scriptId value is in `.clasp.json`

#### `DEPLOYMENT_ID` [OPTIONAL]

The workflow can automatically deploy the script when the `main` branch is pushed to github.

1. Determine the ID of the deployment you want
   1. Create a new deployment by running `clasp deploy` or on https://scripts.google.com.
   2. Find the deploymen id by running `clasp deployments` or checking the projet settings on https://scripts.google.com.
2. Add the desired deployment id to a secret naned `DEPLOYMENT_ID`
## Usage

- Pushing to either the `main` or `develop` branches on github will automatically trigger the workflow to push the code to the `HEAD` deployment on https://scripts.google.com`
- If the `DEPLOYMENT_ID` secret has been setup pushing to `main` will also deploy the script to the specified deployment.

## Updating `.clasprc.json`

The `.clasprc.json` file that stores the authentication information contains a `access_token` which expires at the specified `expiry_date` and a `refresh_token` that can be used to request a new `access_token`. These tokens will change over time, but the workflow should update the `CLASPRC_JSON` repository secret.

However, there are [conditions where the refresh token may also expire](https://developers.google.com/identity/protocols/oauth2#expiration). So in addition to the push triggers the workflow is also configured to automatically attempt to login to clasp once a week which will confirm the authentication is still working and potentially refresh and save new tokens.

### `.clasprc.json` File Format Reference

    {
        "access_token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "refresh_token": "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
        "scope": "https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/script ...",
        "token_type": "Bearer",
        "expiry_date": 0000000000000
    }

## GCP Service Accounts

The whole system described here copying the credentials out of `.clasprc.json` and using a scheduled trigger to automatically update the tokens on a regular basis is a hack. 

The "correct" way to setup a server to server connection like is through a GCP service account. It is possible to login clasp using a key file for a service account. However, the [Apps Scripts API](https://developers.google.com/apps-script/api/concepts) does not work with service accounts.

- [Execution API - cant use service account](https://issuetracker.google.com/issues/36763096)
- [Can the Google Apps Script Execution API be called by a service account?](https://stackoverflow.com/questions/33306299/can-the-google-apps-script-execution-api-be-called-by-a-service-account)
  
## Related Issues

- [Provide instructions for deploying via CI #707](https://github.com/google/clasp/issues/707)
- [Handle rc files prefering local over global to make clasp more CI friendly #486](https://github.com/google/clasp/pull/486)
- [Integration with CI pipeline and Jenkins #524](https://github.com/google/clasp/issues/524)
- [How to use a service account for CI deployments #225](https://github.com/google/clasp/issues/225)

## Reference

- [Advanced Clasp Docs](https://github.com/google/clasp/tree/master/docs)
  



    

















