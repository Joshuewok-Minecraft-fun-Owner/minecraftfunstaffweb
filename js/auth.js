// ===== Minecraft Fun! Auth System =====

const DEFAULT_ADMIN = {
    username: "admin",
    password: "admin123",
    role: "Administrator",
    approved: true,
    isAdmin: true
};

function getUsers() {
    let users = JSON.parse(localStorage.getItem("mf_users") || "[]");

    if (!users.find(user => user.username === DEFAULT_ADMIN.username)) {
        users.push(DEFAULT_ADMIN);
        localStorage.setItem("mf_users", JSON.stringify(users));
    }

    return users;
}

function saveUsers(users) {
    localStorage.setItem("mf_users", JSON.stringify(users));
}

function signup(username, password, role, reason) {
    let users = getUsers();

    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
        return { success: false, message: "User already exists" };
    }

    users.push({
        username,
        password,
        role,
        reason,
        approved: false,
        isAdmin: false
    });

    saveUsers(users);

    return {
        success: true,
        message: "Application submitted. Waiting for admin approval."
    };
}

function login(username, password) {
    let users = getUsers();

    let user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return { success: false, message: "Invalid username or password." };
    }

    if (!user.approved) {
        return {
            success: false,
            message: "Your application has not been approved yet."
        };
    }

    localStorage.setItem("mf_currentUser", JSON.stringify(user));

    return { success: true, user };
}

function logout() {
    localStorage.removeItem("mf_currentUser");
    window.location.href = "signin.html";
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("mf_currentUser"));
}

function requireLogin() {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        window.location.href = "signin.html";
    }
}

function requireAdmin() {
    const currentUser = getCurrentUser();

    if (!currentUser || !currentUser.isAdmin) {
        window.location.href = "dashboard.html";
    }
}

function approveUser(username) {
    let users = getUsers();

    users = users.map(user => {
        if (user.username === username) {
            user.approved = true;
        }

        return user;
    });

    saveUsers(users);
}

function getPendingApplications() {
    return getUsers().filter(user => !user.approved);
}
