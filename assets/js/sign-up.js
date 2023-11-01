async function  getUsers() { 
    try {
        const response = await fetch('./data/users.json') // Replace 'data.json' with the path to your JSON file
            ;
        const data = await response.json();
        // Data is the parsed JSON object
        console.log('data', data);
        return data;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
}

async function signup() {
    console.log('sign-up');
    const userJson = await getUsers();
    console.log('userJson',userJson);

    // Modify the JSON data
    const userLength = userJson.data.length;
    const lastUser = userJson.data[userLength-1];
    const newUserId = parseInt(lastUser.id)+1;
    const name = document.getElementById("sign-up-name").value;
    const email = document.getElementById("sign-up-email").value;
    const password = document.getElementById("sign-up-password").value;
    const newUser = {
        id: newUserId,
        name,
        email,
        password,
        role: 'member',
    }
    userJson.data.push(newUser);
    console.log('new userJson',userJson);


    const repoOwner = 'affanyusuf';
    const repoName = 'world-book-library';
    const filePath = 'data/users.json';
    const accessToken = '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';
    
    // Fetch the current JSON data from the 'master' branch
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
      method: 'GET',
    //   headers: {
    //     Authorization: `token ${accessToken}`,
    //   },
    });
    const jsonContent = await response.json();
    console.log('jsonContent', jsonContent);
    const currentSha = jsonContent.sha;

    const body = JSON.stringify({
        branch: 'master', // Specify the 'master' branch
        message: 'Update users.json',
        content: btoa(JSON.stringify(userJson, null, 2)), // Encode as base64
        sha: currentSha,
    });

    console.log('body', body);

    // Update the JSON file in the 'master' branch
    await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${accessToken}`,
      },
      body,
    });

    console.log('JSON data has been updated in the repository.');
}