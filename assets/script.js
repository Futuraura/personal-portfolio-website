const contactMeBtn = document.getElementById("contactMeBtn");
const contactMeModal = document.getElementById("contactMeModal");
const contactMeCloseBtn = document.getElementById("contactMeCloseBtn");

fetch("assets/skills.json")
  .then((r) => r.json())
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

fetch("assets/projects.json")
  .then((r) => r.json())
  .then((projects) => {});

contactMeBtn.addEventListener("click", () => {
  contactMeModal.style.display = "flex";
});

contactMeCloseBtn.addEventListener("click", () => {
  contactMeModal.style.display = "none";
});
