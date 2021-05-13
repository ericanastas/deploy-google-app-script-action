# Deploy Google App Script Action

[![Deploy Script](https://github.com/SOM-Firmwide/deploy-google-app-script-action/actions/workflows/deploy-script.yml/badge.svg)](https://github.com/SOM-Firmwide/deploy-google-app-script-action/actions/workflows/deploy-script.yml)

This repository is an example of how to setup an automatic [CI/CD](https://en.wikipedia.org/wiki/CI/CD) process for [Google Apps Script](https://developers.google.com/apps-script) using [GitHub Actions](https://docs.github.com/en/actions).
## Setup

### Setup GitHub Repository

1. Install [clasp](https://developers.google.com/apps-script/guides/clasp) on your development machine if not already installed.
2. Create a local copy of a Google Apps Script project. You may use `clasp create` to create a new project or `clasp clone` to download an existing project.
3. Initialize the project folder as a new Git repo: `git init`. 
   1. The `.clasp.json` file MUST be in the root of the repository, 
   2. `.clasp.json` may point to source files in a sub folder throgh a `rootDir` property. 
4. Copy `.github/workflows/deploy-script.yml` from this repository to the same relative path.
5. Stage files: `git add .`
6. Commit files: `git commit -m "first commit"`
7. Create a `develop` branch: `git branch -M develop`
8. Create a `main` branch: `git branch -M main`
9.  Create a new GitHub repository, and add it as a remote: `git remote add origin git@github.com:account/repo.git`
10. Push the `main` branch to GitHub: `git push -u origin main`
11. Push the `develop` branch to GitHub: `git push -u origin develop`

At this point the workflow will be triggered but will fail because it is not configured.
### Set Repository Secrets

[Github encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) are used to configure the workflow. 
#### `CLASPRC_JSON`

The `clasp` command line tool uses a `.clasprc.json` file to store the current login information.

1. Login to clasp as the user that should run the workflow: `clasp login` 
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
   1. Create a new deployment with `clasp deploy` or on https://scripts.google.com.
   2. FInd the deploymen id with `clasp deployments` or checking the projet settings on https://scripts.google.com.
2. Add the desired deployment id to a secret naned `DEPLOYMENT_ID`
## Usage

- Pushing to either the `main` or `develop` branches on github will automatically trigger the workflow to push the code `https://scripts.google.com`
- In addition, pushing to `main` will also deploy the scrip to the deployment specified by the `DEPLOYMENT_ID` secret.

## Related Issues

- [Provide instructions for deploying via CI #707](https://github.com/google/clasp/issues/707)
- [Handle rc files prefering local over global to make clasp more CI friendly #486](https://github.com/google/clasp/pull/486)
- [Integration with CI pipeline and Jenkins #524](https://github.com/google/clasp/issues/524)
- [How to use a service account for CI deployments #225](https://github.com/google/clasp/issues/225)

## Reference

- [Advanced Clasp Docs](https://github.com/google/clasp/tree/master/docs)
  
- `.clasp.json` File Format

    export interface ProjectSettings {
    scriptId: string;
    rootDir?: string;
    projectId?: string;
    fileExtension?: string;
    filePushOrder?: string[];
    parentId?: string[];
    }


- `.clasprc.json` File Format
    {
    "access_token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "refresh_token": "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
    "refresh_token": "1/k4rt_hgxbeGdaRag2TSVgnXgUrWcXwerPpvlzGG1peHVfzI58EZH0P25c7ykiRYd",
    "scope": "https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/script ...",
    "token_type": "Bearer",
    "expiry_date": 0000000000000
    }


















