import ApiCall from "../utilities/apiCaller";

// Roles are hardcoded in the backend seed data (internal/db/seed.queries.go)
// Since there's no /roles endpoint in the backend, we provide static data
// matching the backend seed structure
export const getRoles = async (): Promise<{ success: boolean; data: Role[] }> => {
  // Static roles matching backend seed data
  return {
    success: true,
    data: [
      { id: 1, name: "author" },
      { id: 2, name: "editor" }, 
      { id: 3, name: "admin" },
    ]
  };
};

// Note: If a roles API endpoint were to be added to the backend, 
// it would likely look like this:
// export const getRoles = () => ApiCall.get<Role[]>("/roles");