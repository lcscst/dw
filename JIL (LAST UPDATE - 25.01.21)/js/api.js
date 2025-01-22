const BASE_URL = 'http://localhost:3001';

export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    return response.json();
};

export const getUserById = async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    return response.json();
};

export const getMachines = async () => {
    const response = await fetch(`${BASE_URL}/machines`);
    return response.json();
};

export const getMachineById = async (id) => {
    const response = await fetch(`${BASE_URL}/machines/${id}`);
    return response.json();
};

export const getMachinesByUserId = async (userId) => {
    const response = await fetch(`${BASE_URL}/machines?userId=${userId}`);
    return response.json();
};

export const createMachine = async (machine) => {
    const response = await fetch(`${BASE_URL}/machines`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(machine)
    });
    return response.json();
};