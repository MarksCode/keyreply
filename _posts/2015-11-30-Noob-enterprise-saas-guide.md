---
layout: post
title: Noob's guide to building an enterprise-grade SaaS application
---

As a tech co-founder in a bootstrapping startup who doesn't have experience building an enterprise-grade SaaS app, you may find it seems like an impossibly befuddling task, especially within the constraints of a reasonable timeframe. However, overcoming overwhelming odds is just what a startup has to do on a daily basis - and here's where we want to share our experience building an enterprise software to help you think about how to get started.

> "Starting a new enterprise-grade application is easy."
> - said no one ever.

There are various differences between building an enterprise grade app as compared to building consumer software. Consumer software, for example, generally takes a shorter development cycle at the start to build a [minimum lovable product](https://medium.com/the-happy-startup-school/beyond-mvp-10-steps-to-make-your-product-minimum-loveable-51800164ae0c#.54ggarj2d), has looser requirements, and flat-out just needs to work. Enterprise software, however, has additional requirements and best practices on top of those demanded of good consumer software.

For starters, enterprise-grade cloud software requires secure login pages, user/role management infrastructure, user/application setting management, tiered feature systems, audit trails and capabilities, API management, unit tests, localization and so on. At the same time, the product needs to have a modern UI and solid architecture across the entire tech stack. What this means is that the product team must have a solid understanding of the undertaking - product leaders, engineers and designers need to know that the resources required to build an enterprise app will probably be at a scale larger than new teams may be used to. But hey, remember:

> Entrepreneurship is the pursuit of opportunity without regard to resources currently controlled.
> - Jon Burgstone

## 1. Knowledge
The first step is to **read as much as you can**. Personally, we needed to find out everything that's required for an Enterprise SaaS app. Analyze established SaaS providers, read up on related engineering blogs, industry whitepapers, and absorb as much knowledge as possible so that you can connect the dots in your head. The better you can anticipate the problems you may run into, the less surprises you will have to face down the road (i.e. Don't just start building without knowing what's going to happen.) 

Learning and understanding best practices becomes particularly important when starting to build an enterprise app because you may not already be cognizant of the edge cases that could come up when you start developing. You need to be able to have a feel for formulating a strategy to build your app; the general guide is that you should read enough to get a good idea of the strategy you will use. If you don't have a strategy forming in your head, then most likely you shouldn't start building just yet.

These were a few resources that we used to build up our initial pool of knowledge:
[Microsoft Developer Network (MSDN)](https://msdn.microsoft.com/en-us/library/aa267045.aspx) provides excellent resources for learning about enterprise apps. 
[Oracle] (http://www.oracle.com/technetwork/articles/enterprise2/building-e20-applications-101935.html) gives a good case study overview on enterprise apps.
[Martin Fowler](http://martinfowler.com/books/eaa.html)'s blog is also a good place to figure enterprise apps out.

Feedback from users of your previous consumer apps could also come in handy. We also built [Slack Digest](https://slackdigest.com) so we had already received questions about the security protocols and checklists relevant to enterprise teams that we needed to cater to, including data retention strategies, encryption testing, penetration testing, etc, on top of the requirements we listed above.

Setting up sessions with mentors and other developers who have built enterprise-grade software will help greatly. Prepare a list of the questions you couldn't answer through your research, specific implementation questions, your proposed strategy and go into the meeting with the intention of clearing this list. Often you will find even more perspectives to it that you hadn't thought of, perhaps including internal deployment, audit certificates, and other factors important to enterprises. (We were lucky to have a steady stream of great mentors from the [BlueStartups](http://bluestartups.com/) program to help us as we progressed too.)

Design is also especially important to this process. Your team should be actively gathering requirements from potential users at this point, starting with the important functions that your app needs to perform, its value to the user, and the best way to present them. (We assume that you have already validated there is a problem to be solved here and are now trying to build it.)

## 2. Strategy
In general, enterprise apps have more non-functional requirements, in reliability, stability, transparency and performance. When forming a strategy, it needs to fulfill all these requirements as a baseline.

Before writing any code, it is always a good idea to look for existing packaged solutions and evaluate all of them. Specifically, look for a framework that is being actively developed, well documented, and follows best practices. In other words, you'll need to look for a framework that can greatly accelerate development time and reduce QA issues. My opinion is that software engineers shouldn't be judged by how many lines of code they have written or how many projects they have built - it's all about the result for the end user, so think about this as a way to be more efficient with development time and resources. You may face some objections or even think that you need to build everything from scratch yourself, but when starting out, you need to try to be more resourceful and ramp up to the ideal customer experience above anything else.

Once you have determined your general strategy, and if you think your needs can be served by existing frameworks, it essentially becomes a bit of a "shopping choice". For your own purposes, first figure out the pieces you need by drawing them out, investigate alternatives and compare them, and based on the constraints you should probably get to what you need by process of elimination.

After some digging around online, we found a number of software vendors providing SaaS Development Frameworks such as [php](http://www.innomatic.io/), [java](http://www.athenasource.org/java/), and [techcello](http://www.techcello.com/product/overview) Most of these commercial solutions on the market have high/opaque pricing and outdated UI. The lack of transparency and documentation made it difficult to evaluate their value in accordance to our needs, despite them being used by many other enterprise apps. 

In parallel, we were looking for a front-end admin panel theme, and found Metronics, a Bootstrap-based Admin theme made by [keenthemes.com](http://www.keenthemes.com). It is the #1 selling Admin theme on ThemeForest, with a complete, flexible, good looking UI feature set. We decided that it was good enough for our needs in building our web application and picked this for our dashboard and admin panel.

Through the process of finding Metronic, we subsequently realized there is also a .NET application starter kit based on Metronic UI. The .NET language is a solid programming language with a large number of packages that have been battle tested in the enterprise environment, and is widely used by enterprises themselves to implement software within their environment. This suited our needs well and also lent itself to further potential deployment options in the future, so we decided on using .NET.

Once decided, we found ASP.NET Boilerplate, which builds on this foundation and implements best practices such as Layered Architecture, Domain Driven Design (DDD), Dependency Injection (DI), Object-Releational Mapping (ORM), Database Migrations, Logging, etc. This hence allowed us to focus on the business logic and our product's feature development over writing boilerplate code. 

## 3. Execution
If you had done enough homework and made a good choice, execution itself should be relatively painless. The learning and strategizing process above basically aims to minimize the time and risks of execution, while maximizing the outcomes for the customer and business.

On KeyReply, we combined the beautiful front-end Metronic theme with the well-architected backend ASP.NET Boilerplate. In this, we found a perfect combination that satisfies stability, extensibility, usability and budget. I was also pleasantly surprised by the ease-of-use of Microsoft's Azure Cloud hosting offering. Spinning up a Virtual Machine takes just a few clicks from the management panel. Developing and deploying from Visual Studio 2015 to [Azure Cloud](http://azure.microsoft.com) is also seamless. I was able to get a simple Multi-Tenant SaaS Application up and running in less than a day.

The ASP.NET Boilerplate package also made it easy for us to create an API, so to implement our backend, we simply had to call the API from our suite of apps (iOS, Mac apps) or any client.

Also, learning .NET may feel daunting initially, but it does have a lot of similarity with Java and won't be too difficult to pick up if you already have background writing in other languages. Do it the "traditional" way and read sample code, Stack Overflow everything, and edit it to your needs.

Again, we emphasize the fact that you need to involve whoever's working on product and design on your team and ensure that what you're implementing is in line with the vision and roadmap of the product, has sound visual identity, and fits the user experience that you ideally would have tested with real people.

Most of the challenges of building enterprise-grade apps come from inexperience and perhaps a lack of understanding of the requirements. The Martian (2015) provides the most apt analogy for startups: Mark Watney was explaining to a class, after he got back from Mars:
> Space is against you, so the fear of death is natural. You just need to solve one problem after the other till the end to survive.

As it's said in the movie, it’s ultimately about solving the most immediate problem in front you and then the next and the next, while keeping the end goal in mind — until someday you get to go home.

Building apps is now easier than ever. What used to take big teams of software engineers months of development work can now be achieved in a day, at a relatively low cost. Startups like us should move faster, save money, and achieve more by focusing on delivering business value and the best customer experience.