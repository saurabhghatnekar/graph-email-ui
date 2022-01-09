export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return {};
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return {};
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.log("saveState", err)
    }
};

export const getContacts = () => {
    let localContacts = localStorage.getItem("contacts")
    console.log("localContacts", localContacts)
    if (!localContacts) {
        return {}
    }
    return JSON.parse(localContacts)
}

export const addToContacts = (address, name) => {
    let localContacts = JSON.parse(localStorage.getItem("contacts"))
    if (!localContacts) {
        localContacts = {}
    }
    localContacts[address] = name
    localStorage.setItem('contacts', JSON.stringify(localContacts));
    return localContacts
}

export const saveCurrentAccount = (currentAccount) => {
    localStorage.setItem("currentAccount", currentAccount)
}

export const getCurrentAccount = () => {
    return localStorage.getItem("currentAccount") || ""
}