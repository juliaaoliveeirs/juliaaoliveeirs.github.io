/* https://api.github.com/users/juliaaoliveeirs

https://api.github.com/users/juliaaoliveeirs/repos */

import GetUser from './modules/profile.js';
import GetProjects from './modules/projects.js';

const getUser = new GetUser('https://api.github.com/users/juliaaoliveeirs');
await getUser.init();

const getProjects = new GetProjects(
  'https://api.github.com/users/juliaaoliveeirs/repos'
);
await getProjects.init();
