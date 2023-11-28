To make this project running (sync node_modules between folders locally) you have to create symbolic link. To do that run script js-libraries/@bash/link_node_modules.sh

If eslint is not working in your setup with such monorepo like structure. Please add to your workspace following settings
{
    "eslint.workingDirectories": [
        "js-libraries",
        "js-packages",
        "react-components",
        "app",
        "html",
        "company",
    ]
}