async function login(username, password) {
    const email = `${username}@alsharawy.local`;

    const { data, error } = await window.sbClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error("Login error:", error.message);
        alert("خطأ في تسجيل الدخول: " + error.message);
        return null;
    }

    return data.user;
}

async function getUserProfile(userId) {
    const { data, error } = await window.sbClient
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error("Profile error:", error.message);
        return null;
    }

    return data;
}

async function logout() {
    const { error } = await window.sbClient.auth.signOut();

    if (error) {
        alert("تعذر تسجيل الخروج: " + error.message);
        return false;
    }

    return true;
}

async function getCurrentUser() {
    const { data, error } = await window.sbClient.auth.getUser();

    if (error) {
        console.error(error.message);
        return null;
    }

    return data.user;
}