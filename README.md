# ProjectSizes

This app helps calculate the sizes of the different columns of a project, from the labels named `Size : XX` on issues.

<p align="center">
  <img src="https://user-images.githubusercontent.com/77668087/142779688-8da0b6ed-ddcb-4a0a-924e-075eee8efd46.png">
</p>

## Usage

To use the app:

- download latest version in the [release section](https://github.com/franck-boucher-ies/project-sizes/releases/)
- create a [personal access token](https://github.com/settings/tokens) with only the 'repo' scopes and name it `project-sizes`
- start the app and connect with your token, an organization id, and a project id

## Development quick start

To start the project you need to clone it, then:

```
cd project-sizes
yarn install
yarn electron:dev
```

To build it for your platform:

```
yarn electron:build
```
