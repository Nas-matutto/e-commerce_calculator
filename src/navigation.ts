import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Tools',
      links: [
        {
          text: 'E-commerce Profit Calculator',
          href: getPermalink('/tools/E-commerce_calculator'),
        },
        {
          text: 'Brand Launch Cost Estimator',
          href: getPermalink('/tools/launch-cost-estimator'),
        },
       ],
    },
    {
      text: 'Work with me',
      href: '/contact',
    },
    {
      text: 'Posts',
      href: '/blog',
    },
   ],
  actions: [],
};

export const footerData = {
  links: [
    
    {
      title: 'Selling with Nas',
      links: [
        { text: 'About me', href: '/about' },
        { text: 'Blog Posts', href: '/blog' },
        { text: 'Contact', href: '/contact' },
      ],
    },
  ],
 //  secondaryLinks: [
    // { text: 'Terms', href: getPermalink('/terms') },
    // { text: 'Privacy Policy', href: getPermalink('/privacy') },
  // ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/nasser-mansurali-659145102/' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: 'https://www.youtube.com/@sellingwithnas' },

  ],
  footNote: `
    Made by Nas · All rights reserved.
  `,
};
