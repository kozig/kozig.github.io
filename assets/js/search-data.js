// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "Web apps and tools I&#39;ve shipped or am actively building.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-azurehound-cheatsheet",
        
          title: "AzureHound CheatSheet",
        
        description: "Cypher queries for analyzing AzureHound data in the BloodHound GUI and the Neo4j console.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/AzureHound-CheatSheet/";
          
        },
      },{id: "post-davinci-shortcuts",
        
          title: "DaVinci Shortcuts",
        
        description: "A short list of DaVinci Resolve keyboard shortcuts I keep forgetting.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/davinci-shortcuts/";
          
        },
      },{id: "post-obsidian-templates",
        
          title: "Obsidian Templates",
        
        description: "Using the Templater community plugin to generate dynamic titles and content in Obsidian.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/Obsidian-Templates/";
          
        },
      },{id: "projects-example-app",
          title: 'Example App',
          description: "One- to two-sentence summary that appears on the project card. Keep it punchy.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/example-app/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%69%6E%66%6F@%72%65%67%75%6C%61%72%33%64%67%75%79.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/kozig", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/gregorykoziol", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
