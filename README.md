# React HomeAssistant custom panel

The repository is still at the very beginning. Stay with it and gladly collaborate ;)

## Getting started

Install and run a development server

```
npm run install
npm run start
```

Add the following entry to your `configuration.yaml` file:

```yaml
panel_custom:
  - name: react-panel
    sidebar_title: React Panel
    sidebar_icon: mdi:react
    url_path: react-panel-dev
    js_url: http://localhost:3000/static/js/bundle.js
    embed_iframe: false
```

Restart Home Assistant.

## Deploy
TODO: will follow :P

Add the following entry to your `configuration.yaml` file:
```yaml
panel_custom:
  - name: react-panel
    sidebar_title: My Production React Panel
    sidebar_icon: mdi:react
    url_path: react-panel-prod
    js_url: /local/react-panel/static/js/bundle.js
    embed_iframe: false
```