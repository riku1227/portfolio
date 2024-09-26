const createProjectElement = (project) => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.style.marginRight = '12px';

    const projectImage = document.createElement('img');
    projectImage.classList.add('project-card--image');
    projectImage.src = project.thumbnail_image_path;
    projectCard.appendChild(projectImage);

    const projectHashtag = document.createElement('p');
    projectHashtag.classList.add('project-card--hashtag');
    projectHashtag.textContent = `#${project.category}`;
    projectCard.appendChild(projectHashtag);

    const projectTitle = document.createElement('p');
    projectTitle.classList.add('project-card--title');
    projectTitle.textContent = project.title;
    projectCard.appendChild(projectTitle);


    project.descriptions.forEach((description) => {
        const projectDescription = document.createElement('p');
        projectDescription.classList.add('project-card--description');
        projectDescription.textContent = description;
        projectDescription.style.marginBottom = '0px';
        projectCard.appendChild(projectDescription);
    });

    if (project.url != null && project.url != "") {
        const projectLink = document.createElement('a');
        projectLink.classList.add('btn', 'btn-outline-light');
        projectLink.href = project.url;
        projectLink.textContent = 'LINK';
        projectLink.target = '_blank';
        projectLink.style.marginTop = '12px';

        projectCard.appendChild(projectLink);
    }

    return projectCard;
}

const Categories = {
    PROGRAMMING: 'Programming',
    DESIGN: 'Design',
    VIDEO_EDITING: 'Video Editing',
    OTHER: 'Other'
}

const programmingContainer = document.getElementById('programming-project-list');
const designContainer = document.getElementById('design-project-list');
const videoEditingContainer = document.getElementById('video-editing-project-list');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'resources/projects.json', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        data['project-list'].forEach(project => {
            switch (project.category) {
                case Categories.PROGRAMMING:
                    programmingContainer.appendChild(createProjectElement(project));
                    break;
                case Categories.DESIGN:
                    designContainer.appendChild(createProjectElement(project));
                    break;
                case Categories.VIDEO_EDITING:
                    videoEditingContainer.appendChild(createProjectElement(project));
                    break;
            }
        });
    }
};
xhr.send();