// GitHub Repository Details
const username = "oracleken";
const repo = "examples-image-loading";
const folder = "Images1"; // The folder you want to list



// Fetch file list from the GitHub API
async function fetchFiles() {
    const apiUrl = `https://api.github.com/repos/${username}/${repo}/Web/${folder}`;
    console.info(apiUrl);
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const files = await response.json();

        // Display file links in the HTML
        const fileList = document.getElementById("file-list");
        fileList.innerHTML = ""; // Clear the "Loading files..." text

        files.forEach(file => {
            if (file.type === "file") { // Ensure it's a file, not a directory
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = file.download_url; // Direct link to the file
                a.textContent = file.name; // Display the file name
                li.appendChild(a);
                fileList.appendChild(li);
            }
        });
    } catch (error) {
        console.error(error);
        document.getElementById("file-list").textContent = "Failed to load files.";
    }
}

// Call the function on page load
fetchFiles();
