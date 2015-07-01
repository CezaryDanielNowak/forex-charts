Forex-charts
---
This is scaffold software to build own charts to analyse forex data.

Installation:
====
- install `nodejs` + `npm`
- install global `gulp` by npm
- install `PostgreSQL`
- create db structure (TODO)
- modify/create config.local with valid db data
- install local dependencies `npm install`

Running
----
`npm run start`

TODO
---
Front-end:
- each chart configured as a separate widget/addon
- fibonacci analysis (fibotrader isn't really user-friendly)
- compare data week-to-week
- heatmap (pips/min)

Back-end:
- Rewrite import script to PostgreSQL


Building Plugins
====
Plugins are placed in `src/plugins`. There should be at least one
plugin file called `Widget.(js|jsx)`. This file should export ReactElement.
Plugin will be used by:
```
import YourPluginWidget from 'plugins/YourPlugin/Widget'
React.render(YourPluginWidget, $('#containerX').get(0))
```

Globals
----
You can use few globals in your plugins:
"$": jQuery,
"_": Lodash,
"vis": VisJS,
"console": browser console. It's polyfilled in browsers without console.

Scaffold
====
history entries will be saved as:
data/YYYY-MM-DD-EURUSD.nedb

