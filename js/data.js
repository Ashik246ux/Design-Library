/* ============================================
   Design Library
   Color tokens, category metadata & resource dataset
   ============================================ */

const CC={'UI Design':'#7c6fff','Animation':'#1D9E75','Color':'#ff6b6b','Icons':'#ffb347','Illustration':'#4d9fff','Typography':'#f06292','Design Systems':'#66bb6a','AI Tools':'#b9f900','Accessibility':'#26c6da','Logo Generators':'#ff9a76'};
const CI={'UI Design':'fas fa-palette','Animation':'fas fa-play-circle','Color':'fas fa-droplet','Icons':'fas fa-icons','Illustration':'fas fa-image','Typography':'fas fa-font','Design Systems':'fas fa-layer-group','AI Tools':'fas fa-robot','Accessibility':'fas fa-universal-access','Logo Generators':'fas fa-heading'};
const CD={'UI Design':'Curated galleries for landing pages, SaaS, mobile and web UI design inspiration.','Animation':'Animation libraries, motion design showcases and interactive web experiences.','Color':'Color palette generators, schemes and real UI color inspiration.','Icons':'Free open-source SVG icon libraries for web and app design.','Illustration':'Free customizable illustrations for digital products and websites.','Typography':'Font libraries and typography inspiration for web design.','Design Systems':'Design systems, component libraries and UI primitives.','AI Tools':'AI-powered UI generation, prototyping and design tools.','Accessibility':'WCAG tools, contrast checkers and accessibility testing platforms.','Logo Generators':'AI-powered logo creation tools and generators for branding.'};

/* Team roster: who's on the design team and their avatar color.
   "added" is recalculated at runtime from DATA, this is just identity + color. */
const TEAM=[
{id:'u1',name:'Ashik S',role:'Designer',color:'#c850c0',initials:'AS',isCurrentUser:true},
{id:'u2',name:'Priya N',role:'Product Designer',color:'#4d9fff',initials:'PN'},
{id:'u3',name:'Rahul K',role:'UI Engineer',color:'#1D9E75',initials:'RK'},
{id:'u4',name:'Meera J',role:'Designer',color:'#ff6b6b',initials:'MJ'},
{id:'u5',name:'Devan T',role:'Design Lead',color:'#b9f900',initials:'DT'}
];

