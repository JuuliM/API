let users = [
    {"username": "jk", "password": "sala"},
    {"username": "pl", "password": "pass"}
]

let data = [
    {"id": "1", "Firstname": "Jyri", "Lastname": "Kemppainen"},
    {"id": "2","Firstname": "Petri", "Lastname": "Laitinen"}
]

const getUsers = () => {
    return users;
}

const getData = () => {
    return data;
}

export {
    getData,
    getUsers
};

