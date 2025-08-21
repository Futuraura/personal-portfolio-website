fetch("assets/skills.json")
  .then((response) => response.json())
  .then((skills) => {
    const skillsList = document.getElementById("skills-list");
    const futureSkillsList = document.getElementById("future-skills-list");

    skills.current.forEach((skill) => {
      const skillElement = document.createElement("div");

      skillElement.classList.add("skill");
      skillElement.innerHTML = `<img src="${skill.svgDir}" />${skill.name}`;

      skillsList.appendChild(skillElement);
    });

    skills.future.forEach((skill) => {
      const skillElement = document.createElement("div");

      skillElement.classList.add("skill");
      skillElement.innerHTML = `<img src="${skill.svgDir}" />${skill.name}`;

      futureSkillsList.appendChild(skillElement);
    });
  });
