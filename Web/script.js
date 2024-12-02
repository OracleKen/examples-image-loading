// GitHub Repository Details
const username = "oracleken";
const repo = "examples-image-loading";
const folders = ["Images1", "Images2"]; // The folder you want to list

// Function to fetch files from a specific folder
async function fetchFilesFromFolder(folder) {
    const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${folder}`;
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`GitHub API error for ${folder}: ${response.status}`);
        }

        const files = await response.json();
        return files.filter(file => file.type === "file"); // Only return files
    } catch (error) {
        console.error(`Error fetching files from folder ${folder}:`, error);
        return [];
    }
}

// Function to render the files in the HTML
function renderFiles(folder, files) {
    const fileList = document.getElementById("file-list");

    // Create a section for each folder
    const folderSection = document.createElement("div");
    folderSection.classList.add("folder-section");

    const folderTitle = document.createElement("h2");
    folderTitle.textContent = folder;
    folderSection.appendChild(folderTitle);

    const fileUl = document.createElement("ul");
    files.forEach(file => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = file.download_url; // Direct link to the file
        a.textContent = file.name; // Display the file name
        li.appendChild(a);
        fileUl.appendChild(li);
    });

    folderSection.appendChild(fileUl);
    fileList.appendChild(folderSection);
}

// Main function to fetch and display files from all folders
async function fetchAndDisplayFiles() {
    const fileList = document.getElementById("file-list");
    fileList.innerHTML = "Loading files..."; // Placeholder while loading

    for (const folder of folders) {
        const files = await fetchFilesFromFolder(folder);
        if (files.length > 0) {
            renderFiles(folder, files);
        } else {
            console.warn(`No files found in folder: ${folder}`);
        }
    }

    if (fileList.innerHTML === "Loading files...") {
        fileList.textContent = "No files found in the specified folders.";
    }
}

// Call the main function on page load
fetchAndDisplayFiles();
