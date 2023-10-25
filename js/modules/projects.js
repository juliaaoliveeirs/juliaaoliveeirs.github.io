export default class GetProjects {
  constructor(url) {
    this.url = url;
    this.projectItem = document.querySelector('.project-list');
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (response.ok) {
        this.projects = await response.json();

        this.projects
          .sort((a, b) => b.id - a.id)
          .filter((project) => project.description !== null)
          .slice(0, 4)
          .forEach((project) => this.fillProjects(project));
      }
    } catch (error) {
      console.log(error);
    }
  }

  fillProjects(project) {
    const linkProject = this.createProject(project);
    this.projectItem.appendChild(linkProject);
  }

  createProject(project) {
    const link = document.createElement('a');
    link.href = project.html_url;
    link.target = '_blank';
    link.classList.add('card');

    const div = document.createElement('div');
    div.classList.add('project-item');

    div.innerHTML = `
      <h4><img src="./assets/folder.svg" alt=""> ${project.name}</h4>
      <p>${project.description || ''}</p>
      <ul class="project-item-details">
        <li><img src="assets/star.svg" alt="Star"> ${project.watchers}</li>
        <li><img src="assets/git-branch.svg" alt="Branch"> ${project.forks}</li>
        <li>${this.colorLanguage(project.language)}</li>
      </ul>
    `;

    link.appendChild(div);

    return link;
  }

  colorLanguage(language) {
    if (language) {
      return `<span class="list-dec ${language}-color"></span> ${language}`;
    }
    return '';
  }

  async init() {
    await this.fetchData();
    return this;
  }
}
