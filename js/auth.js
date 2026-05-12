// ===== Minecraft Fun! Auth System =====

function getUsers() {
    return JSON.parse(localStorage.getItem("mf_users") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("mf_users", JSON.stringify(users));
}

function signup(username, password, role, reason) {
    let users = getUsers();

    if (users.find(u => u.username === username)) {
        return { success: false, message: "User already exists" };
    }

    users.push({
        username,
        password,
        role,
        reason
    });

    saveUsers(users);
    return { success: true };
}

function login(username, password) {
    let users = getUsers();

    let user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return { success: false };
    }

    localStorage.setItem("mf_currentUser", JSON.stringify(user));
    return { success: true, user };
}

function logout() {
    localStorage.removeItem("mf_currentUser");
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("mf_currentUser"));
}
