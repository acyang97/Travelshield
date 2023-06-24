## TravelShield

- Ongoing project
- Full-Stack, built using TypeScript, NextJS, MongoDB, Prisma and TailwindCSS
- TravelShield is a web app with the aim of creating a platform dedicated for community to share valuable insights from personal adventures. This idea came to my mind after I got scammed in Kazakhstan by a taxi driver at the airport as I was not able to purchase a SIM card. Sometimes, these experiences break your day, and I hope that people will have a platform to share with one another their good and bad experiences. The aim is for this website to be the go-to site for everyone to at least be more well-prepared by reading up some experiences people faced in the country they are going to!

**What I've learnt**:

- More on NextJS 13 such as server-side rendering and next-auth.
- Used Prisma over Mongoose. I like the fact that the schemas of the whole database is in 1 `schema.prisma` file.
- Learnt a bit on the usage of `zustand`, another state management tool that I enjoyed using as it reduces a lot of boiler plate code and setup required compared to `redux`.
- Tried using out `react-form-hooks`.
- Utilized `react-query` to create infinite scroll. First time creating an infinite-scroll component, and am slightly surprised that it was not too difficult to implement.
- Analyzing bundle from webpack

**Next Steps**:

- Decide whether I want to make this an actual thing for public to use or just a PET project
- Functionality wise (not in order):
  - Profile Page
  - Update Profile Info
  - Edit Post
  - Uploading of images into posts
  - Drafts
- Non-functional improvements
  - Caching
  - Resolve high bundle size specifically from the `"country-state-city` package. Find another package to resolve this.
