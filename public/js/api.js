// const BASE_URL = 'http://localhost:3001';

export const currentUser = async () => {
    const response = await fetch('/users/me', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jiltoken')}`
        }
    });
    return response.json();
}

export const pingMachine = async (ip) => {
    const response = await fetch('/ping', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jiltoken')}`
        },
        body: JSON.stringify({ ip })
    });
    return response.json();
};

export const getUsers = async () => {
    try {
        const response = await fetch('/users');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getMachines = async () => {
    const response = await fetch('/machines', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jiltoken')}`
        }
    });
    return response.json();
};

export const getMachineById = async (id) => {
    const response = await fetch(`/machines/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jiltoken')}`
        }
    });
    return response.json();
};

export const getMachinesByUserId = async (userId) => {
    const response = await fetch(`/machines/user/${userId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jiltoken')}`
        }
    });
    return response.json();
};

export const createMachine = async (machine) => {
    const response = await fetch(`/machines`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jiltoken')}`
        },
        body: JSON.stringify(machine)
    });
    return response.json();
};
