const express = require('express')
const app = express()
const https = require('https');
const url = 'https://reqres.in/api/users'
https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const users = JSON.parse(data).data;

        const user = users.filter((user) => {
            return user.first_name.startsWith('E')
        })
        console.log(user);
        if (user) {
            const updatedUser = { ...user, first_name: 'Alice' };
            const updateUserUrl = `${url}/${user.id}`;

            const updateUserReq = https.request(updateUserUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            }, (updateUserRes) => {
                let updatedUserData = '';

                updateUserRes.on('data', (chunk) => {
                    updatedUserData += chunk;
                });

                updateUserRes.on('end', () => {
                    console.log(`Updated user: ${updatedUserData}`);

                    const otherUsers = users.filter(user => user.id !== updatedUser.id);
                    const deleteUserUrls = otherUsers.map(user => `${url}/${user.id}`);

                    deleteUserUrls.forEach(deleteUserUrl => {
                        const deleteUserReq = https.request(deleteUserUrl, {
                            method: 'DELETE'
                        }, (deleteUserRes) => {
                            console.log(`Deleted user ${deleteUserUrl}: ${deleteUserRes.statusCode}`);
                        });

                        deleteUserReq.on('error', (err) => {
                            console.error(err);
                        });

                        deleteUserReq.end();
                    });
                });
            });

            updateUserReq.on('error', (err) => {
                console.error(err);
            });

            updateUserReq.write(JSON.stringify(updatedUser));
            updateUserReq.end();
        } else {
            console.log('No user found name starts with "a"');
        }

    });
});

app.listen(9000, (err) => {
    if (err) {
        console.log("error listening server");
    } else {
        console.log("Server Started in 3000");
    }
})