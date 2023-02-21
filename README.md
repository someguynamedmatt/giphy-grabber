## Giphy Grabber

First, run the development server:

```bash
npm i && npm run dev
# or
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This should "just work" by installing and running as described above. I deliberately placed the Giphy API key in the commited `.env` file, which should **never be done** (except for this instance, to lower the burden of whomever decides to run it).


### Next.js

I chose Next.js for this project because it was (in my opinion) a quick way to spin-up a server which allowed me three major advantages over a standard client-side application:

1. Keep sensitive keys hidden from the client
1. Obscure the interface to the 3rd-party API (i.e. Giphy's API)
1. Performance benefits of the page's initial load

For point #2, above, this gives a little more breathing room in the future should this hypothetical application want to switch to a different Gif provider. The client-side React, in this case, doesn't need to to concern itself with the particularities of Giphy's API, only the particularities of the custom Next API routes (e.g. `/api/gifs`). If (hypotehtically) one wanted to switch to a different provider, they would only need to switch out the API urls (in the constants file) and write a custom mapping function similar to `normalizeGiphyResponse` does here.

For point #3, it's acknowledged that this application is very straightforward and the performance benefits might be negligible, however by initially architecting it out in this way there is much more room for growth. I didn't have time to gather metrics on this current implementation v. a standard, "client side only" application, but subjectively it "feels fast".


### Styled-components

For the styling of this project, I chose to go with `styled-components` due to familiarity, but also because I personally appreciate the readability of my styled components (e.g. `<Gif />`). This is hardly a fully-sold product for me. I've anecdotally noticed the JavaScript execution for `styled-component`s tends to bog-down the network traffic on initial hydration, so I'm unsure of the weighting of the pros/cons. In all honesty, this decision was mostly made due to familiarity.

### Things I would have liked to use or done differently

- TypeScript
  - I'm so used to it and it really feels like it slows down development when I have to remember what type is what, or for its out-of-the-box ability to let me know of potential issues ahead of time (build time).

- Measure the performance of `styled-components` vs a non-JS styling library (e.g. vanilla CSS)
  - I mentioned this above, and while I'm not certain, I do know (through subjective observations) that the script execution time on the client increases due to the necessary parsing of the styled components. In this case it isn't a tremendous issue, but from what I can see, this parsing time would increase linearly with the gifs rendered to the page or components (in general) rendered.

- Masonry grid
  - Yikes. This was tough and--arguably--more of a time sink than anything else (infinite scroll coming up as a close second). It was very simple to get a top-to-bottom-left-to-right masonry grid, but I noticed that adding new gifs to the `gifs` state would intermingle the old with the new in the top-down-left-right fashion, which was disorienting. So, I spent a significant amount of time getting that working which, after it has all been said and done, feels a bit hacky to me. TL;DR: for this implementation each gif is measured via the native DOM API and "told" how many grid rows it should span based on the gifs height. This allowed for the more natural left-to-right-top-to-bottom rendering of the gifs.

- Infinite Scroll
  - Had I had more time I would have really liked to sit with this a bit longer. It feels finnicky to me, but due to time constraints I had to "be happy" with what was functioning. This is a totaly guess, but I believe the dynamic nature of the grid sizing makes it difficult (in this current implementation) to "know" when the `flag` has crossed its threshold. A refactor considering would be an injection of the flag somewhere _within_ the rendered gifs, coupled with an intersection point near, but not _at_, the bottom of the page.
