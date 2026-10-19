# HR AI Readiness Snapshot

**Try it live:** [rbrn-xi.github.io/hr-ai-readiness-snapshot](https://rbrn-xi.github.io/hr-ai-readiness-snapshot/)

The full demo runs in your browser. It takes about 3 minutes and needs no account.

## What this is

HR teams are being pushed to adopt AI fast. Most have no simple way to know whether they are ready.

The Snapshot is a 3-minute, 12-question self-assessment. It looks at your HR operation through five lenses: Workflows, Data & Documents, Policy & Risk, People Capacity, and Tool Governance. At the end you get your readiness band, your top three risks, your next three moves, and a list of things you should not automate yet.

## Design principles

- Literacy before adoption. People should understand AI before they hand it HR work.
- Human in the loop. AI can draft and suggest. A person makes the call.
- No black box HR decisions. If you cannot explain how a decision was made, do not let a tool make it.

## How scoring works

Every question has 3 or 4 answer choices. Each choice is worth 0, 1, or 2 points. Your total out of 24 becomes a percentage, and that percentage sets your band.

- Under 35%: Exploring
- 35 to 59%: Piloting
- 60 to 79%: Scaling
- 80% or more: Leading

Your top 3 risks and next 3 moves are pulled from the lenses where you scored lowest.

## What this demo deliberately is not

This is not a product. It collects nothing. There are no accounts, no tracking, and no data sent anywhere. Nothing leaves your browser.

The demo company, Brightpath Dental Group, is fictional. It is not a real company.

## License

MIT covers the framework code only (the app shell, components, styles, and build configuration). Everything under src/content/ and all brand assets are copyright FYS Labs, all rights reserved. See src/content/CONTENT-LICENSE.txt. That includes `public/logo.png`, which is the official FixYourHR brand mark.

## Analytics

There is no in-app analytics in this demo. The only measurement is overall repo traffic plus UTM tags on outbound links.

## Run it locally

```
npm i
npm run dev
npm run build
```

## Disclaimer

Educational only. Not legal or HR advice.
