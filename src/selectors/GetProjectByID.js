
export const GetProjectById = (id = '', projects) => {
    
    return projects.find(project => project.id === id);
}