const DATA=[
{id:1,name:'Awwwards',url:'https://www.awwwards.com',desc:'Awards for design, creativity and innovation on the internet.',cat:'UI Design',price:'Free',rating:4.9,addedBy:'u2'},
{id:2,name:'UI8',url:'https://ui8.net',desc:'Marketplace for high-quality UI kits, design systems, icons and motion assets.',cat:'UI Design',price:'Freemium',rating:4.7,addedBy:'u1'},
{id:3,name:'Land-book',url:'https://land-book.com',desc:'Curated gallery of the best landing page designs.',cat:'UI Design',price:'Free',rating:4.7,addedBy:'u3'},
{id:4,name:'Minimal Gallery',url:'https://minimal.gallery',desc:'Handpicked inspiration for minimalist web design.',cat:'UI Design',price:'Free',rating:4.6,addedBy:'u2'},
{id:5,name:'Lapa Ninja',url:'https://www.lapa.ninja',desc:'The best landing page design inspiration from around the web.',cat:'UI Design',price:'Free',rating:4.7,addedBy:'u4'},
{id:6,name:'One Page Love',url:'https://onepagelove.com',desc:'One-page website design inspiration and templates.',cat:'UI Design',price:'Free',rating:4.6,addedBy:'u1'},
{id:7,name:'Collect UI',url:'https://collectui.com',desc:'Daily inspiration collected from the best UI designs.',cat:'UI Design',price:'Free',rating:4.5,addedBy:'u5'},
{id:8,name:'Site Inspire',url:'https://www.siteinspire.com/websites',desc:'A showcase of the finest web and interactive design.',cat:'UI Design',price:'Free',rating:4.6,addedBy:'u2'},
{id:9,name:'Refero',url:'https://refero.design',desc:'Design references from real products to build better UX.',cat:'UI Design',price:'Freemium',rating:4.8,addedBy:'u3'},
{id:10,name:'Mobbin',url:'https://mobbin.com',desc:'Latest UI and UX patterns from the world\'s best apps.',cat:'UI Design',price:'Freemium',rating:4.8,addedBy:'u1'},
{id:11,name:'Landingfolio',url:'https://www.landingfolio.com',desc:'Gallery of landing page inspiration, components and website examples.',cat:'UI Design',price:'Free',rating:4.5,addedBy:'u4'},
{id:12,name:'SaaSpo',url:'https://saaspo.com/page-types/saas-landing-page-examples',desc:'SaaS landing page examples and inspiration.',cat:'UI Design',price:'Free',rating:4.4,addedBy:'u2'},
{id:13,name:'Toools Design',url:'https://www.toools.design/ui-web-design-inspiration-websites',desc:'Curated collection of web design inspiration resources.',cat:'UI Design',price:'Free',rating:4.4,addedBy:'u5'},
{id:14,name:'21st.dev',url:'https://21st.dev/community/components',desc:'Community-driven modern UI components built with React and Tailwind.',cat:'UI Design',price:'Free',rating:4.7,addedBy:'u3'},
{id:15,name:'GSAP',url:'https://gsap.com',desc:'Professional-grade animation library for the modern web.',cat:'Animation',price:'Free',rating:4.9,addedBy:'u1'},
{id:16,name:'Awwwards Animation',url:'https://www.awwwards.com/websites/animation/',desc:'Curated UI animations using Canvas, SVG, CSS3, WebGL.',cat:'Animation',price:'Free',rating:4.8,addedBy:'u2'},
{id:17,name:'Codrops',url:'https://tympanus.net/codrops/',desc:'Creativity, tutorials and interactive web experiences.',cat:'Animation',price:'Free',rating:4.8,addedBy:'u4'},
{id:18,name:'CSS Design Awards',url:'https://www.cssdesignawards.com',desc:'International award platform showcasing UI and UX innovation.',cat:'Animation',price:'Free',rating:4.6,addedBy:'u3'},
{id:19,name:'Framer',url:'https://www.framer.com',desc:'Website builder to create and publish responsive websites with smooth animations.',cat:'Animation',price:'Freemium',rating:4.9,addedBy:'u5'},
{id:20,name:'Made with GSAP',url:'https://madewithgsap.com/effects',desc:'Curated showcase of websites and effects built using GSAP.',cat:'Animation',price:'Free',rating:4.7,addedBy:'u1'},
{id:21,name:'Motion Primitives',url:'https://motion-primitives.com',desc:'Animated components built with Motion and React.',cat:'Animation',price:'Free',rating:4.8,addedBy:'u2'},
{id:22,name:'Aceternity UI',url:'https://ui.aceternity.com/components',desc:'Modern UI components featuring beautiful animations.',cat:'Animation',price:'Free',rating:4.7,addedBy:'u3'},
{id:23,name:'Magic UI',url:'https://magicui.design',desc:'Animated components for landing pages and SaaS products.',cat:'Animation',price:'Free',rating:4.7,addedBy:'u4'},
{id:24,name:'Spline Community',url:'https://community.spline.design',desc:'Community-created 3D scenes and interactive experiences.',cat:'Animation',price:'Free',rating:4.6,addedBy:'u1'},
{id:25,name:'Coolors',url:'https://www.coolors.in/generator',desc:'Super-fast color palette generator.',cat:'Color',price:'Freemium',rating:4.8,addedBy:'u2'},
{id:26,name:'Color Hunt',url:'https://colorhunt.co',desc:'Free curated color palettes for designers.',cat:'Color',price:'Free',rating:4.7,addedBy:'u5'},
{id:27,name:'Happy Hues',url:'https://www.happyhues.co/palettes/3',desc:'Color palettes with real UI usage examples.',cat:'Color',price:'Free',rating:4.6,addedBy:'u3'},
{id:28,name:'Muzli Colors',url:'https://colors.muz.li',desc:'Handpicked color palettes and gradients for digital products.',cat:'Color',price:'Free',rating:4.5,addedBy:'u1'},
{id:29,name:'Lucide',url:'https://lucide.dev',desc:'Free open-source icon library with a clean consistent design.',cat:'Icons',price:'Free',rating:4.9,addedBy:'u4'},
{id:30,name:'Heroicons',url:'https://heroicons.com/outline',desc:'Free SVG icon set crafted by the Tailwind CSS team.',cat:'Icons',price:'Free',rating:4.8,addedBy:'u2'},
{id:31,name:'Phosphor Icons',url:'https://phosphoricons.com',desc:'Open-source icon family with multiple weights.',cat:'Icons',price:'Free',rating:4.7,addedBy:'u3'},
{id:32,name:'Tabler Icons',url:'https://tabler.io/icons',desc:'Free SVG icons for modern web applications.',cat:'Icons',price:'Free',rating:4.8,addedBy:'u1'},
{id:33,name:'Remix Icon',url:'https://remixicon.com',desc:'Open-source neutral-style icon system.',cat:'Icons',price:'Free',rating:4.7,addedBy:'u5'},
{id:34,name:'Google Icons',url:'https://fonts.google.com/icons',desc:'Google\'s modern customizable icon library.',cat:'Icons',price:'Free',rating:4.7,addedBy:'u2'},
{id:35,name:'SVG Repo',url:'https://www.svgrepo.com',desc:'Large library of free, open-licensed SVG icons.',cat:'Icons',price:'Free',rating:4.6,addedBy:'u3'},
{id:36,name:'Icon Buddy',url:'https://iconbuddy.com/flat-ui',desc:'Free Flat UI icon collection.',cat:'Icons',price:'Free',rating:4.5,addedBy:'u4'},
{id:37,name:'unDraw',url:'https://undraw.co',desc:'Open-source illustrations customizable to any brand color.',cat:'Illustration',price:'Free',rating:4.8,addedBy:'u1'},
{id:38,name:'Pixels Market',url:'https://pixels.market',desc:'High-quality customizable illustrations and icons.',cat:'Illustration',price:'Freemium',rating:4.5,addedBy:'u2'},
{id:39,name:'Storyset',url:'https://storyset.com',desc:'Free customizable and animated illustrations.',cat:'Illustration',price:'Free',rating:4.7,addedBy:'u5'},
{id:40,name:'Blush',url:'https://blush.design',desc:'Customizable illustrations by artists worldwide.',cat:'Illustration',price:'Freemium',rating:4.6,addedBy:'u3'},
{id:41,name:'Google Fonts',url:'https://fonts.google.com',desc:'Open-source font library with thousands of typefaces.',cat:'Typography',price:'Free',rating:4.8,addedBy:'u4'},
{id:42,name:'Fontshare',url:'https://www.fontshare.com',desc:'Free professional-quality fonts from Indian Type Foundry.',cat:'Typography',price:'Free',rating:4.7,addedBy:'u1'},
{id:43,name:'Shopify Polaris',url:'https://shopify.dev/docs/api/app-home/web-components',desc:'Web components for Shopify apps following their design system.',cat:'Design Systems',price:'Free',rating:4.7,addedBy:'u2'},
{id:44,name:'Material Design 3',url:'https://m3.material.io',desc:'Google\'s design system for building high-quality digital experiences.',cat:'Design Systems',price:'Free',rating:4.8,addedBy:'u5'},
{id:45,name:'Atlassian Design',url:'https://atlassian.design/design-system',desc:'Foundations, components and patterns for consistent UX.',cat:'Design Systems',price:'Free',rating:4.7,addedBy:'u3'},
{id:46,name:'Fluent 2',url:'https://fluent2.microsoft.design/get-started/design',desc:'Microsoft\'s design system for cohesive, accessible products.',cat:'Design Systems',price:'Free',rating:4.6,addedBy:'u1'},
{id:47,name:'Radix UI',url:'https://www.radix-ui.com',desc:'Unstyled, accessible UI primitives for design systems.',cat:'Design Systems',price:'Free',rating:4.8,addedBy:'u2'},
{id:48,name:'shadcn/ui',url:'https://ui.shadcn.com/docs/components',desc:'Reusable components built using Radix UI and Tailwind.',cat:'Design Systems',price:'Free',rating:4.9,addedBy:'u4'},
{id:49,name:'Flowbite',url:'https://flowbite.com',desc:'Open-source UI component library built on Tailwind CSS.',cat:'Design Systems',price:'Free',rating:4.6,addedBy:'u3'},
{id:50,name:'HyperUI',url:'https://www.hyperui.dev',desc:'Free open-source Tailwind CSS components.',cat:'Design Systems',price:'Free',rating:4.6,addedBy:'u1'},
{id:51,name:'Ant for Figma',url:'https://www.antforfigma.com',desc:'Figma design system based on Ant Design.',cat:'Design Systems',price:'Freemium',rating:4.5,addedBy:'u5'},
{id:52,name:'Motiff',url:'https://motiff.com/home',desc:'AI-powered interface design and design system platform.',cat:'AI Tools',price:'Freemium',rating:4.6,addedBy:'u2'},
{id:53,name:'Visily AI',url:'https://www.visily.ai',desc:'Generate wireframes from prompts and screenshots.',cat:'AI Tools',price:'Freemium',rating:4.5,addedBy:'u3'},
{id:54,name:'Uizard',url:'https://uizard.io',desc:'Create UI mockups using AI text-to-design workflows.',cat:'AI Tools',price:'Freemium',rating:4.4,addedBy:'u1'},
{id:55,name:'Google Stitch',url:'https://stitch.withgoogle.com',desc:'Generate high-fidelity UI designs and code from prompts.',cat:'AI Tools',price:'Freemium',rating:4.6,addedBy:'u4'},
{id:56,name:'Magic Patterns',url:'https://www.magicpatterns.com',desc:'AI-generated UI components from text prompts.',cat:'AI Tools',price:'Freemium',rating:4.5,addedBy:'u2'},
{id:57,name:'Lovable',url:'https://lovable.dev',desc:'AI app builder. Free: 5 daily credits, max 30/month.',cat:'AI Tools',price:'Freemium',rating:4.5,addedBy:'u5'},
{id:58,name:'v0',url:'https://v0.app',desc:'AI UI generation by Vercel. Free plan with limited credits.',cat:'AI Tools',price:'Freemium',rating:4.6,addedBy:'u3'},
{id:59,name:'Bolt.new',url:'https://bolt.new',desc:'AI full-stack app builder with token-based free plan.',cat:'AI Tools',price:'Freemium',rating:4.4,addedBy:'u1'},
{id:60,name:'WCAG Plugins',url:'https://www.figma.com/community/accessibility/wcag-checkers',desc:'Accessibility Figma plugins for WCAG compliance.',cat:'Accessibility',price:'Free',rating:4.7,addedBy:'u4'},
{id:61,name:'Lighthouse',url:'https://developer.chrome.com/docs/lighthouse',desc:'Automated accessibility and web quality auditing by Chrome.',cat:'Accessibility',price:'Free',rating:4.8,addedBy:'u2'},
{id:62,name:'Eye-Able',url:'https://eye-able.com',desc:'Website accessibility testing and compliance platform.',cat:'Accessibility',price:'Freemium',rating:4.5,addedBy:'u5'},
{id:63,name:'WebAIM Contrast',url:'https://webaim.org/resources/contrastchecker/',desc:'Check color contrast ratios against WCAG standards.',cat:'Accessibility',price:'Free',rating:4.7,addedBy:'u3'},
{id:64,name:'Stark Plugin',url:'https://www.figma.com/community/plugin/733159460536249875',desc:'Accessibility and contrast checking plugin for Figma.',cat:'Accessibility',price:'Freemium',rating:4.7,addedBy:'u1'},
{id:65,name:'Coolors Contrast',url:'https://coolors.co/contrast-checker/112a46-acc8e5',desc:'Validate accessible color combinations.',cat:'Accessibility',price:'Free',rating:4.6,addedBy:'u4'},
{id:66,name:'WCAG Guidelines',url:'https://www.w3.org/WAI/standards-guidelines/wcag/',desc:'W3C international standards for accessible web design.',cat:'Accessibility',price:'Free',rating:4.8,addedBy:'u2'},
{id:67,name:'Looka',url:'https://www.looka.com',desc:'AI logo design generator that creates custom logos in seconds.',cat:'Logo Generators',price:'Freemium',rating:4.8,addedBy:'u1'},
{id:68,name:'Brandmark',url:'https://brandmark.io',desc:'AI-powered branding platform for logo design and brand identity.',cat:'Logo Generators',price:'Freemium',rating:4.7,addedBy:'u2'},
{id:69,name:'Wix Logo Maker',url:'https://www.wix.com/en-US/logo/maker',desc:'Free AI logo generator with thousands of customizable templates.',cat:'Logo Generators',price:'Free',rating:4.6,addedBy:'u3'},
{id:70,name:'Namecheap Logo Maker',url:'https://www.namecheap.com/logo-maker/',desc:'Simple and affordable logo design tool powered by AI.',cat:'Logo Generators',price:'Freemium',rating:4.5,addedBy:'u4'},
{id:71,name:'Renderforest',url:'https://www.renderforest.com/logo-maker',desc:'Free online logo maker with templates and AI design assistance.',cat:'Logo Generators',price:'Free',rating:4.6,addedBy:'u5'}
];